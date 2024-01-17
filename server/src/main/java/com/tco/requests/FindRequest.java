package com.tco.requests;

import com.tco.server.DatabaseHandler;

import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
  
public class FindRequest extends Request{
    
    private static final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    private Places places;
    private String match;
    private Integer limit = null;
    private Integer found;
    private ArrayList<String> where;
    private ArrayList<String> type;

    @Override
    public void buildResponse() {
        if (match == null || limit == null){
            log.warn("match and limit parameters must be defined");
            places = new Places();
        } else {
            places = buildPlacesList();
            found = returnFound();
        }
        log.trace("buildResponse -> {}", this);
    }

    // Return Number of FOund Places Method
    private Integer returnFound() {
        found = 0;
        try {
            DatabaseHandler databaseHandler = new DatabaseHandler();
            found = databaseHandler.getFound(match, type, where);
        } catch (Exception e) {
            log.warn("Couldnt return found places");
            System.err.println("Exception: " + e.getMessage());
        }
        return found;
    }
 
    private Places buildPlacesList() {
        try {
            DatabaseHandler databaseHandler = new DatabaseHandler();
            places = databaseHandler.getPlaces(match, limit, type, where);
        } 
        catch (Exception e) {
            log.warn("Couldnt build places list");
        }
        return places;
    }

    // Default constructor
    public FindRequest() {
    }

    // Parameterized constructor
    public FindRequest(String match, Integer limit) {
        this();
        this.requestType = "find";
        this.match = match;
        this.limit = limit;
    }

    // Getters
    public Places places() {
        if (this.places == null) {
            throw new IllegalStateException("places has not been initialized.");
        }
        return this.places;
    }

    public String match() {
        if (this.match == null) {
            throw new IllegalStateException("match has not been initialized.");
        }
        return this.match;
    }

    public Integer limit() {
        return this.limit;
    }

    public Integer found() {
        return this.found;
    }
    
    public ArrayList<String> where() {
        if (this.where == null) {
            throw new IllegalStateException("where has not been initialized.");
        }
        return this.where;
    }

    public ArrayList<String> type() {
        if (this.type == null) {
            throw new IllegalStateException("type has not been initialized.");
        }
        return this.type;
    }

    // Setters
    public void where(ArrayList<String> where) {
        this.where = where;
    }
    
    public void type(ArrayList<String> type) {
        this.type = type;
    }

}
