import React from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react';
import { fetchTour } from '../../../../src/components/Trip/Tour/TourAPI';
import TourPlace, { handleTourOptimization, OptimizeButton } from '../../../../src/components/Trip/Tour/TourPlace';
import { Place } from "../../../../src/models/place.model";

jest.mock('../../../../src/components/Trip/Tour/TourAPI', () => ({
    fetchTour: jest.fn()
}));

describe('dmorigea: TourPlace Component', () => {
    const mockEarthRadius = 6371.0;
    const mockResponseTime = 10.0;
    const mockPlaces = [];

    beforeAll(() => {
        fetchTour.mockResolvedValue([]);
    });
    
    test('should be defined', () => {
        expect(TourPlace).toBeDefined();
    });

    test('dmorigea: should be defined', () => {
        expect(handleTourOptimization).toBeDefined();
    });

    test('dmorigea: should be defined', () => {
        expect(OptimizeButton).toBeDefined();
    });

    test('hridayab: renders with correct initial text', () => {
        const mockHandleOptimizeClick = jest.fn();
        const { getByTestId } = render(<OptimizeButton isClicked={false} handleOptimizeClick={mockHandleOptimizeClick} />);
        const optimizeButton = getByTestId('optimize-trip-button');
        expect(optimizeButton.textContent).toBe('Optimize Trip');
    });

    test('hridayab: changes text on click', () => {
        const mockHandleOptimizeClick = jest.fn();
        const { getByTestId, rerender } = render(<OptimizeButton isClicked={false} handleOptimizeClick={mockHandleOptimizeClick} />);
        const optimizeButton = getByTestId('optimize-trip-button');

        fireEvent.click(optimizeButton);
        rerender(<OptimizeButton isClicked={true} handleOptimizeClick={mockHandleOptimizeClick} />);

        expect(optimizeButton.textContent).toBe('Optimized');
    });

    test('dmorigea: executes successfully without throwing an error', async () => {
        await expect(async () => {
            await handleTourOptimization(mockEarthRadius, mockResponseTime, mockPlaces);
        }).not.toThrow();
    });

    test('dmorigea: TourPlace updates places after successful optimization', async () => {
        const mockOptimizedPlaces = [{ id: 1, name: 'Place A' }, { id: 2, name: 'Place B' }];
        fetchTour.mockResolvedValue(mockOptimizedPlaces);

        const mockPlaceActions = {
            setPlaces: jest.fn()
        };

        const { getByTestId } = render(
            <TourPlace
                placeActions={mockPlaceActions}
                places={mockPlaces}
                responseTime={mockResponseTime}
                earthRadius={mockEarthRadius}
            />
        );

        const optimizeButton = getByTestId('optimize-trip-button');
        fireEvent.click(optimizeButton);

        await waitFor(() => {
            expect(mockPlaceActions.setPlaces).toHaveBeenCalledWith(
                mockOptimizedPlaces.map(p => new Place(p))
            );
        });
    });
});
