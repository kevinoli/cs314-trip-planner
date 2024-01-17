package com.tco.misc;

import com.tco.requests.Places;

public class TwoOpt extends Tour{

    public TwoOpt(Places places, Double responseTime, Double earthRadius) {
        super(places, responseTime, earthRadius);
    }

    @Override
    public boolean improve() {
        boolean improvement = false;

        for (int i = 0; i <= distanceMatrix.length - 3; i++) {
            for (int k = i + 2; k <= distanceMatrix.length - 1; k++) {
                if (twoOptImproves(i, k)) {
                    twoOptReverse(i + 1, k);
                    improvement = true;
                }
            }
        }
        return improvement;
    }

    public boolean twoOptImproves(int i, int k) {
        if (i == 0 && k == distanceMatrix.length - 1) return false;
        return twoOptLegDistance(i, i+1) + twoOptLegDistance(k, (k+1) % distanceMatrix.length) > twoOptLegDistance(i, k) + twoOptLegDistance(i+1, (k+1) % distanceMatrix.length);
    }

    public int twoOptLegDistance(int i, int j) {
        return distanceMatrix[route[i]][route[j]];
    }

    public void twoOptReverse(int i1, int k) {
        while (i1 < k) {
            int temp = route[i1];
            route[i1] = route[k];
            route[k] = temp;
            i1++;
            k--;
        }
    }
}
