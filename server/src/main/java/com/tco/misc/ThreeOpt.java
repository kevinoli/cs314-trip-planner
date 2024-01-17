package com.tco.misc;

import com.tco.requests.Places;

public class ThreeOpt extends Tour {

    public ThreeOpt(Places places, Double responseTime, Double earthRadius) {
        super(places, responseTime, earthRadius);
    }

    @Override
    public boolean improve() {
        boolean improvement = false;

        int n = route.length;

        for (int i = 0; i <= n - 3; i++) {
            for (int j = i + 1; j < n - 2; j++) {
                for (int k = j + 1; k < n - 1; k++) {
                    if (threeOptImproves(i, j, k)) {
                        improvement = true;
                    }
                }
            }
        }
        return improvement;
    }

    public boolean threeOptImproves(int i, int j, int k) {
        int originalSegmentDistance = threeOptLegDistance(i, j, k);
        int reversals = threeOptReversals(i, j, k);

        int postSwapSegmentDistance = originalSegmentDistance;

        if (threeOptReverseI1J(reversals)) {
            threeOptReverse(i + 1, j);
            postSwapSegmentDistance = threeOptLegDistance(i, j, k);
            if (postSwapSegmentDistance >= originalSegmentDistance) {
                threeOptReverse(i + 1, j);
                postSwapSegmentDistance = originalSegmentDistance;
            }
        }

        if (threeOptReverseJ1K(reversals) && postSwapSegmentDistance == originalSegmentDistance) {
            threeOptReverse(j + 1, k);
            postSwapSegmentDistance = threeOptLegDistance(i, j, k);
            if (postSwapSegmentDistance >= originalSegmentDistance) {
                threeOptReverse(j + 1, k);
                postSwapSegmentDistance = originalSegmentDistance;
            }
        }

        if (threeOptReverseI1K(reversals) && postSwapSegmentDistance == originalSegmentDistance) {
            threeOptReverse(i + 1, k);
            postSwapSegmentDistance = threeOptLegDistance(i, j, k);
            if (postSwapSegmentDistance >= originalSegmentDistance) {
                threeOptReverse(i + 1, k);
            }
        }

        return postSwapSegmentDistance < originalSegmentDistance;
    }

    public int threeOptLegDistance(int i, int j, int k) {
        return distanceMatrix[route[i]][route[i + 1]] +
               distanceMatrix[route[j]][route[j + 1]] +
               distanceMatrix[route[k]][route[k + 1]];
    }

    public boolean threeOptReverseI1J(int reversals) {
        return (reversals & 0b001) > 0;
    }

    public boolean threeOptReverseJ1K(int reversals) {
        return (reversals & 0b010) > 0;
    }

    public boolean threeOptReverseI1K(int reversals) {
        return (reversals & 0b100) > 0;
    }

    public int threeOptReversals(int i, int j, int k) {
        int currentDistance = threeOptLegDistance(i, j, k);
        int dI1J1 = distanceMatrix[route[i]][route[j + 1]];
        int dJ1I1 = distanceMatrix[route[j]][route[i + 1]];
        int dK1I1 = distanceMatrix[route[k]][route[i + 1]];

        int reverseI1J = dI1J1 + dJ1I1 + distanceMatrix[route[j]][route[k + 1]];
        int reverseJ1K = distanceMatrix[route[i]][route[j]] + distanceMatrix[route[j + 1]][route[k + 1]] + dK1I1;
        int reverseI1K = distanceMatrix[route[i]][route[k]] + distanceMatrix[route[j]][route[k]] + dJ1I1;

        int improvement = 0;
        int maxImprovement = 0;

        if (reverseI1J < currentDistance && (currentDistance - reverseI1J) > maxImprovement) {
            maxImprovement = currentDistance - reverseI1J;
            improvement = 0b001;
        }
        if (reverseJ1K < currentDistance && (currentDistance - reverseJ1K) > maxImprovement) {
            maxImprovement = currentDistance - reverseJ1K;
            improvement = 0b010;
        }
        if (reverseI1K < currentDistance && (currentDistance - reverseI1K) > maxImprovement) {
            maxImprovement = currentDistance - reverseI1K;
            improvement = 0b100;
        }

        return improvement;
    }

    public void threeOptReverse(int start, int end) {
        while (start < end) {
            int temp = route[start];
            route[start] = route[end];
            route[end] = temp;
            start++;
            end--;
        }
    }
}
