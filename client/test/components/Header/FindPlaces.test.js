import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { validateInput } from '../../../src/components/Header/Find/FindPlaceHelper';
import { fetchConfigData } from '../../../src/components/Header/Find/FindAPI';
import FindPlace from '../../../src/components/Header/FindPlace';
import FindPlaceSearch from '../../../src/components/Header/Find/FindPlaceSearch';
import FindPlaceFooter from '../../../src/components/Header/Find/FindPlaceFooter';

const mockedFetchedPlacesArray = [
    {
        id: 1,
        name: "Place 1",
        description: "Description of Place 1",
        type: "Type1",
        location: "Where1"
    },
    {
        id: 2,
        name: "Place 2",
        description: "Description of Place 2",
        type: "Type2",
        location: "Where2"
    },
];

const mockedFetchedPlacesCount = mockedFetchedPlacesArray.length;

jest.mock('../../../src/utils/restfulAPI', () => ({
    sendAPIRequest: jest.fn().mockResolvedValue({ type: ['Type1', 'Type2', 'Type3'] }),
    getOriginalServerUrl: jest.fn().mockReturnValue('https://mocked-url.com')
}));

describe('Find Places', () => {
    let mockHandleAddPlace;
    let mockHandleRemovePlace;
    let mockPlaceActions;
    let mockPlaces;
    let mockToggleFindPlace;
    const mockClearPlaces = jest.fn();
    const mockHandleSearch = jest.fn();
    const mockSetCurrentPage = jest.fn();

    const props = {
        showFindPlace: true,
        toggleFindPlace: jest.fn(),
        placeActions: jest.fn(),
        places: []
    };

    const mockProps = {
        showFindPlace: true,
        toggleFindPlace: jest.fn(),
    };

    const searchProps = {
        searchTerm: '',
        setSearchTerm: jest.fn(),
        foundPlaces: [],
        handleAddPlace: jest.fn(),
        handleRemovePlace: jest.fn(),
        addedPlaces: [],
        validateInput: jest.fn().mockReturnValue(true),
        isValidInput: true,
        setIsValidInput: jest.fn(),
        typeOptions: [],
        selectedTypes: [],
        setSelectedTypes: jest.fn(),
        whereOptions: [],
        selectedWheres: [],
        setSelectedWheres: jest.fn(),
        currentPage: 1
    };

    const defaultProps = {
        setSearchTerm: () => {},
        placesCount: 10,
        foundPlaces: [...Array(20).keys()],
        setSelectedTypes: () => {},
        setSelectedWheres: () => {},
        currentPage: 1,
        setCurrentPage: mockSetCurrentPage,
        totalPages: 2,
        clearPlaces: mockClearPlaces,
        handleSearch: mockHandleSearch
    };

    jest.mock('../../../src/components/Header/Find/FindPlaceHelper', () => ({
        fetchConfigTypes: jest.fn(),
        useFetchPlaces: jest.fn().mockReturnValue([mockedFetchedPlacesArray, mockedFetchedPlacesCount]),
        useUpdateTotalPages: jest.fn().mockReturnValue([3, jest.fn()])
    }));

    beforeEach(() => {
        jest.clearAllMocks();
        mockToggleFindPlace = jest.fn();
        mockHandleAddPlace = jest.fn();
        mockHandleRemovePlace = jest.fn();
        mockPlaceActions = {};
        mockPlaces = [];
    });

    test('truongak: should return false for invalid input', () => {
        const inputValue = '\'\"\;\=\(\)\\\,';
        expect(validateInput(inputValue)).toBe(false);
    });

    test('truongak: should return true for valid input', () => {
        const inputValue = 'test';
        expect(validateInput(inputValue)).toBe(true);
    });

    test('dmorigea: fetches config types successfully', async () => {
        const types = await fetchConfigData('type');

        expect(types).toEqual(['Type1', 'Type2', 'Type3']);
    });

    test('dmorigea: renders the FindPlace component without crashing', () => {
        const { getByText } = render(<FindPlace {...mockProps} />);
        expect(getByText("Find a Place")).toBeInTheDocument();
    });

    test('rpcme: updates search term on user input', () => {
        const { getByPlaceholderText } = render(<FindPlace {...mockProps} />);
        const input = getByPlaceholderText('Search for a place...');

        fireEvent.change(input, { target: { value: 'test input' } });
        expect(input.value).toBe('test input');
    });

    test('rpcme: renders modal when showFindPlace is true', () => {
        const { getByRole } = render(<FindPlace showFindPlace={true} toggleFindPlace={mockToggleFindPlace} />);
        const modal = getByRole('dialog');
        expect(modal).toBeInTheDocument();
    });

    test("hridayab: clears places when 'clear place' button is clicked", () => {
        render(<FindPlace {...props} />);
        fireEvent.click(screen.getByTestId('clear-place-button'));
        expect(screen.getByText("Showing 0-0 out of 0 results")).toBeInTheDocument();
    });

    test('hridayab: updates the search term and validates it', () => {
        let mockSetSearchTerm = jest.fn();
        let mockSetIsValidInput = jest.fn();

        const props = {
            searchTerm: '',
            setSearchTerm: mockSetSearchTerm,
            foundPlaces: [],
            handleAddPlace: jest.fn(),
            handleRemovePlace: jest.fn(),
            addedPlaces: [],
            validateInput: jest.fn().mockReturnValue(true),
            isValidInput: true,
            setIsValidInput: mockSetIsValidInput,
            typeOptions: [],
            selectedTypes: [],
            setSelectedTypes: jest.fn(),
            whereOptions: [],
            selectedWheres: [],
            setSelectedWheres: jest.fn(),
            currentPage: 1
        };

        render(<FindPlaceSearch {...props} />);

        const inputElement = screen.getByPlaceholderText('Search for a place...');

        fireEvent.change(inputElement, { target: { value: 'some location' } });

        expect(mockSetSearchTerm).toHaveBeenCalledWith('some location');
        expect(mockSetIsValidInput).toHaveBeenCalledWith(true);
    });

    test('hridayab: should render clear and random buttons', () => {
        render(<FindPlaceFooter {...defaultProps} />);

        const clearButton = screen.getByTestId('clear-place-button');
        const randomButton = screen.getByText('Random');

        expect(clearButton).toBeInTheDocument();
        expect(randomButton).toBeInTheDocument();

        fireEvent.click(clearButton);
        expect(mockClearPlaces).toHaveBeenCalledTimes(1);

        fireEvent.click(randomButton);
        expect(mockHandleSearch).toHaveBeenCalledTimes(1);
    });

    test('ingjacob: should render Select dropdown with correct options', () => {
        render(<FindPlaceFooter {...defaultProps} />);

        const dropdown = screen.getByText('1');
        expect(dropdown).toBeInTheDocument();
    });

    test('ingjacob: should render and allow input interaction', () => {
        render(<FindPlaceSearch {...searchProps} />);

        const input = screen.getByPlaceholderText('Search for a place...');
        fireEvent.change(input, { target: { value: 'New York' } });
        expect(searchProps.setSearchTerm).toHaveBeenCalledWith('New York');
        expect(searchProps.setIsValidInput).toHaveBeenCalledWith(true);
    });
});
