package com.tco.misc;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import com.tco.requests.Places;
import com.tco.requests.Place;

public class TestThreeOpt {

    private Places places;
    private Double responseTime;
    private Double earthRadius;
    private ThreeOpt threeOpt;
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
        threeOpt = new ThreeOpt(places, responseTime, earthRadius);
        threeOpt.setDistanceMatrix(distanceMatrix);
    }

    @Test
    @DisplayName("dmorigea: Test 3-Opt without changes")
    public void testThreeOptNoChange() {
        int[] route = {0, 1, 2, 3, 0};
        threeOpt.setRoute(route);
        threeOpt.improve();
        assertArrayEquals(new int[] {0, 1, 2, 3, 0}, threeOpt.getRoute());
    }
    
    @Test
    @DisplayName("dmorigea: Test setting and getting route")
    public void testSetGetRoute() {
        int[] expectedRoute = {0, 1, 2, 3, 0};
        threeOpt.setRoute(expectedRoute);
        assertArrayEquals(expectedRoute, threeOpt.getRoute(), "Expected route to be set and retrieved correctly");
    }

    @Test
    @DisplayName("dmorigea: Test 3-Opt optimize")
    public void testThreeOptOptimize() {
        int[] route = {0, 3, 1, 2, 0};
        threeOpt.setRoute(route);
        assertTrue(threeOpt.improve(), "Expected threeOptOptimize to return true");
    }
    
    @Test
    @DisplayName("dmorigea: Validate 3-Opt recognizes route improvement opportunities")
    public void threeOptImprovesTest() {
        ThreeOpt route = new ThreeOpt(places,responseTime,earthRadius);
        route.setDistanceMatrix(distanceMatrix);
        int[] initialRoute = {0, 1, 2, 3, 0};
        route.setRoute(initialRoute);
        int initialDistance = route.threeOptLegDistance(0, 1, 3);
        route.improve();
        int optimizedDistance = route.threeOptLegDistance(0, 1, 3);
        assertTrue(optimizedDistance <= initialDistance,
                "Optimized route should be less than or equal to initial route distance");
    }

    @Test
    @DisplayName("dmorigea: No Improvement in 3-Opt")
    void testThreeOptImprovesNoImprovement() {
        int[] route = {0, 1, 2, 3, 0};
        threeOpt.setRoute(route);
        assertFalse(threeOpt.threeOptImproves(0, 1, 2));
    }

    @Test
    @DisplayName("dmorigea: Improvement by Reversing J1K in 3-Opt")
    void testThreeOptImprovesImprovementByReversingJ1K() {
        int[] route = {0, 1, 2, 3, 0};
        threeOpt.setRoute(route);
        assertFalse(threeOpt.threeOptImproves(0, 1, 2));
    }

    @Test
    @DisplayName("dmorigea: Improvement by Reversing J1K in 3-Opt")
    void testThreeOptImproves_ImprovementByReversingJ1K() {
        int[] route = {0, 1, 2, 3, 0};
        threeOpt.setRoute(route);
        assertFalse(threeOpt.threeOptImproves(0, 1, 2));
    }

    @Test
    @DisplayName("dmorigea: Test 3-Opt reversals")
    public void testThreeOptReversals() {
        int[] route = {0, 1, 2, 3, 0};
        threeOpt.setRoute(route);
        int reversalType = threeOpt.threeOptReversals(0, 1, 2);
        assertEquals(1, reversalType, "Expected the optimal reversal to be of type I1J");
    }

    @Test
    @DisplayName("dmorigea: Test 3-Opt reverse")
    public void testThreeOptReverse() {
        int[] route = {0, 1, 2, 3, 0};
        threeOpt.setRoute(route);
        threeOpt.threeOptReverse(1, 2);
        assertArrayEquals(new int[] {0, 2, 1, 3, 0}, threeOpt.getRoute());
    }

    @Test
    @DisplayName("dmorigea: Checking for route improvements")
    public void shouldImproveRoute() {
        int[] route = {0, 2, 1, 3};
        threeOpt.setRoute(route);
        assertTrue(threeOpt.improve(), "ThreeOpt should have improved the route.");
    }

    @Test
    @DisplayName("dmorigea: Checking if the ThreeOpt improve function detects no improvements needed")
    public void shouldNotImproveWithTwoOpt() {
        threeOpt.setRoute(new int[] {0, 1, 2, 3});
        assertFalse(threeOpt.improve(), "TwoOpt should not find improvements.");
    }
}