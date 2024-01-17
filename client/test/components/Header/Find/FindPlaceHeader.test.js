import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FindPlaceHeader from '../../../../src/components/Header/Find/FindPlaceHeader';

describe('Find Place Header', () => {

    test('dmorigea: renders without crashing', () => {
        const toggleFindPlaceMock = jest.fn();
        render(<FindPlaceHeader toggleFindPlace={toggleFindPlaceMock} />);
    });

    test('dmorigea: contains the text "Find a Place"', () => {
        const toggleFindPlaceMock = jest.fn();
        const { getByText } = render(<FindPlaceHeader toggleFindPlace={toggleFindPlaceMock} />);
        expect(getByText('Find a Place')).toBeInTheDocument();
    });

    test('dmorigea: calls toggleFindPlace prop when header toggle is clicked', () => {
        const toggleFindPlaceMock = jest.fn();
        const { getByRole } = render(<FindPlaceHeader toggleFindPlace={toggleFindPlaceMock} />);

        // assuming the toggle uses a button role for accessibility; adjust if not the case
        const toggleButton = getByRole('button');
        fireEvent.click(toggleButton);

        expect(toggleFindPlaceMock).toHaveBeenCalled();
    });
});
