package com.tco.requests;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

public class TestFindRequest {

    @Test
    @DisplayName("hridayab: should be able to instantiate")
    public void testFindRequestConstructor() {
        FindRequest request = new FindRequest();
    }

    @Test
    @DisplayName("dmorigea: Default constructor should create an instance without issues")
    public void testDefaultConstructor() {
        assertDoesNotThrow(() -> new FindRequest(), "Default constructor should create an instance without issues");
    }

    @Test
    @DisplayName("dmorigea: Parameterized constructor should create an instance without issues")
    public void testParameterizedConstructor() {
        String testMatch = "denver";
        int testLimit = 10;
        
        assertDoesNotThrow(() -> new FindRequest(testMatch, testLimit),
                "Parameterized constructor should create an instance without issues");
    }

    @Test
    @DisplayName("truongak: Test that buildResponse does not throw any exceptions")
    public void testBaseBuildResponse() {
        FindRequest request = new FindRequest();
        assertDoesNotThrow(() -> request.buildResponse(), "buildResponse() should not throw any exceptions");
    }

    @Test
    @DisplayName("ingjacob: Test places getter when uninitialized")
    public void testUninitializedPlaces() {
        FindRequest request = new FindRequest();
        IllegalStateException thrown = assertThrows(
                IllegalStateException.class,
                () -> request.places(),
                "Expected places() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("places has not been initialized"));
    }

    @Test
    @DisplayName("ingjacob: Test match getter when uninitialized")
    public void testUninitializedMatch() {
        FindRequest request = new FindRequest();
        IllegalStateException thrown = assertThrows(
                IllegalStateException.class,
                () -> request.match(),
                "Expected match() to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("match has not been initialized"));
    }

    //Test Places getter when initialized (when buildResponse() is complete)

    @Test
    @DisplayName("ingjacob: Test match getter when initialized")
    public void testMatchGetter() {
        FindRequest request = new FindRequest("New York", 10);
        assertEquals("New York", request.match());
    }

    @Test
    @DisplayName("ingjacob: Test limit getter (primitive value cannot be tested for uninitialization)")
    public void testLimitGetter() {
        FindRequest request = new FindRequest("New York", 10);
        assertEquals(10, request.limit());
    }
    
    @Test
    @DisplayName("truongak: test getfound with match and limit")
    public void testReturnFound() {
        FindRequest request = new FindRequest("test", 20);
        request.buildResponse();
        assertEquals(14, request.found());
    }
    
    @DisplayName("hridayab: should return an empty places list when nothing is passed in")
    public void testBuildResponseEmptyList() {
        FindRequest request = new FindRequest();
        request.buildResponse();
        assertTrue(request.places().isEmpty(), "buildResponse method is not returning an empty places list");
    }
    
    @Test
    @DisplayName("hridayab: should return places when match and limit are passed in")
    public void testBuildPlacesList() {
        FindRequest request;
        request = new FindRequest("test", 20);
        request.buildResponse();
        assertEquals(14, request.places().size());
    }

    @Test
    @DisplayName("dmorigea: Test buildResponse for match != null condition")
    public void testBuildResponseWithNonNullMatch() {
        FindRequest validRequest = new FindRequest("Denver", 10);
        validRequest.buildResponse();
        assertFalse(validRequest.places().isEmpty(), "When match is not null and limit is > 0, places should not be empty");
    }

    @Test
    @DisplayName("hridayab: test buildResponse when match is null")
    public void testBuildResponseWhenMatchIsEmpty() {
        FindRequest request = new FindRequest(null, 10);
        request.buildResponse();
        assertEquals(request.limit(), 10);
        assertTrue(request.places().isEmpty());
    }

    @Test
    @DisplayName("truongak: test limit of 0 returns 100")
    public void testBuildResponseWithLimitZero() {
        FindRequest request = new FindRequest("", 0);
        request.buildResponse();
        assertEquals(100 ,request.places().size());
    }

    @Test
    @DisplayName("truongak: test optional where")
    public void testOptionalWhere() {
        FindRequest request = new FindRequest("", 0);
        request.buildResponse();
        assertEquals(request.found(), 50427);
        ArrayList<String> wheres = new ArrayList<>();
        wheres.add("Canada");
        wheres.add("United States");
        request.where(wheres);
        request.buildResponse();
        assertEquals(24399 ,request.found());
    }

    @Test
    @DisplayName("truongak: test optional type")
    public void testOptionalType() {
        FindRequest request = new FindRequest("", 0);
        request.buildResponse();
        assertEquals(request.found(), 50427);
        ArrayList<String> types = new ArrayList<>();
        types.add("small_airport");
        types.add("heliport");
        request.type(types);
        request.buildResponse();
        assertEquals(42258 ,request.found());
    }
}
