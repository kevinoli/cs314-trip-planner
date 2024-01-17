package com.tco.server;

import com.tco.requests.Places;
import com.tco.requests.Place;

import java.sql.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Exception;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DatabaseHandler {
    private static final transient Logger log = LoggerFactory.getLogger(DatabaseHandler.class);
    
    // private database credential vaaraibles
	private String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");;
	private String onDocker = System.getenv("CS314_DOCKER");
	private String DB_URL = (useTunnel != null && useTunnel.equals("true")) ? "jdbc:mariadb://127.0.0.1:52828/cs314" : (onDocker != null && onDocker.equals("true")) ? "jdbc:mariadb://127.0.0.1:3306/cs314" :  "jdbc:mariadb://faure.cs.colostate.edu/cs314";
	
	private static final String DB_USER = "cs314-db";
	private static final String DB_PASSWORD = "eiK5liet1uej";
	// priavte database query variables
	private final static String TABLE = "FROM world JOIN region ON region.id = world.iso_region JOIN country ON country.id = world.iso_country ";
	private final static String COLUMNS = "world.name,world.latitude,world.longitude,world.id,world.altitude,world.municipality,world.type,region.name,country.name,world.wikipedia_link";
    
	private final static String COLUMN_COUNTRY_NAME = "name";
	private final static String queryWhereList = "SELECT DISTINCT name FROM country ORDER BY name ASC";
	private final static String COLUMN_WORLD_TYPE = "type";
	private final static String queryTypeList = "SELECT DISTINCT type FROM world ORDER BY type ASC";

	public DatabaseHandler() {}
	
	private ResultSet queryDatabaseBackend(String queryString) throws Exception {
        try (
				Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
				PreparedStatement query = conn.prepareStatement(queryString);
			)
		{
			ResultSet r = query.executeQuery();
			conn.close();
			return r;
		}
		catch (Exception e) {
            throw e;
		}
	}

	public Places getPlaces(String match, Integer limit, ArrayList<String> types, ArrayList<String> wheres) throws Exception {
        try {
			ResultSet resultSet = queryDatabaseBackend(buildQuery(COLUMNS, match, limit, types, wheres));
			return convertResultsToPlaces(resultSet);
        } catch (Exception e) {
            throw e;
        }
    }

	public ArrayList<String> getCountryList() throws Exception {
		ArrayList<String> whereList = new ArrayList<String>();
		try {
			ResultSet result = queryDatabaseBackend(queryWhereList);
			while ( result.next() ) {
				whereList.add(result.getString(COLUMN_COUNTRY_NAME));
			}
			return whereList;
        }
		catch (Exception e) {
            throw e;
        }
	} 

	public ArrayList<String> getTypeList() throws Exception {
		ArrayList<String> typeList = new ArrayList<String>();
		try {
			ResultSet result = queryDatabaseBackend(queryTypeList);
			while ( result.next() ) {
				typeList.add(result.getString(COLUMN_WORLD_TYPE));
			}
			return typeList;
        }
		catch (Exception e) {
            throw e;
        }
	} 

	public Integer getFound(String match, ArrayList<String> types, ArrayList<String> wheres) throws Exception {
		String countQuery = buildQuery("COUNT(*) AS count ", match, -1, types, wheres);
        try {
			ResultSet results = queryDatabaseBackend(countQuery);
			// return count from query
			if (results.next()) {
				return results.getInt("count");
			}
			throw new Exception("No count results in found query.");
			
        } catch (Exception e) {
			throw e;
        }
    }
	
	public String buildQuery(String data, String match, Integer limit, ArrayList<String> types, ArrayList<String> wheres) {
		String selectStatement = "SELECT " + data + " ";
		String tableStatement = TABLE;
		String matchQuery = " WHERE (world.name LIKE \"%" 		+ match + "%\" " + 
							" OR world.id LIKE \"%" 			+ match + "%\" " +
							" OR world.iso_region LIKE \"%"		+ match + "%\" " +
							" OR world.municipality LIKE \"%" 	+ match + "%\" " +
							" OR region.name LIKE \"%" 			+ match + "%\") ";
		
		String limitCondition = (limit == 0) ? " LIMIT 100 ;" : 
								(limit == -1) ? " ;" : 
								" LIMIT " + limit + " ;" ;

		String randomCondition = (match.isEmpty()) ? " ORDER BY RAND() " : "";
        
		String typeCondition = (types != null && !types.isEmpty()) ?
				" AND (" + types.stream().map(type ->
						type.equals("other") ? "world.type NOT LIKE \"%airport%\" AND world.type NOT LIKE \"%balloonport%\" AND world.type NOT LIKE \"%heliport%\""
								: "world.type LIKE \"%" + type + "%\"")
						.collect(Collectors.joining(" OR ")) + ")" : "";

		String whereCondition = (wheres != null && !wheres.isEmpty()) ? 
			" AND (" + wheres.stream().map(where -> "country.name LIKE \"%" + where + "%\"").collect(Collectors.joining(" OR ")) + ")" : "";
		
		return selectStatement + tableStatement + matchQuery + typeCondition + whereCondition + randomCondition + limitCondition;
    }

	public Places convertResultsToPlaces(ResultSet results) throws SQLException {
        String[] placesAttrs = "name,latitude,longitude,id,altitude,municipality,type,region,country,url".split(",");
        Places places = new Places();

        while (results.next()) {
            Place place = new Place();
            for (int i = 0; i < placesAttrs.length; i++) {
                place.put(placesAttrs[i], results.getString(i + 1));
            }
            places.add(place);
        }
        return places;
    }

}
