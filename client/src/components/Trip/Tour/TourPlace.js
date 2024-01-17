import React, { useState } from "react";
import { Place } from "../../../models/place.model";
import { Button } from "reactstrap";
import { fetchTour } from './TourAPI';

export default function TourPlace(props) {
    const { placeActions, places, responseTime, earthRadius } = props;
    const [isClicked, setIsClicked] = useState(false);

    const handleOptimizeClick = async () => {
        setIsClicked(true);
        try {
            const optimizedPlaces = await handleTourOptimization(earthRadius, responseTime, places);
            const newPlaces = optimizedPlaces.map(p => new Place(p));
            placeActions.setPlaces(newPlaces);
        } catch (error) {
            console.error("Optimization failed:", error);
            throw error;
        } finally {
            setIsClicked(false);
        }
    };

    return (
        <OptimizeButton
            isClicked={isClicked}
            handleOptimizeClick={handleOptimizeClick}
        />
    );
}

export const handleTourOptimization = async (earthRadius, responseTime, places) => {
    try {
        return await fetchTour(earthRadius, responseTime, places);
    } catch (error) {
        console.error("Error optimizing tour:", error);
        throw error;
    }
}

export function OptimizeButton(props) {
    const { isClicked, handleOptimizeClick } = props;

    const buttonStyle = {
        fontSize: '14px',
        backgroundColor: isClicked ? 'grey' : 'darkgreen',
        color: 'primary',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    };

    return (
        <td>
            <Button
                style={buttonStyle}
                onClick={handleOptimizeClick}
                data-testid='optimize-trip-button'
                disabled={isClicked}
            >
                {isClicked ? 'Optimized' : 'Optimize Trip'}
            </Button>
        </td>
    );
}
