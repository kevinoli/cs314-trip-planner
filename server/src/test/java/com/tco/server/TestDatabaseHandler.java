package com.tco.server;

import com.tco.requests.Places;
import com.tco.requests.Place;

import java.sql.*;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;


public class TestDatabaseHandler {

    // private database credential vaaraibles from DatabaseHandler.java
	// private database credential vaaraibles
	private String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");;
	private String onDocker = System.getenv("CS314_DOCKER");
	private String DB_URL = (useTunnel != null && useTunnel.equals("true")) ? "jdbc:mariadb://127.0.0.1:52828/cs314" : (onDocker != null && onDocker.equals("true")) ? "jdbc:mariadb://127.0.0.1:3306/cs314" :  "jdbc:mariadb://faure.cs.colostate.edu/cs314";
	private static final String DB_USER = "cs314-db";
	private static final String DB_PASSWORD = "eiK5liet1uej";

    @Test
    @DisplayName("hridayab: should be able to instantiate")
    public void TestDatabaseHandlerInstantiation() {
        DatabaseHandler testObj = new DatabaseHandler();
    }

    @Test
    @DisplayName("truongak: tests default constructor")
    public void testDefaultConstructor() {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        assertNotNull(databaseHandler);
    }

    @Test
    @DisplayName("truongak: test defined credentials by connection to database")
    public void TestDatabaseCredentials() {
        assertDoesNotThrow(() -> {
            try {
                Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            } catch (SQLException e) {
                fail("Exception not expected: " + e.getMessage());
            }
        });
    }

    @Test
    @DisplayName("truongak: test invalid credentials")
    public void TestInvalidDatabaseCredentials() {
        assertThrows(SQLException.class, () -> {
            Connection conn = DriverManager.getConnection("jdbc:mariadb://localhost:3306/invalid_database", "invalid_user", "invalid_password");
        });
    }

    @Test
    @DisplayName("truongak: test getPlaces with test match adn no limit")
    public void TestGetPlacesWithMatchAndLimit() throws Exception  {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        Places places = new Places(); 
        places = databaseHandler.getPlaces("empty", 0, null, null);
        assertEquals(0, places.size());
    }
    
    @Test
    @DisplayName("truongak: test getFound with expected find with match and limit")
    public void TestGetFoundWithMatchAndLimit() throws Exception  {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        Integer foundCount; 
        foundCount = databaseHandler.getFound("test", null, null);
        assertEquals(14, foundCount);
    
    }
    @Test
    @DisplayName("truongak: test getFound with expected find with match and limit")
    public void TestEmptyGetFoundWithMatchAndLimit() throws Exception  {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        Integer foundCount; 
        foundCount = databaseHandler.getFound("empty", null, null);
        assertEquals(0, foundCount);
    }
    
    @Test
    @DisplayName("truongak: test buildQuery with non-null data, non-null match, and non-zero limit")
    public void testBuildQueryWithMatchAndLimit() {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        String expectedQuery = "SELECT columns FROM world JOIN region ON region.id = world.iso_region JOIN country ON country.id = world.iso_country  WHERE (world.name LIKE \"%match%\"  OR world.id LIKE \"%match%\"  OR world.iso_region LIKE \"%match%\"  OR world.municipality LIKE \"%match%\"  OR region.name LIKE \"%match%\")  LIMIT 10 ;";
        String actualQuery = databaseHandler.buildQuery("columns", "match", 10, null, null);
        assertEquals(expectedQuery, actualQuery);
    }

    @Test
    @DisplayName("truongak: test convert query to places")
    public void TestConvertQueryToPlaces() throws Exception  {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        Places places = new Places();
        String testQuery = "SELECT world.name,world.latitude,world.longitude,world.id,world.altitude,world.municipality,world.type,region.name,country.name,world.wikipedia_link FROM world JOIN region ON region.id = world.iso_region JOIN country ON country.id = world.iso_country LIMIT 1;";
        try ( Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
              PreparedStatement query = conn.prepareStatement(testQuery);
              ResultSet results = query.executeQuery()) {
            assertTrue(databaseHandler.convertResultsToPlaces(results) instanceof Places);
        } catch (Exception e) {
            throw e;
        }
    }

    @Test
    @DisplayName("rpcme: verify limit at 10")
    public void TestLimitAt10() throws Exception {
        try {
            DatabaseHandler databaseHandler = new DatabaseHandler();
            assertTrue( databaseHandler.getPlaces("Airport", 10, null, null).size() == 10 );
        } catch (Exception e) {
            throw e;
        }
    }
    
    @Test
    @DisplayName("rpcme: verify country list has 247 entries")
    public void TestCountryListSize() throws Exception {
        try {
            DatabaseHandler databaseHandler = new DatabaseHandler();
            ArrayList<String> countryList = databaseHandler.getCountryList();
            assertTrue( countryList.size() == 247 );
        } catch (Exception e) {
            throw e;
        }
    }

    @Test
    @DisplayName("rpcme: verify type list has 7 entries")
    public void TestTypeListSize() throws Exception {
        try {
            DatabaseHandler databaseHandler = new DatabaseHandler();
            ArrayList<String> typeList = databaseHandler.getTypeList();
            assertTrue( typeList.size() == 7 );
        } catch (Exception e) {
            throw e;
        }
    }

    @Test
    @DisplayName("truongak: test random query conditional")
    public void TestRandomQuery() {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        try {
            Places place1 = databaseHandler.getPlaces("", 1, null, null);
            Places place2 = databaseHandler.getPlaces("", 1, null, null);
            Places place3 = databaseHandler.getPlaces("", 1, null, null);
    
            // Assert that at least one of the places is different from the others
            assertFalse(place1.equals(place2) || place1.equals(place3) || place2.equals(place3));
        } catch (Exception e) {
            // Handle the exception, or rethrow it if necessary
            fail("An exception occurred: " + e.getMessage());
        }
    }
    
    @Test
    @DisplayName("truongak: test buildQuery with non-null data, non-null match, and non-zero limit, and non null types array")
    public void testBuildQueryWithType() {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        ArrayList<String> test_types = new ArrayList<String>();
        test_types.add("airport");
        String expectedQuery = "SELECT columns FROM world JOIN region ON region.id = world.iso_region JOIN country ON country.id = world.iso_country  WHERE (world.name LIKE \"%match%\"  OR world.id LIKE \"%match%\"  OR world.iso_region LIKE \"%match%\"  OR world.municipality LIKE \"%match%\"  OR region.name LIKE \"%match%\")  AND (world.type LIKE \"%airport%\") LIMIT 10 ;";
        String actualQuery = databaseHandler.buildQuery("columns", "match", 10, test_types, null);
        assertEquals(expectedQuery, actualQuery);
    }

    @Test
    @DisplayName("truongak: test buildQuery with non-null data, non-null match, and non-zero limit, and non null types array and non null wheres array")
    public void testBuildQueryWithWhere() {
        DatabaseHandler databaseHandler = new DatabaseHandler();
        ArrayList<String> test_types = new ArrayList<String>();
        test_types.add("small_airport");
        test_types.add("big_airport");
        ArrayList<String> test_wheres = new ArrayList<String>();
        test_wheres.add("Canada");
        test_wheres.add("United States");
        String expectedQuery = "SELECT columns FROM world JOIN region ON region.id = world.iso_region JOIN country ON country.id = world.iso_country  WHERE (world.name LIKE \"%match%\"  OR world.id LIKE \"%match%\"  OR world.iso_region LIKE \"%match%\"  OR world.municipality LIKE \"%match%\"  OR region.name LIKE \"%match%\")  AND (world.type LIKE \"%small_airport%\" OR world.type LIKE \"%big_airport%\") AND (country.name LIKE \"%Canada%\" OR country.name LIKE \"%United States%\") LIMIT 10 ;";
        String actualQuery = databaseHandler.buildQuery("columns", "match", 10, test_types, test_wheres);
        assertEquals(expectedQuery, actualQuery);
    }
}