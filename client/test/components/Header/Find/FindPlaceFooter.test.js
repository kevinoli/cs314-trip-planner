import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import FindPlaceFooter, { FindPlaceModalContent } from '../../../../src/components/Header/Find/FindPlaceFooter';
import { clearPlaces, handleSearch } from '../../../../src/components/Header/Find/FindPlaceHelper';

jest.mock('../../../../src/components/Header/Find/FindPlaceHelper', () => ({
    clearPlaces: jest.fn(),
    handleSearch: jest.fn()
}));

describe('Find Place Footer', () => {
    let setCurrentPage;

    beforeEach(() => {
        setCurrentPage = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const defaultProps = {
        setFoundPlaces: jest.fn(),
        setPlacesCount: jest.fn(),
        setSearchTerm: jest.fn(),
        setSelectedTypes: jest.fn(),
        setSelectedWheres: jest.fn(),
        setTotalPages: jest.fn(),
        totalPages: jest.fn(),
        setCurrentPage: jest.fn(),
        clearPlaces,
        handleSearch,
        handlePageChange: jest.fn(),
        currentPage: 1,
        options: [{ value: 1, label: '1' }, { value: 2, label: '2' }],
        foundPlaces: [],
        placesCount: 0,
    };

    test('dmorigea: renders without crashing', () => {
        render(<FindPlaceFooter {...defaultProps} />);
    });

    test('dmorigea: calls handleSearch function when "Random" button is clicked', () => {
        const { getByText } = render(<FindPlaceFooter {...defaultProps} />);
        const randomButton = getByText('Random');
        fireEvent.click(randomButton);
        expect(handleSearch).toHaveBeenCalled();
    });

    test('dmorigea: calls clearPlaces function when trash button is clicked', () => {
        const { getByTestId } = render(<FindPlaceFooter {...defaultProps} />);
        const trashButton = getByTestId('clear-place-button');
        fireEvent.click(trashButton);
        expect(clearPlaces).toHaveBeenCalled();
    });

    test('dmorigea: calls setCurrentPage with the correct value', () => {
        const selectedOption = { value: 3, label: '3' };
        const handlePageChange = selectedOption => {
            setCurrentPage(selectedOption.value);
        };

        handlePageChange(selectedOption);

        expect(setCurrentPage).toHaveBeenCalledWith(3);
    });

    test('dmorigea: calls clearPlaces function when "Clear" button is clicked', () => {
        const { getByTestId } = render(<FindPlaceModalContent {...defaultProps} />);
        const clearButton = getByTestId('clear-place-button');
        fireEvent.click(clearButton);
        expect(clearPlaces).toHaveBeenCalled();
    });

    test('dmorigea: calls handleSearch function when "Random" button is clicked', () => {
        const { getByText } = render(<FindPlaceModalContent {...defaultProps} />);
        const randomButton = getByText('Random');
        fireEvent.click(randomButton);
        expect(handleSearch).toHaveBeenCalled();
    });

    test('dmorigea: calls handlePageChange function when an option is selected in dropdown', () => {
        const { getByText } = render(<FindPlaceModalContent {...defaultProps} />);
        const dropdown = getByText(defaultProps.currentPage);
        userEvent.click(dropdown);
        userEvent.click(getByText('2'));
        expect(defaultProps.handlePageChange).toHaveBeenCalledWith(
            expect.objectContaining({ value: 2, label: "2" }),
            expect.objectContaining({ action: "select-option" })
        );
    });
});
