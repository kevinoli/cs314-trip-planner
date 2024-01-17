package com.tco.requests;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static java.lang.Math.PI;
import static org.junit.jupiter.api.Assertions.*;

public class TestPlace {
    
    @Test
    @DisplayName("davematt:")
    public void testOrigin() {
        Place place = new Place("0", "0");
        assertEquals(0.0, place.latRadians());
        assertEquals(0.0, place.lonRadians());
    }

    @Test
    @DisplayName("davematt:")
    public void testDatelinePositive() {
        Place place = new Place("0", "180");
        assertEquals(0.0, place.latRadians());
        assertEquals(PI, place.lonRadians());
    }

    @Test
    @DisplayName("ingjacob:")
    public void testDatelineNegative() {
        Place place = new Place("0", "-180");
        assertEquals(0.0, place.latRadians());
        assertEquals(-PI, place.lonRadians());
    }

    @Test
    @DisplayName("davematt:")
    public void testNorthPole() {
        Place place = new Place("90", "0");
        assertEquals(PI/2.0, place.latRadians());
        assertEquals(0.0, place.lonRadians());
    }

    @Test
    @DisplayName("davematt:")
    public void testSouthPole() {
        Place place = new Place("-90", "0");
        assertEquals(-PI/2.0, place.latRadians());
        assertEquals(0.0, place.lonRadians());
    }

    @Test
    @DisplayName("dmorigea: Test ID retrieval")
    public void testId() {
        Place place = new Place("12345", "0", "0");
        assertEquals("12345", place.id());
    }
}
