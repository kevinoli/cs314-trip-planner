package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TestDistancesRequest {
    
    DistancesRequest request;
    Places places;
    Distances distances;

    static final long bigRadius = 1000000000000L;
    
    @BeforeEach
    public void beforeEach() {
        places = new Places();
        request = new DistancesRequest();
    }

    @Test
    @DisplayName("dmorigea: Test earthRadius getter when uninitialized")
    public void testUninitializedEarthRadius() {
        IllegalStateException thrown = assertThrows(
                IllegalStateException.class,
                () -> request.earthRadius(),
                "Expected earthRadius() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("earthRadius has not been initialized"));
    }

    @Test
    @DisplayName("dmorigea: Test places getter when uninitialized")
    public void testUninitializedPlaces() {
        IllegalStateException thrown = assertThrows(
                IllegalStateException.class,
                () -> request.places(),
                "Expected places() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("places has not been initialized"));
    }

    @Test
    @DisplayName("dmorigea: Test distances getter when uninitialized")
    public void testUninitializedDistances() {
        IllegalStateException thrown = assertThrows(
                IllegalStateException.class,
                () -> request.distances(),
                "Expected distances() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("distances has not been initialized"));
    }

    @Test
    @DisplayName("dmorigea: Test that buildResponse does not throw any exceptions")
    public void testBaseBuildResponse() {
        assertDoesNotThrow(() -> request.buildResponse(), "buildResponse() should not throw any exceptions");
    }

    @Test
    @DisplayName("dmorigea: constructor initializes earthRadius correctly")
    public void testConstructorEarthRadius() {
        Places mockPlaces = new Places();
        double expectedEarthRadius = 6371.0;
        request = new DistancesRequest(expectedEarthRadius, mockPlaces);
        assertEquals(expectedEarthRadius, request.earthRadius(), "Earth radius should be initialized to given value.");
    }

    @Test
    @DisplayName("dmorigea: Test constructor initializes places correctly")
    public void testConstructorPlaces() {
        Places expectedPlaces = new Places();
        Place place1 = new Place("51.47795190397333", "-0.001403636585576408"); // Prime Meridian Greenwich
        expectedPlaces.add(place1);

        double exampleEarthRadius = 6371.0;
        request = new DistancesRequest(exampleEarthRadius, expectedPlaces);
        assertEquals(expectedPlaces, request.places(), "Places should be initialized to given value.");
    }

    @Test
    @DisplayName("dmorigea: Test constructor doesn't initialize distances")
    public void testConstructorDistances() {
        Places mockPlaces = new Places();
        double exampleEarthRadius = 6371.0;
        request = new DistancesRequest(exampleEarthRadius, mockPlaces);
        IllegalStateException thrown = assertThrows(
                IllegalStateException.class,
                () -> request.distances(),
                "Expected distances() to throw, but it didn't"
        );
        assertTrue(thrown.getMessage().contains("distances has not been initialized"));
    }

    @Test
    @DisplayName("dmorigea: Test constructor with negative earthRadius")
    public void testConstructorNegativeEarthRadius() {
        Places mockPlaces = new Places();
        double negativeEarthRadius = -6371.0;
        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                () -> new DistancesRequest(negativeEarthRadius, mockPlaces)
        );
        assertTrue(thrown.getMessage().contains("Invalid earthRadius value"));
    }

    @Test
    @DisplayName("dmorigea: Test constructor with null places")
    public void testConstructorNullPlaces() {
        double exampleEarthRadius = 6371.0;
        NullPointerException thrown = assertThrows(
                NullPointerException.class,
                () -> new DistancesRequest(exampleEarthRadius, null)
        );
        assertTrue(thrown.getMessage().contains("Places cannot be null"));
    }

    @Test
    @DisplayName("dmorigea: Test buildResponse with an empty places list")
    public void testBuildResponseWithEmptyPlaces() {
        request.buildResponse();
        assertTrue(request.distances().isEmpty(), "Distances list should be empty");
    }

    @Test
    @DisplayName("Test buildResponse with zero places")
    public void testBuildResponseWithZeroPlaces() {
        request.buildResponse();
        assertTrue(request.distances().isEmpty(), "Distances list should be empty for zero places");
    }

    @Test
    @DisplayName("dmorigea: Test buildResponse with one place gives one 0 value")
    public void testBuildResponseWithOnePlace() {
        places.add(new Place("-33.92522965800079", "18.423795233066308")); // Cape Town, South Africa
        request = new DistancesRequest(bigRadius, places);
        request.buildResponse();
        assertEquals(1, request.distances().size());
        assertEquals(0L, request.distances().get(0));
    }

    @Test
    @DisplayName("dmorigea: Test buildResponse with two identical places gives one 0 value")
    public void testBuildResponseWithTwoIdenticalPlaces() {
        places.add(new Place("-0.0021423809748766657", "-78.45576461131257")); // Equator, Quito, Ecuador
        places.add(new Place("-0.0021423809748766657", "-78.45576461131257"));
        request = new DistancesRequest(bigRadius, places);
        request.buildResponse();
        assertEquals(2, request.distances().size());
        assertEquals(0L, request.distances().get(0));
    }

    @Test
    @DisplayName("dmorigea: Test buildResponse with three identical places gives three 0 values")
    public void testBuildResponseWithThreeIdenticalPlaces() {
        places.add(new Place("39.117815622831785", "-106.44523147150369")); // Mount Elbert, Colorado
        places.add(new Place("39.117815622831785", "-106.44523147150369"));
        places.add(new Place("39.117815622831785", "-106.44523147150369"));
        request = new DistancesRequest(bigRadius, places);
        request.buildResponse();
        assertEquals(3, request.distances().size());
        assertTrue(request.distances().stream().allMatch(d -> d.equals(0L)));
    }

    @Test
    @DisplayName("dmorigea: Test buildResponse with two different places")
    public void testBuildResponseWithTwoDifferentPlaces() {
        places.add(new Place("38.89767712103069", "-77.03653040032806")); // The White House, United States
        places.add(new Place("51.50136313697985", "-0.14189067225761925")); // Buckingham Palace, United Kingdom
        request = new DistancesRequest(bigRadius, places);
        request.buildResponse();
        assertEquals(2, request.distances().size());
        assertTrue(request.distances().get(0) > 0L);
    }

    @Test
    @DisplayName("dmorigea: Test buildResponse with three different places")
    public void testBuildResponseWithThreeDifferentPlaces() {
        places.add(new Place("51.50703554836061", "-0.12790143489205838")); // London, United Kingdom
        places.add(new Place("40.71277410718743", "-74.00597776332182")); // New York City, NY, United States
        places.add(new Place("35.68141686794329", "139.76888802227887")); // Tokyo, Japans
        request = new DistancesRequest(bigRadius, places);
        request.buildResponse();
        assertEquals(3, request.distances().size());
        assertTrue(request.distances().get(0) > 0L);
        assertTrue(request.distances().get(1) > 0L);
        assertTrue(request.distances().get(2) > 0L);
    }
}
