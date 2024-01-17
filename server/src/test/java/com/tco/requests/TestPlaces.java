package com.tco.requests;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static java.lang.Math.PI;
import static org.junit.jupiter.api.Assertions.*;

public class TestPlaces {

    @Test
    @DisplayName("ingjacob: Places works with 1 location")
    public void testOne() {
        Places places = new Places();
        Place place = new Place("0", "0");
        places.add(place);
        assertEquals(0.0, places.get(0).latRadians());
        assertEquals(0.0, places.get(0).lonRadians());
    }

    @Test
    @DisplayName("ingjacob: Places works with 2 locations")
    public void testTwo() {
        Places places = new Places();
        Place place = new Place("0", "0");
        Place place2 = new Place("0", "-180");
        places.add(place);
        places.add(place2);
        assertEquals(0.0, places.get(0).latRadians());
        assertEquals(0.0, places.get(0).lonRadians());
        assertEquals(0.0, places.get(1).latRadians());
        assertEquals(-PI, places.get(1).lonRadians());
    }

    @Test
    @DisplayName("ingjacob: Places works with 3 locations")
    public void testMore() {
        Places places = new Places();
        Place place = new Place("0", "0");
        Place place2 = new Place("0", "-180");
        Place place3 = new Place("90", "180");
        places.add(place);
        places.add(place2);
        places.add(place3);
        assertEquals(0.0, places.get(0).latRadians());
        assertEquals(0.0, places.get(0).lonRadians());
        assertEquals(0.0, places.get(1).latRadians());
        assertEquals(-PI, places.get(1).lonRadians());
        assertEquals(PI/2, places.get(2).latRadians());
        assertEquals(PI, places.get(2).lonRadians());
    }
}
