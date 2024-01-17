import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Marker from '../../../src/components/Trip/Map/Marker';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

const mockPlace = {
    lat: 0,
    lng: 0,
    formatPlace: () => "Test Place"
};

const renderWithMap = (component) => {
    return render(
        <LeafletMap center={[0, 0]} zoom={10}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {component}
        </LeafletMap>
    );
};

describe('Marker', () => {

    test('dmorigea: should not render when no place is provided', () => {
        const { container } = render(<Marker place={null} />);
        expect(container.firstChild).toBeNull();
    });

    test('should render LeafletMarker with the correct position when a place is provided', () => {
        const { getByText } = renderWithMap(<Marker place={mockPlace} />);

        expect(getByText('Test Place')).toBeInTheDocument();
        expect(getByText('0.000000°, 0.000000°')).toBeInTheDocument();
    });
});
