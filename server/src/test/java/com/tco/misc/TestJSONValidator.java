package com.tco.misc;

import com.tco.requests.ConfigRequest;
import com.tco.requests.DistancesRequest;
import com.tco.requests.FindRequest;
import com.tco.requests.TourRequest;

import java.lang.reflect.Type;

import org.everit.json.schema.SchemaException;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.MockedStatic;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


public class TestJSONValidator {

    private void test(String request, Type type, boolean valid) {
        try {
            JSONValidator.validate(request, type);
            assertTrue(valid);
        } catch ( Exception e ) {
            assertFalse(valid);
        }
    }

    @Test
    @DisplayName("base: Config request should fail schema validation")
    public void testConfigRequestFail() {
        test("{}", ConfigRequest.class, false);
    }

    @Test
    @DisplayName("base: Config request should pass schema validation")
    public void testConfigRequestPass() {
        test("{\"requestType\":\"config\",\"features\":[\"config\",\"distances\"]}", ConfigRequest.class, true);
    }

    @Test
    @DisplayName("base: There should be no schema for the JSONValidator class")
    public void testMissingSchema() {
        test("", JSONValidator.class, false);
    }

    @Test
    @DisplayName("base: An invalid schema results in validate() failing")
    public void testInvalidSchema() {
        try (MockedStatic<SchemaLoader> mockedSchemaLoader = mockStatic(SchemaLoader.class)) {
            mockedSchemaLoader.when(() -> SchemaLoader.load(any(JSONObject.class)))
                    .thenThrow(SchemaException.class);

            test("{\"requestType\":\"config\"}", ConfigRequest.class, false);
        }
    }

    /* DistancesRequest */
    @Test
    @DisplayName("rpcme: Distances request should fail schema validation")
    public void testDistancesRequestFail() {
        test("{}", DistancesRequest.class, false);
    }

    @Test
    @DisplayName("ingjacob: Distances request should pass schema validation")
    public void testDistancesRequestPass() {
        test("{\"requestType\":\"distances\",\"places\":[], \"earthRadius\":3963.0}", DistancesRequest.class, true);
    }

    /* FindRequest */
    @Test
    @DisplayName("rpcme: Find request should fail schema validation")
    public void testFindRequestFail() {
        test("{}", FindRequest.class, false);
    }

    @Test
    @DisplayName("rpcme: Find request should pass schema validation with required parameters")
    public void testFindRequestPassMinimal() {
        test("{\"requestType\":\"find\", \"match\":\"ice\", \"limit\": 50}", FindRequest.class, true);
    }

    @Test
    @DisplayName("rpcme: Find request should pass schema validation with required and optional parameters")
    public void testFindRequestPassOptional () {
        test("{\"requestType\":\"find\", \"match\":\"ice\", \"limit\": 50, \"type\": [], \"where\": []}", FindRequest.class, true);
    }
    
    /* FindRequest */
    @Test
    @DisplayName("rpcme: Tour request should fail schema validation")
    public void testTourRequestFail() {
        test("{}", TourRequest.class, false);
    }

    @Test
    @DisplayName("rpcme: Tour request should pass schema validation with required parameters, no places")
    public void testTourRequestPassMinimal() {
        test("{\"requestType\":\"tour\", \"earthRadius\": 777, \"response\": 0, \"places\":[]}", TourRequest.class, true);
    }

    @Test
    @DisplayName("rpcme: Tour request should pass schema validation with required parameters, places")
    public void testTourRequestPassPlace() {
        String place = "{ \"name\": \"A Place\", \"latitude\": \"50.0\", \"longitude\": \"50.0\" }";
        test("{\"requestType\":\"tour\", \"earthRadius\": 777, \"response\": 0, \"places\":[" + place + "] }", TourRequest.class, true);
    }

    @Test
    @DisplayName("rpcme: Tour request should pass schema validation with required parameters, places twice")
    public void testTourRequestPassPlaceTwo() {
        String place1 = "{ \"name\": \"A Place\", \"latitude\": \"50.0\", \"longitude\": \"50.0\" }";
        String place2 = "{ \"name\": \"A Second Place\", \"latitude\": \"60.0\", \"longitude\": \"60.0\" }";
        test("{\"requestType\":\"tour\", \"earthRadius\": 777, \"response\": 0, \"places\":[" + place1 + "," + place2 + "] }", TourRequest.class, true);
    }
}
