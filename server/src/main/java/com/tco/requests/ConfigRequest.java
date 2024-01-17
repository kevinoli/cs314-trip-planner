package com.tco.requests;

import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tco.server.DatabaseHandler;

public class ConfigRequest extends Request {

    private static final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);

    private String serverName;
    private List<String> features;
    private ArrayList<String> type = new ArrayList<String>();
    private ArrayList<String> where = new ArrayList<String>();

    @Override
    public void buildResponse() {
        serverName = "t28 Dixies Midnight Runners";
        features = new ArrayList<>();
        features.add("config");
        features.add("distances");
        features.add("find");
        features.add("type");
        features.add("where");
        features.add("tour");

        // These enum list values are hardcoded to ConfigResponse.json schema.
        // The app should take available filter list based on db query
        type.add("airport");
        type.add("balloonport");
        type.add("heliport");
        type.add("other");
        
        try {
            where = (new DatabaseHandler()).getCountryList();
        }
        catch (Exception e) {
            log.trace("Exception when fetching country list for \'where\'.");
        }
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public ConfigRequest() {
        this.requestType = "config";
    }

    public String getServerName() {
        return serverName;
    }

    public boolean validFeature(String feature){
        return features.contains(feature);
    }

    // For unit testing
    public ArrayList<String> getWhere() {
        return this.where;
    }

    // For unit testing
    public void setWhere(ArrayList<String> countries) {
        this.where = countries;
    }

    // For unit testing
    public ArrayList<String> getType() {
        return this.type;
    }

    // For unit testing
    public void setType(ArrayList<String> type) {
        this.type = type;
    }
}
