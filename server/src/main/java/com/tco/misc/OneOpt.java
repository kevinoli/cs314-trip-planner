package com.tco.misc;

import com.tco.requests.Places;

public class OneOpt extends Tour {

    public OneOpt() {}

    public OneOpt(Places places, Double responseTime, Double earthRadius) {
        super(places, responseTime, earthRadius);
    }

    @Override
    public boolean improve() {
        return false;
    }
}