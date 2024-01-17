package com.tco.requests;

import java.util.List;
import java.util.ArrayList;
import com.tco.misc.GreatCircleDistance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends Request {
    private static final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    // Private instance variables
    private Places places;
    private Double earthRadius;
    private Distances distances;
    
    // Stub override method
    @Override
    public void buildResponse() {
        if (places == null || places.isEmpty()) {
            log.warn("No places provided. Returning an empty distance list.");
            distances = new Distances(); // An empty distances object.
        } else {
            distances = buildDistanceList();
        }
        log.trace("buildResponse -> {}", this);
    }

    private Distances buildDistanceList() {
        distances = new Distances();
        // Constructs new Distances ArrayList.
        // Distances between places will be calculated here.
        
        // Just one place
        if (places.size() == 1) {
            distances.add(0L);
            return distances;
        }

        // Same place, two places, many places
        distances = measureDistances(distances);

        // Return empty
        return distances;
    }

    private Distances measureDistances(Distances d) {
        for (int i = 0; i < places.size(); i++) {
            Place from = places.get(i);
            Place to;

            if (i == places.size() - 1) {
                to = places.get(0);
            } else {
                to = places.get(i + 1);
            }

            if (i < places.size() - 1 && from.equals(to)) {
                d.add(0L);
            } else {
                Long distance = GreatCircleDistance.between(from, to, earthRadius);
                d.add(distance);
            }
        }
        return d;
    }

    // Default Constructor
    public DistancesRequest() {
    }

    // Parameterized Constructor    
    public DistancesRequest(double earthRadius, Places places) {
        super();
        if (earthRadius < 0) {
            throw new IllegalArgumentException("Invalid earthRadius value");
        }
        if (places == null) {
            throw new NullPointerException("Places cannot be null");
        }
        this.requestType = "distances";
        this.earthRadius = earthRadius;
        this.places = places;
    }

    // Getters
    public double earthRadius() {
        if (this.earthRadius == null) {
            throw new IllegalStateException("earthRadius has not been initialized.");
        }
        return this.earthRadius;
    }

    public Places places() {
        if (this.places == null) {
            throw new IllegalStateException("places has not been initialized.");
        }
        return this.places;
    }

    public Distances distances() {
        if (this.distances == null) {
            throw new IllegalStateException("distances has not been initialized.");
        }
        return this.distances;
    }
}
