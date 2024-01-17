package com.tco.misc;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import com.tco.requests.Places;

public class TestTour {
    private Tour twoOpt;
    private Tour threeOpt;
    private int[][] distanceMatrix;
    private Places places;
    private Double responseTime;
    private Double earthRadius;

    @BeforeEach
    public void setUp() {
        distanceMatrix = new int[][] {
                {0, 2, 9, 10},
                {1, 0, 6, 4},
                {15, 7, 0, 8},
                {6, 3, 12, 0}
        };
        places = new Places();
        responseTime = 10.0;
        earthRadius = 3000.0;
        twoOpt = new TwoOpt(places, responseTime, earthRadius);
        threeOpt = new ThreeOpt(places, responseTime, earthRadius);
        twoOpt.setDistanceMatrix(distanceMatrix);
        threeOpt.setDistanceMatrix(distanceMatrix);
    }

    @Test
    @DisplayName("dmorigea: Test TwoOpt construct method with unvisited cities")
    public void testTwoOptConstructunvisitedPlaces() {
        twoOpt.shorter(); // Construct the tour
        int[] route = twoOpt.getRoute();

        // Check if the route includes all cities
        assertEquals(places.size(), route.length, "Route should include all cities");

        // Check that each city is visited exactly once
        boolean[] visited = new boolean[places.size()];
        for (int city : route) {
            assertFalse(visited[city], "City visited more than once");
            visited[city] = true;
        }
        for (boolean wasVisited : visited) {
            assertTrue(wasVisited, "Not all cities were visited");
        }
    }

    @Test
    @DisplayName("dmorigea: Test ThreeOpt construct method with unvisited cities")
    public void testThreeOptConstructunvisitedPlaces() {
        threeOpt.shorter(); // Construct the tour
        int[] route = threeOpt.getRoute();

        // Check if the route includes all cities
        assertEquals(places.size(), route.length, "Route should include all cities");

        // Check that each city is visited exactly once
        boolean[] visited = new boolean[places.size()];
        for (int city : route) {
            assertFalse(visited[city], "City visited more than once");
            visited[city] = true;
        }
        for (boolean wasVisited : visited) {
            assertTrue(wasVisited, "Not all cities were visited");
        }
    }

    @Test
    @DisplayName("dmorigea: Test TwoOpt unvisitedPlaces() initialization")
    public void testTwoOptunvisitedPlacesInitialization() throws IllegalAccessException, NoSuchFieldException {
        twoOpt.shorter(); // Construct the tour

        assertNotNull(twoOpt.getUnvisitedPlaces(), "unvisitedPlaces() should not be null");
        assertEquals(places.size(), twoOpt.getUnvisitedPlaces().length, "unvisitedPlaces() should have the same length as places");

        for (boolean city : twoOpt.getUnvisitedPlaces()) {
            assertTrue(city, "All cities should be initially unvisited");
        }
    }

    @Test
    @DisplayName("dmorigea: Test ThreeOpt unvisitedPlaces() initialization")
    public void testThreeOptunvisitedPlacesInitialization() throws IllegalAccessException, NoSuchFieldException {
        threeOpt.shorter(); // Construct the tour

        assertNotNull(threeOpt.getUnvisitedPlaces(), "unvisitedPlaces() should not be null");
        assertEquals(places.size(), threeOpt.getUnvisitedPlaces().length, "unvisitedPlaces() should have the same length as places");

        for (boolean city : threeOpt.getUnvisitedPlaces()) {
            assertTrue(city, "All cities should be initially unvisited");
        }
    }

    @Test
    @DisplayName("truongak: Test distance matrix calculated with twoopt")
    public void testTwoOptDistanceMatix() throws IllegalAccessException, NoSuchFieldException {
        twoOpt.shorter();

        assertNotNull(twoOpt.distanceMatrix, "distanceMatrix should not be null");
        assertEquals(distanceMatrix.length, distanceMatrix.length, "distanceMatrix should have the same length as places");
    }
    @Test
    @DisplayName("truongak: Test distance matrix calculated with threeopt")
    public void testThreeOptDistanceMatix() throws IllegalAccessException, NoSuchFieldException {
        threeOpt.shorter();

        assertNotNull(twoOpt.distanceMatrix, "distanceMatrix should not be null");
        assertEquals(distanceMatrix.length, distanceMatrix.length, "distanceMatrix should have the same length as places");
    }
}