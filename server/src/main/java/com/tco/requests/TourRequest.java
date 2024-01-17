package com.tco.requests;
import com.tco.misc.Tour;

import com.tco.misc.OneOpt;
import com.tco.misc.TwoOpt;
import com.tco.misc.ThreeOpt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends Request{

    private static final transient Logger log = LoggerFactory.getLogger(TourRequest.class);

    private Double earthRadius;
    private Double response;
    private Places places;

    @Override
    public void buildResponse() {
        if (places == null || places.isEmpty()) {
            log.warn("No places provided.");
            places = new Places();
        }
        else {
            constructAndImproveTour();
        }
        log.trace("buildResponse -> {}", this);
    }
    
    private void constructAndImproveTour() {
        try {
            long startTime = System.currentTimeMillis();
            places = (System.currentTimeMillis() - startTime < response) ? new OneOpt(places, response, earthRadius).shorter() : places;
            places = (System.currentTimeMillis() - startTime < response) ? new TwoOpt(places, response, earthRadius).shorter() : places;
            places = (System.currentTimeMillis() - startTime < response) ? new ThreeOpt(places, response, earthRadius).shorter() : places;            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public TourRequest() {
    }

    public TourRequest(Places places, Double response, Double earthRadius) {
        super();
        if (earthRadius < 0) {
            throw new IllegalArgumentException("Invalid earthRadius value");
        }
        if (places == null) {
            throw new NullPointerException("Places cannot be null");
        }
        if (response == null) {
            throw new NullPointerException("Response cannot be null");
        }
        this.requestType = "tour";
        this.earthRadius = earthRadius;
        this.places = places;
        this.response = response;
    }

    public Double earthRadius() {
        if (this.earthRadius == null) {
            throw new IllegalStateException("earthRadius has not been initialized yet.");
        }
        return this.earthRadius;
    }

    public Places places() {
        if (this.places == null) {
            throw new IllegalStateException("places has not been initialized yet.");
        }
        return this.places;
    }
}