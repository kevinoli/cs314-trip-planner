package com.tco.requests;

import com.tco.misc.GeographicCoordinate;
import java.util.HashMap;

public class Place extends HashMap<String, String> implements GeographicCoordinate {
    //Constructor for testing
    public Place (String lat, String lon) {
        this.put("latitude", lat);
        this.put("longitude", lon);
    }

    // Constructor with ID for indexing
    public Place (String id, String lat, String lon) {
        this.put("id", id);
        this.put("latitude", lat);
        this.put("longitude", lon);
    }
    
    //Default constructor (required for GSON)
    public Place () {}

    //methods
    public Double latRadians() {
        return Math.toRadians(Double.parseDouble(this.get("latitude")));
    }

    public Double lonRadians() {
        return Math.toRadians(Double.parseDouble(this.get("longitude")));
    }

    public String id() {
        return this.get("id");
    }
}
