package com.tco.requests;
import java.util.ArrayList;
import java.util.Iterator;
import java.lang.IllegalArgumentException;
import java.lang.ArithmeticException;

public class Distances extends ArrayList<Long> {

    public Long total() {
        Long result = 0L;
        Iterator <Long> totalIterator = this.iterator();
        while (totalIterator.hasNext()) result += totalIterator.next();
        if (result < 0) throw new ArithmeticException("Total distances exceed Long.MAX_VALUE");
        return result;
    }

    @Override
    public boolean add(Long i) {
        if (i < 0L) {
            throw new IllegalArgumentException("Distance must be greater than zero");
        }
        
        return super.add(i);
    }
}
