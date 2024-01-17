package com.tco.misc;
import com.tco.misc.Tour;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Collectors;

import com.tco.requests.Places;
import com.tco.requests.Place;
import com.tco.misc.GeographicCoordinate;
import com.tco.misc.GreatCircleDistance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class Tour {

    private static final transient Logger log = LoggerFactory.getLogger(Tour.class);
    
    protected Places trip;
    protected int[][] distanceMatrix;
    protected int[] route;
    protected Double earthRadius;
    protected Double responseTime;
    protected boolean[] unvisitedPlaces;

    // constructors
    public Tour() {}

    public Tour(Places places, Double responseTime, Double earthRadius) {
        this.trip = places;
        this.earthRadius = earthRadius;
        this.responseTime = responseTime;
        this.route = IntStream.range(0, trip.size()).toArray();
        this.unvisitedPlaces = new boolean[trip.size()];
        this.distanceMatrix = new int[trip.size()][trip.size()];
        computeDistanceMatrix(places, earthRadius);
    }
    
    // setters and getters
    public boolean[] getUnvisitedPlaces(){
        return unvisitedPlaces;
    }
    
    public void setRoute(int[] route) {
        this.route = route;
    }
    
    public int[] getRoute() {
        return route;
    }

    public void setDistanceMatrix(int[][] distanceMatrix) {
        this.distanceMatrix = distanceMatrix;
    }
    
    public int[][] getDistanceMatrix() {
        return distanceMatrix;
    }

    // shorter(): constructs and improves tours from all starting locations given available time
    public Places shorter() { 
        long startTime = System.currentTimeMillis();
        int minDistance = Integer.MAX_VALUE;
        for (int startingPlace = 0; startingPlace < trip.size(); startingPlace++) {
            if(System.currentTimeMillis() - startTime >= responseTime) { break; } // if time permits
            int[] currentRoute = construct(startingPlace);
            int currentRouteDistance = totalDistance(currentRoute);
            if (currentRouteDistance < minDistance){
                minDistance = currentRouteDistance;
                this.route = currentRoute;
            }
            improve(); // adding two opt and three opt
        } log.info("Optimized Route : {}", Arrays.toString(this.route));
        return(convertRoute(this.route));
    }

    // contruct(): creates a tour from a given starting location using the nearest neighbor algorithm.
    public int[] construct(int startingPlace) {
        int[] currentRoute = IntStream.range(0, trip.size()).toArray();
        Arrays.fill(unvisitedPlaces, true);
        currentRoute[0] = startingPlace; // set starting
        currentRoute[startingPlace] = 0; // swap starting
        unvisitedPlaces[startingPlace] = false;
        for (int lastPlace = 0; lastPlace < trip.size()-1; lastPlace++) { // find nearest of last place in route
            int nearest = Integer.MAX_VALUE;
            for (int currentPlace = 0; currentPlace < trip.size(); currentPlace++) {
                if (unvisitedPlaces[currentRoute[currentPlace]] == true) {
                    if (distanceMatrix[currentRoute[lastPlace]][currentRoute[currentPlace]]<nearest){
                        nearest = distanceMatrix[currentRoute[lastPlace]][currentRoute[currentPlace]];
                        int temp = currentRoute[lastPlace+1];
                        currentRoute[lastPlace+1] = currentRoute[currentPlace];
                        currentRoute[currentPlace] = temp;
                    }
                }
            }
            unvisitedPlaces[currentRoute[lastPlace+1]] = false;
        }
        return currentRoute;
    }

    // improve(): an abstract method that performs improvment on tour
    public abstract boolean improve();
    
    // helper functions
    private int totalDistance(int[] route) {
        int retVal = 0;
        for(int i = 0; i < route.length; i++) {
            if(i == route.length-1) retVal += distanceMatrix[route[i]][route[0]];
            else retVal += distanceMatrix[route[i]][route[i+1]];
        }
        return retVal;
    }

    private void computeDistanceMatrix(Places trip, Double earthRadius) {
        distanceMatrix = new int[trip.size()][trip.size()];
        for (int i = 0; i < trip.size(); i++) {
            for (int j = i + 1; j < trip.size(); j++) {
                Place from = trip.get(i);
                Place to = trip.get(j);
                GeographicCoordinate fromCoordinate = from;
                GeographicCoordinate toCoordinate = to;
                distanceMatrix[i][j] = GreatCircleDistance.between(fromCoordinate, toCoordinate, earthRadius).intValue();
                distanceMatrix[j][i] = distanceMatrix[i][j];
            }
        }
    }

    private Places convertRoute(int[] tour){
        Places newPlaces = new Places();
        Arrays.stream(tour).forEach(i -> newPlaces.add(trip.get(i)));
        return newPlaces;
    }
}