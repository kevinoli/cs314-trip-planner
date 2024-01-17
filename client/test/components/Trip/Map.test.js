import React from 'react';
import {queryByTestId, render} from '@testing-library/react';
import Map, { TripLines, computePaths, PlaceMarker } from '../../../src/components/Trip/Map/Map';
import { placeToLatLng } from '../../../src/utils/transformers';

const mockPlace = {
    name: "Sample Place",
    lat: 40.7128,
    lng: -74.0060,
    formatPlace: () => 'Formatted Place Name'
};

describe('Map', () => {

    test('dmorigea: renders TileLayer with correct properties', () => {
        const { queryByTestId } = render(<Map placeActions={{}} places={[]} />);
        const tileLayer = queryByTestId('TileLayer');

        expect(tileLayer).toBeDefined();
    });

    test('dmorigea: renders LeafletMap with correct properties', () => {
        const { queryByTestId } = render(<Map placeActions={{}} places={[]} />);
        const leafletMap = queryByTestId('LeafletMap');

        expect(leafletMap).toBeDefined();
    });

    test('dmorigea: renders TripLines with correct properties', () => {
        const { queryByTestId } = render(<Map placeActions={{}} places={[]} />);
        const tripLines = queryByTestId('TripLines');

        expect(tripLines).toBeDefined();
    });

    test('dmorigea: renders PlaceMarker with correct properties', () => {
        const { queryByTestId } = render(<Map placeActions={{}} places={[]} />);
        const placeMarker = queryByTestId('PlaceMarker');

        expect(placeMarker).toBeDefined();
    });

    test('dmorigea: renders Polyline with correct properties', () => {
        const { queryByTestId } = render(<TripLines places={[]} />);
        const polyLine = queryByTestId('Polyline');

        expect(polyLine).toBeDefined();
    });

    test('dmorigea: should not render any Polyline when places is empty', () => {
        const { container } = render(<TripLines places={[]} />);
        const polylines = container.querySelectorAll('path.leaflet-interactive');
        expect(polylines.length).toBe(0);
    });

    test('dmorigea: should not render any Polyline for one place', () => {
        const places = [{ name: "Sample Place", lat: 40.7128, lng: -74.0060 }];
        const { container } = render(<TripLines places={places} />);
        const polylines = container.querySelectorAll('path.leaflet-interactive');
        expect(polylines.length).toBe(0);
    });

    test('dmorigea: renders Marker with correct properties', () => {
        const places = [mockPlace];
        const { queryByTestId } = render(<PlaceMarker places={places} selectedIndex={1} />);
        const marker = queryByTestId('Marker');

        expect(marker).toBeDefined();
    });

    test('dmorigea: does not render Marker for an invalid selectedIndex', () => {
        const places = [mockPlace, mockPlace];
        const { queryByTestId } = render(<PlaceMarker places={places} selectedIndex={-1} />);
        expect(queryByTestId('Marker')).toBeNull();
    });

    test('dmorigea: wraps around the places list when computing paths', () => {
        const places = [
            mockPlace,
            { ...mockPlace, lat: 41, name: 'Second Place' },
            { ...mockPlace, lat: 42, name: 'Third Place' }
        ];
        const paths = computePaths(places);
        const expectedLastPath = [placeToLatLng(places[2]), placeToLatLng(places[0])];
        expect(paths[paths.length - 1]).toEqual(expectedLastPath);
    });

    test('dmorigea: computes paths correctly', () => {
        const places = [mockPlace, mockPlace];
        const paths = computePaths(places);
        const expectedPaths = [
            [placeToLatLng(mockPlace), placeToLatLng(mockPlace)],
            [placeToLatLng(mockPlace), placeToLatLng(mockPlace)]
        ];
        expect(paths).toEqual(expectedPaths);
    });

    test('dmorigea: returns empty array for less than two places', () => {
        const places = [mockPlace];
        const paths = computePaths(places);
        expect(paths).toEqual([]);
    });
});
