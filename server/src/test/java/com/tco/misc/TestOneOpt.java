package com.tco.misc;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import com.tco.requests.Places;
import com.tco.requests.Place;

public class TestOneOpt {

    private Places places;
    private Double responseTime;
    private Double earthRadius;
    private OneOpt oneOpt;
    private int[][] distanceMatrix;

    @BeforeEach
    public void setUp() {
        distanceMatrix = new int[][] {
                {0, 2, 9, 10},
                {1, 0, 6, 4},
                {15, 7, 0, 8},
                {6, 3, 12, 0}
        };
        places = new Places();
        responseTime = 0.0;
        earthRadius = 3000.0;
        oneOpt = new OneOpt(places, responseTime, earthRadius);
    }
    
    @Test
    @DisplayName("hridayab: should be able to instantiate") 
    public void testOneOptDefaultConstructor() {
        OneOpt testObj = new OneOpt();
        assertNotNull(testObj);
    }

    @Test
    @DisplayName("hridayab: should be able to instantiate with parameters") 
    public void testOneOptParameterizedConstructor() {
        OneOpt testObj = new OneOpt(places, responseTime, earthRadius);
        assertNotNull(testObj);
    }

    @Test
    @DisplayName("hridayab: should get the same route back") 
    public void testSetAndGetRoute() {
        int[] route = {0, 1, 2, 3};
        oneOpt.setRoute(route);
        int[] retrievedRoute = oneOpt.getRoute();
        assertArrayEquals(route, retrievedRoute, "route should be the same");
    }

    @Test
    @DisplayName("hridayab: improve should not throw exceptions")
    public void testImproveNoExceptions() {
        Places trip = new Places();
        trip.add(new Place("38.89767712103069", "-77.03653040032806"));
        trip.add(new Place("51.50136313697985", "-0.14189067225761925"));
        
        assertDoesNotThrow(() -> oneOpt.improve());
    }

}