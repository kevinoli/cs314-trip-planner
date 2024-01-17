package com.tco.misc;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import com.tco.requests.Places;
import com.tco.requests.Place;

public class TestPlayer {
    
    @Test
    @DisplayName("hridayab: should be able to instantiate") 
    public void testPlayerDefaultConstructor() {
        Player testObj = new Player();
        assertNotNull(testObj);
    }

    @Test
    @DisplayName("hridayab: should be able to instantiate using parameterized constructor")
    public void testPlayerParameterizedConstructor() {
        Places trip = new Places();
        trip.add(new Place("38.89767712103069", "-77.03653040032806"));
        trip.add(new Place("51.50136313697985", "-0.14189067225761925"));
        int currentDestination = 13;
        boolean isWalking = true;
        Player testObj = new Player(trip, currentDestination, isWalking);
        assertNotNull(testObj);
    }

    @Test
    @DisplayName("hridayab: should be able to set and get the trip")
    public void testSetAndGetTrip() {
        Places trip = new Places();
        trip.add(new Place("38.89767712103069", "-77.03653040032806"));
        trip.add(new Place("51.50136313697985", "-0.14189067225761925"));
        Player player = new Player();
        player.setTrip(trip);
        assertEquals(trip, player.getTrip(), "should be able to set and get the trip");
    }

    @Test
    @DisplayName("hridayab: should be able to set and get the currentDestination")
    public void testSetAndGetCurrentDestination() {
        int currentDestinationIndex = 21;
        Player player = new Player();
        player.setCurrentDestination(currentDestinationIndex);
        assertEquals(currentDestinationIndex, player.getCurrentDestination(), "should be able to set and get the current destination index");
    }

    @Test
    @DisplayName("hridayab: should be able to set and get isWalking")
    public void testSetAndGetIsWalking() {
        boolean isWalking = false;
        Player player = new Player();
        player.setIsWalking(isWalking);
        assertEquals(isWalking, player.getIsWalking(), "should be able to set and get the status of player walking");
    }
}
