package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;

public class TestConfigRequest {

    private ConfigRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new ConfigRequest();
        conf.buildResponse();
    }

    @Test
    @DisplayName("base: Request type is \"config\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("config", type);
    }

    @Test
    @DisplayName("base: Features includes \"config\"")
    public void testConfigFeature(){
        assertTrue(conf.validFeature("config"));
    }
    
    @Test
    @DisplayName("truongak: test feature includes \"distances\"")
    public void testDistancesFeature(){
        assertTrue(conf.validFeature("distances"));
    }

    @Test
    @DisplayName("dmorigea: test feature includes \"find\"")
    public void testFindFeature(){
        assertTrue(conf.validFeature("find"));
    }

    @Test
    @DisplayName("rpcme: test feature includes \"type\"")
    public void testTypeFeature(){
        assertTrue(conf.validFeature("type"));
    }
  
    @Test
    @DisplayName("rpcme: test feature includes \"where\"")
    public void testWhereFeature(){
        assertTrue(conf.validFeature("where"));
    }

    @Test
    @DisplayName("ingjacob: test feature includes \"tour\"")
    public void testTourFeature(){
        assertTrue(conf.validFeature("tour"));
    }

    @Test
    @DisplayName("base: Team name is correct")
    public void testServerName() {
        String name = conf.getServerName();
        assertEquals("t28 Dixies Midnight Runners", name);
    }

    @Test
    @DisplayName("rpcme: Test for empty list")
    public void testWhereEmpty() {
        ArrayList<String> where = new ArrayList<String>();
        conf.setWhere(where);
        assertEquals(conf.getWhere().size(), 0);
    }

    @Test
    @DisplayName("rpcme: Test for non empty list")
    public void testWhereNonEmpty() {
        ArrayList<String> where = new ArrayList<String>();
        where.add("Country1");
        where.add("Country2");
        where.add("Country3");
        conf.setWhere(where);
        assertEquals(conf.getWhere().size(), 3);
    }

    @Test
    @DisplayName("rpcme: Test for empty type list")
    public void testTypeEmpty() {
        ArrayList<String> type = new ArrayList<String>();
        conf.setType(type);
        assertEquals(conf.getType().size(), 0);
    }
    
    @Test
    @DisplayName("rpcme: Test for non empty type list")
    public void testTypeNonEmpty() {
        ArrayList<String> type = new ArrayList<String>();
        type.add("Type1");
        type.add("Type2");
        type.add("Type3");
        conf.setType(type);
        assertEquals(conf.getType().size(), 3);
    }

}
