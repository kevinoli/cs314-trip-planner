import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '@testing-library/react';
import { usePlacesLimit, clearPlaces, handleAddPlace, handleRemovePlace, handleSearch, validateInput } from '../../../../src/components/Header/Find/FindPlaceHelper';
import { useUpdateTotalPages, useFetchConfigData, useFetchPlaces, useFetchTypeAndWhereData } from '../../../../src/components/Header/Find/FindPlaceHelper';
import { fetchPlaces, fetchConfigData } from '../../../../src/components/Header/Find/FindAPI';
import { FindPlaceFooter } from "../../../../src/components/Header/FindPlace";

jest.mock('../../../../src/utils/restfulAPI');

jest.mock('../../../../src/components/Header/Find/FindAPI', () => ({
    fetchPlaces: jest.fn(),
    fetchConfigData: jest.fn(),
}));

describe('Find Place Helper', () => {
    
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('dmorigea: handleSearch fetches places correctly', async () => {
        const mockPlaces = [
            { id: 1, name: 'Place 1' },
            { id: 2, name: 'Place 2' }
        ];

        fetchPlaces.mockResolvedValueOnce(mockPlaces);

        const mockSetFoundPlaces = jest.fn();
        const mockSetPlacesCount = jest.fn();

        await handleSearch(mockSetFoundPlaces, mockSetPlacesCount, [], []);

        expect(mockSetFoundPlaces).toHaveBeenCalledWith(mockPlaces);
        expect(mockSetPlacesCount).toHaveBeenCalledWith(mockPlaces.length);
    });

    test('truongak: handleSearch fetches places correctly with wheres and types', async () => {
        const mockPlaces = [
            { id: 1, name: 'Place 1' },
            { id: 2, name: 'Place 2' }
        ];
        const mockWheres = [
            { id: 1, country: 'Country 1' }
        ];
        const mockTypes = [
            { id: 1, type: 'Type 1' }
        ];

        const mockSetFoundPlaces = jest.fn();
        const mockSetPlacesCount = jest.fn();

        fetchPlaces.mockResolvedValueOnce(mockPlaces);

        await handleSearch(mockSetFoundPlaces, mockSetPlacesCount, mockWheres, mockTypes);
        expect(mockSetFoundPlaces).toHaveBeenCalledWith(mockPlaces);
        expect(mockSetPlacesCount).toHaveBeenCalledWith(mockPlaces.length);
        
    });

    test('hridayab: placeClears clears the list of places', () => {
        const setFoundPlaces = jest.fn();
        const setPlacesCount = jest.fn();
        const setSearchTerm = jest.fn();
        const setSelectedTypes = jest.fn();
        const setSelectedWheres = jest.fn();
        const setTotalPages = jest.fn();
        const setCurrentPage = jest.fn();

        clearPlaces(setFoundPlaces, setPlacesCount, setSearchTerm, setSelectedTypes, setSelectedWheres, setTotalPages, setCurrentPage);

        expect(setFoundPlaces).toHaveBeenCalledWith([]);
        expect(setPlacesCount).toHaveBeenCalledWith(0);
        expect(setSearchTerm).toHaveBeenCalledWith('');
        expect(setSelectedTypes).toHaveBeenCalledWith([]);
        expect(setSelectedWheres).toHaveBeenCalledWith([]);
        expect(setTotalPages).toHaveBeenCalledWith(0);
        expect(setCurrentPage).toHaveBeenCalledWith(1);
    });

    test("hridayab: effectively clears all states", () => {
        let foundPlaces = ["place1", "place2"];
        let placesCount = 2;
        let searchTerm = "someTerm";
        let typeOptions = ["option1", "option2"];
        let selectedWheres = ["where1", "where2"];
        let totalPages = 5;
        let currentPage = 2;

        const setFoundPlaces = (newPlaces) => { foundPlaces = newPlaces; };
        const setPlacesCount = (newCount) => { placesCount = newCount; };
        const setSearchTerm = (newTerm) => { searchTerm = newTerm; };
        const setSelectedTypes = (newOptions) => { typeOptions = newOptions; };
        const setSelectedWheres = (newWheres) => { selectedWheres = newWheres; };
        const setTotalPages = (newTotalPages) => { totalPages = newTotalPages; };
        const setCurrentPage = (newCurrentPage) => { currentPage = newCurrentPage; };

        clearPlaces(setFoundPlaces, setPlacesCount, setSearchTerm, setSelectedTypes, setSelectedWheres, setTotalPages, setCurrentPage);

        expect(foundPlaces).toEqual([]);
        expect(placesCount).toEqual(0);
        expect(searchTerm).toEqual('');
        expect(typeOptions).toEqual([]);
        expect(selectedWheres).toEqual([]);
        expect(totalPages).toEqual(0);
        expect(currentPage).toEqual(1);
    });

    test('dmorigea: handleAddPlace adds the place ID to the list of added places', () => {
        const placeToAdd = { id: 4, name: 'Place Four' };
        const mockSetAddedPlaces = jest.fn();
        const mockPlaceActions = {
            append: jest.fn()
        };

        const initialAddedPlaces = [1, 2, 3];

        mockSetAddedPlaces.mockImplementation((callback) => {
            const updatedState = callback(initialAddedPlaces);
            expect(updatedState).toEqual([1, 2, 3, 4]);
        });

        handleAddPlace(placeToAdd, mockSetAddedPlaces, mockPlaceActions);

        expect(mockPlaceActions.append).toHaveBeenCalledWith(placeToAdd);
        expect(mockSetAddedPlaces).toHaveBeenCalled();
    });

    test('dmorigea: handleRemovePlace removes a place if it exists and updates added places list to exclude its ID', () => {
        const placeIdToRemove = 2;
        const mockPlaces = [
            { id: 1, name: 'Place One' },
            { id: 2, name: 'Place Two' },
            { id: 3, name: 'Place Three' }
        ];
        const mockSetAddedPlaces = jest.fn();
        const mockPlaceActions = {
            removeAtIndex: jest.fn()
        };

        const initialAddedPlaces = [1, 2, 3];

        mockSetAddedPlaces.mockImplementation((callback) => {
            const updatedState = callback(initialAddedPlaces);
            expect(updatedState).toEqual([1, 3]);
        });

        handleRemovePlace(placeIdToRemove, mockPlaces, mockSetAddedPlaces, mockPlaceActions);

        expect(mockPlaceActions.removeAtIndex).toHaveBeenCalledWith(1);
        expect(mockSetAddedPlaces).toHaveBeenCalled();
    });

    test('dmorigea: useUpdateTotalPages updates totalPages correctly', () => {
        const initialPlaces = [1, 2, 3, 4];
        const itemsPerPage = 2;

        const { result } = renderHook(() => useUpdateTotalPages(initialPlaces, itemsPerPage));

        expect(result.current[0]).toBe(2);
    });

    test('dmorigea: should return false for strings with forbidden characters', () => {
        const testStrings = [
            "This contains a single quote '",
            'This contains a double quote "',
            'This contains a semicolon;',
            'This contains an equals sign =',
            'This contains an asterisk *',
            'This contains a forward slash /',
            'This contains a backslash \\',
            'This contains an opening bracket (',
            'This contains a closing bracket )'
        ];

        testStrings.forEach(str => {
            expect(validateInput(str)).toBe(false);
        });
    });

    test('dmorigea: useFetchConfigTypes fetches and formats types correctly', async () => {
        const mockTypes = ['Type1', 'Type2'];
        fetchConfigData.mockResolvedValueOnce(mockTypes);
        const { result, waitForNextUpdate } = renderHook(() => useFetchConfigData('type'));
        await waitForNextUpdate();
        expect(result.current[0]).toEqual([
            { value: 'Type1', label: 'Type1' },
            { value: 'Type2', label: 'Type2' }
        ]);
    });

    test('dmorigea: useFetchConfigWheres fetches and formats wheres correctly', async () => {
        const mockWheres = ['Where1', 'Where2'];
        fetchConfigData.mockResolvedValueOnce(mockWheres);

        const { result, waitForNextUpdate } = renderHook(() => useFetchConfigData('where'));
        await waitForNextUpdate();

        expect(result.current[0]).toEqual([
            { value: 'Where1', label: 'Where1' },
            { value: 'Where2', label: 'Where2' }
        ]);
    });

        test('dmorigea: should not fetch places if isValidInput is false', () => {
        const { result } = renderHook(() => useFetchPlaces('test', [], [], false, { current: false }));

        expect(fetchPlaces).not.toHaveBeenCalled();
        expect(result.current[0]).toEqual([]);
        expect(result.current[1]).toEqual(0);
    });

    test('dmorigea: should fetch places when searchTerm and other criteria change and isValidInput is true', async () => {
        fetchPlaces.mockResolvedValueOnce([{id: 1, name: 'Place1'}, {id: 2, name: 'Place2'}]);

        const { result, rerender } = renderHook(({ searchTerm, selectedTypes, selectedWheres, isValidInput, initialSearchPerformed }) => useFetchPlaces(searchTerm, selectedTypes, selectedWheres, isValidInput, initialSearchPerformed), {
            initialProps: {
                searchTerm: 'test',
                selectedTypes: [],
                selectedWheres: [],
                isValidInput: true,
                initialSearchPerformed: { current: false }
            }
        });

        await act(async () => {
            rerender({
                searchTerm: 'test2',
                selectedTypes: [],
                selectedWheres: [],
                isValidInput: true,
                initialSearchPerformed: { current: true }
            });
        });

        expect(fetchPlaces).toHaveBeenCalledTimes(1);
        expect(result.current[0]).toEqual([{id: 1, name: 'Place1'}, {id: 2, name: 'Place2'}]);
        expect(result.current[1]).toEqual(2);
    });

    test('hridayab: useFetchConfigData should run without exceptions', async () => {
        const mockOptions = ['Option1', 'Option2'];
        fetchConfigData.mockResolvedValueOnce(mockOptions);

        const { result, waitForNextUpdate } = renderHook(() => useFetchConfigData('configType'));
        await waitForNextUpdate();

        expect(result.current[0]).toEqual([
            { value: 'Option1', label: 'Option1' },
            { value: 'Option2', label: 'Option2' }
        ]);
    });

    test('dmorigea: should allow setting and updating places limit', () => {
        const { result } = renderHook(() => usePlacesLimit());

        expect(result.current[0]).toBe(250);

        act(() => {
            result.current[1](100);
        });

        expect(result.current[0]).toBe(100);
    });

    test('dmorigea: should fetch type and where data correctly', async () => {
        fetchConfigData.mockImplementation((key) => {
            if (key === 'type') return Promise.resolve(['Type1', 'Type2']);
            if (key === 'where') return Promise.resolve(['Where1', 'Where2']);
            return Promise.reject(new Error('Unknown key'));
        });

        const { result, waitForNextUpdate } = renderHook(() => useFetchTypeAndWhereData());

        await waitForNextUpdate();

        expect(result.current[0]).toEqual([
            { value: 'Type1', label: 'Type1' },
            { value: 'Type2', label: 'Type2' }
        ]);
        expect(result.current[1]).toEqual([
            { value: 'Where1', label: 'Where1' },
            { value: 'Where2', label: 'Where2' }
        ]);
    });
});
