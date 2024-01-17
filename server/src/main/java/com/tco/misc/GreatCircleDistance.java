package com.tco.misc;

import static java.lang.Math.atan2;
import static java.lang.Math.sin;
import static java.lang.Math.cos;
import static java.lang.Math.round;
import static java.lang.Math.abs;
import static java.lang.Math.sqrt;
// Import useful math imports if needed

public final class GreatCircleDistance {

    private GreatCircleDistance() {

    }

    public static Long between(GeographicCoordinate from, GeographicCoordinate to, double earthRadius) {
        double centralAngle, numerator, denominator, absDifference; 
        long distance;

        double fromLat = from.latRadians();
        double fromLon = from.lonRadians();
        double toLat = to.latRadians();
        double toLon = to.lonRadians();

        absDifference = Math.abs(fromLon - toLon);

        numerator = Math.sqrt(Math.pow(Math.cos(toLat) * Math.sin(absDifference), 2) + Math.pow(Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(absDifference), 2));
        denominator = Math.sin(fromLat) * Math.sin(toLat) + Math.cos(fromLat) * Math.cos(toLat) * Math.cos(absDifference);

        centralAngle = Math.atan2(numerator, denominator);
        distance = Math.round(earthRadius * centralAngle);

        return distance;
    }
}

