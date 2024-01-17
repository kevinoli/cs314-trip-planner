package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

public class TestTourRequest {

    TourRequest request;
    Places places;
    Double responseTime;

    @BeforeEach
    public void beforeEach() {
        request = new TourRequest();
        places = new Places();
        responseTime = 0.0;
    }

    @Test
    @DisplayName("hridayab: should be able to instantiate")
    public void testTourRequestConstructor() {
        request = new TourRequest();
    }

    @Test
    @DisplayName("hridayab: parameterized constructor should be able to instantiate")
    public void testParameterizedTourRequestConstructor() {
        Double testEarthRadius = 6385.2;
        request = new TourRequest(places, responseTime, testEarthRadius);
    }
   
    @Test
    @DisplayName("hridayab: the earthRadius should not be a negative number")
    public void testNegativeEarthRadiusInTourRequestConstructor() {
        Double negativeEarthRadius = -9334.0;
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> new TourRequest(places, responseTime, negativeEarthRadius));
        assertTrue(thrown.getMessage().contains("Invalid earthRadius value"));
    }

    @Test
    @DisplayName("hridayab: places cannot be null")
    public void testConstructorNullPlaces() {
        Double testEarthRadius = 8962.5;
        NullPointerException thrown = assertThrows(NullPointerException.class,() -> new TourRequest(null, responseTime, testEarthRadius));
        assertTrue(thrown.getMessage().contains("Places cannot be null"));
    }

    @Test
    @DisplayName("hridayab: earthRadius can be initialized properly")
    public void testEarthRadiusInTourRequestConstructor() {
        Double testEarthRadius = 6385.2;
        request = new TourRequest(places, responseTime, testEarthRadius);
        assertEquals(testEarthRadius, request.earthRadius(), "earthRadius should be initialized to the earth radius given.");
    }

    @Test
    @DisplayName("hridayab: places can be initialized properly")
    public void testPlacesInTourRequestConstructor() {
        Double testEarthRadius = 6385.2;
        places.add(new Place("35.0981962", "135.7188694"));
        request = new TourRequest(places, responseTime, testEarthRadius);
        assertEquals(places, request.places(), "places should be initialized to the places given.");
    }

    @Test
    @DisplayName("hridayab: buildResponse method should return empty list when no places provided")
    public void testBuildResponse() {
        request.buildResponse();
        assertTrue(request.places().isEmpty(), "places list should be empty for zero places provided");
    }

    @Test
    @DisplayName("hridayab: nearestNeighbor method should return a list of places")
    public void testNearestNeighbor() {
        Double testEarthRadius = 6385.2;
        places.add(new Place("35.0981962", "135.7188694"));
        request = new TourRequest(places, responseTime, testEarthRadius);
        request.buildResponse();
        assertNotNull(request.places());
        assertFalse(request.places().isEmpty(), "places list should not be empty");
    }
}