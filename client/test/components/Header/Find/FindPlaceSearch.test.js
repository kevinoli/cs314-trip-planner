import React from 'react';
import { render, fireEvent, screen, getByLabelText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FindPlaceSearch, { PlaceInfo, PlaceResults } from '../../../../src/components/Header/Find/FindPlaceSearch';
import { SearchInput } from "../../../../src/components/Header/Find/FindPlaceSearch";

describe('Find Place Search', () => {
    const oneMock = {
        defaultDisplayName: "Test Place One",
        name: "Test One",
        id: 123,
        municipality: "Test City",
        region: "Test Region",
        country: "Test Country"
    };

    const mockOnAdd = jest.fn();
    const mockOnRemove = jest.fn();
    const mockPlace = {
        id: '1',
        defaultDisplayName: 'Display Place 1',
        name: 'Place 1',
        municipality: 'SomeCity',
        region: 'SomeRegion',
        country: 'SomeCountry',
        lat: '50.0000',
        lon: '60.0000'
    };

    const mockPlaces = [
        {
            id: '1',
            name: 'Place 1',
            defaultDisplayName: 'Display Place 1',
            municipality: 'City1',
            region: 'Region1',
            country: 'Country1',
            lat: 1.1,
            lng: 1.2
        },
        {
            id: '2',
            name: 'Place 2',
            defaultDisplayName: 'Display Place 2',
            municipality: 'City2',
            region: 'Region2',
            country: 'Country2',
            lat: 2.1,
            lng: 2.2
        },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockProps = {
        searchTerm: '',
        setSearchTerm: jest.fn(),
        foundPlaces: [],
        handleAddPlace: jest.fn(),
        handleRemovePlace: jest.fn(),
        addedPlaces: [],
        validateInput: jest.fn(),
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('dmorigea: PlaceInfo renders the place details correctly', () => {
        const { getByText } = render(<PlaceInfo place={oneMock} isAdded={false} onAdd={() => {}} onRemove={() => {}} />);
        expect(getByText('Test Place One (123)')).toBeInTheDocument();
        expect(getByText(/Test City, Test Region, Test Country/)).toBeInTheDocument();
    });

    test('dmorigea: PlaceInfo renders "Add" button when isAdded prop is false', () => {
        const { getByLabelText } = render(<PlaceInfo place={oneMock} isAdded={false} onAdd={() => {}} onRemove={() => {}} />);
        expect(getByLabelText('Add')).toBeInTheDocument();
    });

    test('dmorigea: PlaceInfo renders "Remove" button when isAdded prop is true', () => {
        const { getByLabelText } = render(<PlaceInfo place={oneMock} isAdded={true} onAdd={() => {}} onRemove={() => {}} />);
        expect(getByLabelText('Remove')).toBeInTheDocument();
    });

    test('dmorigea: renders an input field with the correct placeholder', () => {
        render(<FindPlaceSearch {...mockProps} />);
        const inputElement = screen.getByPlaceholderText("Search for a place...");
        expect(inputElement).toBeInTheDocument();
    });

    test('dmorigea; renders without crashing', () => {
        render(<FindPlaceSearch {...mockProps} />);
        expect(screen.getByPlaceholderText('Search for a place...')).toBeInTheDocument();
    });

    test('dmorigea: validates input on change', () => {
        render(<FindPlaceSearch {...mockProps} />);
        const input = screen.getByPlaceholderText('Search for a place...');
        fireEvent.change(input, { target: { value: 'Some place' } });
        expect(mockProps.validateInput).toHaveBeenCalledWith('Some place');
        expect(mockProps.setSearchTerm).toHaveBeenCalledWith('Some place');
    });

    test('dmorigea: collapses when no places are available', () => {
        render(<PlaceResults places={[]} currentPage={1} />);
        expect(screen.queryByText('Place 1')).not.toBeInTheDocument();
    });

    test('dmorigea: renders the "Add" button when isAdded is false', () => {
        const { getByLabelText } = render(
            <PlaceInfo
                place={mockPlace}
                onAdd={mockOnAdd}
                onRemove={mockOnRemove}
                isAdded={false}
            />
        );
        const addButton = getByLabelText('Add');
        expect(addButton).toBeInTheDocument();
        fireEvent.click(addButton);
        expect(mockOnAdd).toHaveBeenCalledWith(mockPlace);
    });

    test('dmorigea: renders the "Remove" button when isAdded is true', () => {
        const { getByLabelText } = render(
            <PlaceInfo
                place={mockPlace}
                onAdd={mockOnAdd}
                onRemove={mockOnRemove}
                isAdded={true}
            />
        );
        const removeButton = getByLabelText('Remove');
        expect(removeButton).toBeInTheDocument();
        fireEvent.click(removeButton);
        expect(mockOnRemove).toHaveBeenCalledWith(mockPlace.id);
    });

    test('dmorigea: renders the "Add" button for not added places and "Remove" for added ones', () => {
        const { getByLabelText } = render(
            <PlaceResults
                places={mockPlaces}
                onAdd={mockOnAdd}
                onRemove={mockOnRemove}
                addedPlaces={['2']}
                currentPage={1}
            />
        );

        expect(getByLabelText('Add')).toBeInTheDocument();
        expect(getByLabelText('Remove')).toBeInTheDocument();
    });

    test('dmorigea: renders the correct PlaceInfo based on provided places', () => {
        const { getByText } = render(
            <PlaceResults
                places={mockPlaces}
                onAdd={mockOnAdd}
                onRemove={mockOnRemove}
                addedPlaces={['2']}
                currentPage={1}
            />
        );

        expect(getByText('Display Place 1 (1)')).toBeInTheDocument();
        expect(getByText('City1, Region1, Country1')).toBeInTheDocument();

        expect(getByText('Display Place 2 (2)')).toBeInTheDocument();
        expect(getByText('City2, Region2, Country2')).toBeInTheDocument();
    });

    test('dmorigea: renders the place information correctly', () => {
        const { getByText } = render(
            <PlaceInfo
                place={mockPlace}
                onAdd={mockOnAdd}
                onRemove={mockOnRemove}
                isAdded={false}
            />
        );

        expect(getByText('Display Place 1 (1)')).toBeInTheDocument();
        expect(getByText('SomeCity, SomeRegion, SomeCountry')).toBeInTheDocument();
    });

    test('dmorigea: SearchInput renders correctly with initial props', () => {
        render(<SearchInput {...mockProps} />);
        const inputElement = screen.getByPlaceholderText('Search for a place...');
        expect(inputElement.value).toBe('');
    });
});
