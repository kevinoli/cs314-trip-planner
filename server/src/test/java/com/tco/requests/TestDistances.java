package com.tco.requests;

import java.util.ArrayList;
import java.lang.IllegalArgumentException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class TestDistances {  
    @Test
    @DisplayName("rpcme: test that the distances class can be instantiated")
    public void ensureDistancesObjectCreation() {
        Distances distances = new Distances();
    }

    @Test
    @DisplayName("rpcme: Ensure Distances extends ArrayList")
    public void ensureDistancesInheritsArrayList() {
        Distances distances = new Distances();
        assertTrue(distances instanceof java.util.ArrayList);
    }

    @Test
    @DisplayName("rpcme: Ensure only positive Longs can be added - unhappy path")
    public void ensureUnsignedLongUnhappy() {
        Distances distances = new Distances();
        IllegalArgumentException thrown = assertThrows(
            IllegalArgumentException.class,
            () -> distances.add(-5L),
            "Expected add() to throw, but it didn't"
     );
 
     assertTrue(thrown.getMessage().contains("Distance must be greater than zero"));
    }

    @Test
    @DisplayName("rpcme: Ensure only positive Longs can be added - happy path")
    public void ensureUnsignedLongHappy() {
        Distances distances = new Distances();
        distances.add(new Long(5L));
        assertEquals(distances.get(0), 5L);
    }
    @Test
    @DisplayName("rpcme: Ensure only positive Longs can be added - happy path multiple values")
    public void ensureUnsignedLongMultipleHappy() {
        Distances distances = new Distances();
        distances.add(new Long(5L));
        distances.add(new Long(15L));
        distances.add(new Long(25L));
        assertEquals(distances.get(0), 5L);
    }

    @Test
    @DisplayName("rpcme: Total method no elements to add")
    public void totalMethodZeroSizeHappyPath() {
        Distances distances = new Distances();
        assertEquals(distances.total(), 0L);
    }
    @Test
    @DisplayName("rpcme: Ensure only positive Longs can be added - happy path single value")
    public void totalUnsignedLongSingleHappy() {
        Distances distances = new Distances();
        distances.add(new Long(92746294L));
        assertEquals(distances.total(), 92746294L);
    }

    @Test
    @DisplayName("rpcme: Ensure only positive Longs can be added - happy path multiple values")
    public void totalUnsignedLongMultipleHappy() {
        Distances distances = new Distances();
        distances.add(new Long(5L));
        distances.add(new Long(15L));
        distances.add(new Long(25L));
        assertEquals(distances.total(), 45L);
    }

    @Test
    @DisplayName("rpcme: Total method with MAX long plus one")
    public void totalMethodMaxPlusOneThrowsException() {
        Distances distances = new Distances();
        distances.add(Long.MAX_VALUE);
        distances.add(new Long(1L));
        ArithmeticException thrown = assertThrows(
            ArithmeticException.class,
            () -> distances.total(),
            "Total distances exceed Long.MAX_VALUE"
        );
    }
}
