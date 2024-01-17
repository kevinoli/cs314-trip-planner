package com.tco.misc;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;
import com.tco.requests.Places;
import com.tco.requests.Place;

public class TestTwoOpt {

    private Places places;
    private Double responseTime;
    private Double earthRadius;
    private TwoOpt twoOpt;
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
        twoOpt = new TwoOpt(places, responseTime, earthRadius);
        twoOpt.setDistanceMatrix(distanceMatrix);
    }

    @Test
    @DisplayName("dmorigea: Checking improvements in edge cases")
    public void shouldNotImproveInEdgeCases() {
        twoOpt.setRoute(new int[] {0, 1, 2, 3});
        assertFalse(twoOpt.twoOptImproves(0, 2));
    }

    @Test
    @DisplayName("dmorigea: Determining improvements in unchanged scenario")
    public void shouldNotImproveInUnchangedScenario() {
        twoOpt.setRoute(new int[] {0, 1, 2, 3});
        assertFalse(twoOpt.twoOptImproves(1, 3));
    }

    @Test
    @DisplayName("dmorigea: Identifying scenarios with no possible improvement")
    public void shouldNotImproveInNoPossibleImprovementScenario() {
        twoOpt.setRoute(new int[] {0, 1, 2, 3});
        assertFalse(twoOpt.twoOptImproves(1, 2));
    }

    @Test
    @DisplayName("dmorigea: Determining improvements in complex scenarios")
    public void shouldNotImproveInComplexScenario() {
        twoOpt.setRoute(new int[] {0, 3, 1, 2});
        assertFalse(twoOpt.twoOptImproves(1, 2));
    }

    @Test
    @DisplayName("dmorigea: Validation of sub-array reversal functionality")
    public void shouldCorrectlyReverseSubArray() {
        twoOpt.setRoute(new int[] {0, 1, 2, 3});
        twoOpt.twoOptReverse(1, 2);
        assertArrayEquals(new int[] {0, 2, 1, 3}, twoOpt.getRoute());
    }

    @Test
    @DisplayName("dmorigea: Reversal of the complete array")
    public void shouldReverseEntireArray() {
        twoOpt.setRoute(new int[] {0, 1, 2, 3});
        twoOpt.twoOptReverse(0, 3);
        assertArrayEquals(new int[] {3, 2, 1, 0}, twoOpt.getRoute());
    }

    @Test
    @DisplayName("dmorigea: Optimization using non-adjacent indices")
    public void shouldOptimizeUsingNonAdjacentIndices() {
        int[] subOptimalRoute = new int[] {0, 1, 3, 2};
        twoOpt.setRoute(subOptimalRoute);
        twoOpt.improve();
        assertArrayEquals(new int[]{0, 1, 2, 3}, twoOpt.getRoute());
    }

    @Test
    @DisplayName("dmorigea: Optimal paths should remain unchanged after optimization")
    public void shouldNotChangeOptimalPaths() {
        int[] optimalRoute = new int[] {0, 1, 2, 3};
        twoOpt.setRoute(optimalRoute);
        twoOpt.improve();
        assertArrayEquals(new int[]{0, 1, 2, 3}, twoOpt.getRoute());
    }

    @Test
    @DisplayName("hridayab: test improve method")
    public void testImprove() {
        int[] initialRoute = new int[] {0, 1, 2, 3};
        twoOpt.setRoute(initialRoute);

        Places initialTrip = new Places();
        initialTrip.add(new Place("38.89767712103069", "-77.03653040032806"));
        initialTrip.add(new Place("51.50136313697985", "-0.14189067225761925"));
        
        twoOpt.improve();

        assertArrayEquals(initialRoute, twoOpt.getRoute());
    }
}