package com.tco.misc;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;

import static com.tco.misc.GreatCircleDistance.between;
import static java.lang.Math.toRadians;
import static org.junit.jupiter.api.Assertions.*;

public class TestGreatCircleDistance {
    
    static class Geo implements GeographicCoordinate {
       
        private Double degreeLatitude;
        private Double degreeLongitude;


        public Geo(Double lat, Double lon) {
            this.degreeLatitude = lat;
            this.degreeLongitude = lon;
        }


        public Double latRadians() {
            return toRadians(degreeLatitude);
        }


        public Double lonRadians() {
            return toRadians(degreeLongitude);
        }
    }


    final Geo origin = new Geo(0., 0.);
    final Geo e180 = new Geo(0., 180.);
    final Geo w180 = new Geo(0., -180.);

    // To test the minimum
    final static long small = 1L;
    final static long piSmall = Math.round(Math.PI * small);
    final static long piHalfSmall = Math.round(Math.PI / 2.0 * small);

    // To test large numbers
    final static long big = 100000000000000L;
    final static long piBig = Math.round(Math.PI * big);
    final static long piHalfBig = Math.round(Math.PI / 2.0 * big);


    @Test
    @DisplayName("davematt: distance to self should be zero")
    public void testDistanceToSelf() {
        assertEquals(0L, between(origin, origin, big));
        assertEquals(0L, between(origin, origin, small));
    }


    @Test
    @DisplayName("davematt: distance to same place should be zero")
    public void testDistanceToSamePlace() {
        assertEquals(0L, between(e180, w180, big));
        assertEquals(0L, between(w180, e180, small));
    }


   @Test
   @DisplayName("hridayab: should have a private constructor")
   public void testConstructor() throws Exception {
        Constructor<?>[] testConstructors = GreatCircleDistance.class.getDeclaredConstructors();

        // Ensure that there is only one constructor, and it's private
        assertEquals(1, testConstructors.length, "Only one private constructor should exist.");
        assertTrue(testConstructors[0].getModifiers() == Modifier.PRIVATE, "Constructor of GreatCircleDistance should be private.");
        // Took advice from https://stackoverflow.com/questions/4520216/how-to-add-test-coverage-to-a-private-constructor
    }

    @Test
    @DisplayName("hridayab: test if between method exists")
    public void testBetweenExistance() {
        boolean methodExists = false;
        try {
            GreatCircleDistance.class.getMethod("between", GeographicCoordinate.class, GeographicCoordinate.class, double.class);
            methodExists = true;
        } catch(NoSuchMethodException e) {
            // methodExists remains false
        }
        assertTrue(methodExists, "A between method does not exist in the GreatCircleDistance class");
    }

    @Test
    @DisplayName("hridayab: test for north pole")
    public void testDistanceToNorthPole() {
        GeographicCoordinate n90 = new Geo(90., 0.);
        GeographicCoordinate randomLoc = new Geo(45., 63.);
        assertTrue(between(n90, randomLoc, big) > 0L, "Distance should be greater than zero");
        assertTrue(between(randomLoc, n90, big) > 0L, "Distance should be greater than zero");
    }

    @Test
    @DisplayName("hridayab: test for south pole")
    public void testDistanceToSouthPole() {
        GeographicCoordinate s90 = new Geo(-90., 0.);
        GeographicCoordinate randomLoc = new Geo(-45., 63.);
        assertFalse(between(s90, randomLoc, small) < 0L, "Distance should be greater than zero");
        assertFalse(between(randomLoc, s90, small) < 0L, "Distance should be greater than zero");
    }

    @Test
    @DisplayName("hridayab: test for one place in km")
    public void testDistanceToOnePlaceInKm() {
        GeographicCoordinate newYork = new Geo(40.6974881, -73.979681);

        double earthRadiusInKm = 6378.0;

        long distance = GreatCircleDistance.between(newYork, newYork, earthRadiusInKm);
        
        assertEquals(0L, distance, "Distance in km is not accurate");
    }

    @Test
    @DisplayName("hridayab: test for one place in miles")
    public void testDistanceToOnePlaceInMiles() {
        GeographicCoordinate losAngeles = new Geo(34.020479, -118.4117325);

        double earthRadiusInMiles = 3963.0; 

        long distance = GreatCircleDistance.between(losAngeles, losAngeles, earthRadiusInMiles);

        assertEquals(0L, distance, "Distance in miles is not accurate");
    }

    @Test
    @DisplayName("hridayab: test for one place in nautical miles")
    public void testDistanceToOnePlaceInNauticalMiles() {
        GeographicCoordinate chicago = new Geo(41.833733, -87.731964);

        double earthRadiusInNauticalMiles = 3444.0; 

        long distance = GreatCircleDistance.between(chicago, chicago, earthRadiusInNauticalMiles);

        assertEquals(0L, distance, "Distance in nautical miles is not accurate");
    }

    @Test
    @DisplayName("ingjacob: test for two places in km")
    public void testDistanceToTwoPlacesInKm() {
        GeographicCoordinate paris = new Geo(48.864716, 2.349014);

        double earthRadiusInKm = 6378.0;

        long distance1 = GreatCircleDistance.between(paris, origin, earthRadiusInKm);
        long distance2 = GreatCircleDistance.between(origin, paris, earthRadiusInKm);
        
        assertEquals(distance1, distance2, "Distance in km is not consistent");
        assertTrue(distance1 > 0L, "Distance should be greater than zero");
    }

    @Test
    @DisplayName("ingjacob: test for two places in mi")
    public void testDistanceToTwoPlacesInMi() {
        GeographicCoordinate paris = new Geo(48.864716, 2.349014);

        double earthRadiusInMiles = 3963.0;

        long distance1 = GreatCircleDistance.between(paris, origin, earthRadiusInMiles);
        long distance2 = GreatCircleDistance.between(origin, paris, earthRadiusInMiles);
        
        assertEquals(distance1, distance2, "Distance in mi is not consistent");
        assertTrue(distance1 > 0L, "Distance should be greater than zero");
    }

    @Test
    @DisplayName("ingjacob: test for two places in nautical miles")
    public void testDistanceToTwoPlacesInNauticalMiles() {
        GeographicCoordinate paris = new Geo(48.864716, 2.349014);

        double earthRadiusInNauticalMiles = 3444.0;

        long distance1 = GreatCircleDistance.between(paris, origin, earthRadiusInNauticalMiles);
        long distance2 = GreatCircleDistance.between(origin, paris, earthRadiusInNauticalMiles);
        
        assertEquals(distance1, distance2, "Distance in nautical miles is not consistent");
        assertTrue(distance1 > 0L, "Distance should be greater than zero");
    }

}
