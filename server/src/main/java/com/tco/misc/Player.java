package com.tco.misc;

import com.tco.requests.Places;
import com.tco.requests.Place;

public class Player {

    private Places trip;
    private int currentDestination;
    private boolean isWalking;


    public Player() {
    }

    public Player(Places trip, int currentDestination, boolean isWalking) {
        this.trip = trip;
        this.currentDestination = currentDestination;
        this.isWalking = isWalking;
    }
    
    public void walkThrough() {
        // to be implemented
    }

    public Places getTrip() {
        return trip;
    }

    public int getCurrentDestination() {
        return currentDestination;
    }

    public boolean getIsWalking() {
        return isWalking;
    }

    public void setTrip(Places trip) {
        this.trip = trip;
    }

    public void setCurrentDestination(int currentDestination) {
        this.currentDestination = currentDestination;
    }

    public void setIsWalking(boolean isWalking) {
        this.isWalking = isWalking;
    }
}
