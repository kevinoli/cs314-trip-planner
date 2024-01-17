import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import Units from '../../../src/components/Trip/Itinerary/Units';
import { unitConversions } from '../../../src/components/Trip/Itinerary/Units';

describe('Units', () => {
    test('hridayab: checks if function returns "miles"', () => {
        const props = {distanceUnits: 'miles'};
        const { getByRole } = render(<Units {...props} />);

        const dropdown = getByRole('combobox');
        expect(dropdown.value).toBe(props.distanceUnits);
    });

    test('dmorigea: checks if dropdown value is "kilometers"', () => {
        const props = {distanceUnits: 'kilometers'};
        const { getByRole } = render(<Units {...props} />);

        const dropdown = getByRole('combobox');
        expect(dropdown.value).toBe(props.distanceUnits);
    });

    test('dmorigea: checks if dropdown value is "nautical miles"', () => {
        const props = {distanceUnits: 'nauticalmiles'};
        const { getByRole } = render(<Units {...props} />);

        const dropdown = getByRole('combobox');
        expect(dropdown.value).toBe(props.distanceUnits);
    });

    test('ingjacob: checks if dropdown value is "add custom unit"', () => {
        const props = {distanceUnits: 'addcustom'};
        const { getByRole } = render(<Units {...props} />);

        const dropdown = getByRole('combobox');
        expect(dropdown.value).toBe(props.distanceUnits);
    });

    test('dmorigea: checks if all expected options are present', () => {
        const props = {distanceUnits: 'miles'};
        const { getByText } = render(<Units {...props} />);

        expect(getByText('Miles')).toBeInTheDocument();
        expect(getByText('Kilometers')).toBeInTheDocument();
        expect(getByText('Nautical Miles')).toBeInTheDocument();
        expect(getByText('Add Custom Unit')).toBeInTheDocument();
    });

    test('hridayab: it should update earthRadius to 3963.19 when miles is selected', () => {
        const setEarthRadius = jest.fn();
        const { getByRole } = render(<Units distanceUnits="kilometers" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}}/>);  // Intentionally starting with 'kilometers' to simulate a change

        fireEvent.change(getByRole("combobox"), { target: { value: 'miles' } });
        expect(setEarthRadius).toHaveBeenCalledWith(3963.19);
    });

    test('hridayab: it should update earthRadius to 6378.14 when kilometers is selected', () => {
        const setEarthRadius = jest.fn();
        const { getByRole } = render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}}/>);

        fireEvent.change(getByRole("combobox"), { target: { value: 'kilometers' } });
        expect(setEarthRadius).toHaveBeenCalledWith(6378.14);
    });

    test('dmorigea: it should update earthRadius to 3443.92 when nauticalmiles is selected', () => {
        const setEarthRadius = jest.fn();
        const { getByRole } = render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}}/>);

        fireEvent.change(getByRole("combobox"), { target: { value: 'nauticalmiles' } });
        expect(setEarthRadius).toHaveBeenCalledWith(3443.92);
    });
    
    test('hridayab: it should close custom unit dialog when "Add Custom Unit" is selected', () => {
        const setEarthRadius = jest.fn();
        const { getByRole, queryByTestId } = render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}}/>);

        fireEvent.change(getByRole("combobox"), { target: { value: 'addcustom' } });
        expect(queryByTestId('custom-units')).toBeNull();
    });

    test('hridayab: it should close custom unit dialog when "Submit" is clicked', async () => {
        const setEarthRadius = jest.fn();
        const { queryByTestId } = render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}} />);
        fireEvent.change(screen.getByRole("combobox"), { target: { value: 'addcustom' } });
        await waitFor(() => {
            fireEvent.click(screen.getByTestId('submit-button'));
        });
        expect(queryByTestId('custom-units')).toBeNull();
    });
    
    test('hridayab: it should close custom unit dialog when "Cancel" is clicked', async () => {
        const setEarthRadius = jest.fn();
        const { queryByTestId } = render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}} />);
        fireEvent.change(screen.getByRole("combobox"), { target: { value: 'addcustom' } });
        await waitFor(() => {
            fireEvent.click(screen.getByTestId('cancel-button'));
        });
        expect(queryByTestId('custom-units')).toBeNull();
    });

    test('hridayab: custom unit name dialog box should open when "Add Custom Unit" is selected', () => {
        const { getByRole, getByLabelText } = render(<Units distanceUnits="miles" setEarthRadius={() => {}} setDistanceUnits={() => {}} />);
        fireEvent.change(getByRole("combobox"), { target: { value: 'addcustom' } });
        expect(getByLabelText('Enter custom unit name:')).toBeInTheDocument();
    });

    test('hridayab: custom earth radius dialog box should open when "Add Custom Unit" is selected', () => {
        const { getByRole, getByLabelText } = render(<Units distanceUnits="miles" setEarthRadius={() => {}} setDistanceUnits={() => {}} />);
        fireEvent.change(getByRole("combobox"), { target: { value: 'addcustom' } });
        expect(getByLabelText('Enter custom earth radius:')).toBeInTheDocument();
    });

    test('hridayab: it should focus on unit name input when "Add Custom Unit" is selected', () => {
        const { getByRole } = render(<Units distanceUnits="miles" setEarthRadius={() => {}} setDistanceUnits={() => {}} />);
        fireEvent.change(getByRole("combobox"), { target: { value: 'addcustom' } });
    
        return waitFor(() => {
            const unitNameInput = screen.getByLabelText('Enter custom unit name:');
            expect(document.activeElement).toBe(unitNameInput);
        });
    });

    test('hridaya: should save custom unit name and earth radius to local storage when "Submit" button is clicked', () => {
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
    
        const setEarthRadius = jest.fn();
        render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}} />);
        
        fireEvent.change(screen.getByRole("combobox"), { target: { value: 'addcustom' } });
        fireEvent.change(screen.getByLabelText('Enter custom unit name:'), { target: { value: 'TestCustomUnit' } });
        fireEvent.change(screen.getByLabelText('Enter custom earth radius:'), { target: { value: '123.45' } });
        fireEvent.click(screen.getByTestId('submit-button'));

        expect(localStorageSpy).toHaveBeenCalledWith('customUnitName', 'TestCustomUnit');
        expect(localStorageSpy).toHaveBeenCalledWith('customEarthRadius', '123.45');
        localStorageSpy.mockRestore();
    });

    test('hridayab: should load the stored custom unit name from local storage on component', async () => {
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
        localStorageSpy.mockReturnValueOnce('TestCustomUnit');

        const setEarthRadius = jest.fn();
        render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}} />);
        fireEvent.change(screen.getByRole("combobox"), { target: { value: 'addcustom' } });

        await waitFor(() => {
            expect(screen.getByLabelText('Enter custom unit name:')).toBeInTheDocument();
        });

        expect(localStorageSpy).toHaveBeenCalledWith('customUnitName');
        expect(localStorageSpy).toHaveBeenCalledWith('customEarthRadius');
        expect(screen.getByLabelText('Enter custom unit name:').value).toBe('TestCustomUnit');
        localStorageSpy.mockRestore();
    });

    test('hridayab: should load the stored custom earth radius from local storage on component', async () => {
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
        localStorageSpy.mockReturnValueOnce('123.45');

        const setEarthRadius = jest.fn();
        render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}} />);
        fireEvent.change(screen.getByRole("combobox"), { target: { value: 'addcustom' } });

        await waitFor(() => {
            expect(screen.getByLabelText('Enter custom earth radius:')).toBeInTheDocument();
        });

        expect(localStorageSpy).toHaveBeenCalledWith('customUnitName');
        expect(localStorageSpy).toHaveBeenCalledWith('customEarthRadius');
        expect(screen.getByLabelText('Enter custom earth radius:').value).toBe('123.45');
        localStorageSpy.mockRestore();
    });

    test('hridayab: custom unit name should be displayed in the dropdown with other other units after the submit button is clicked', async () => {
        const setEarthRadius = jest.fn();
        const { getByRole, getByTestId, getByLabelText, queryByTestId } = render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}} />);

        fireEvent.change(getByRole('combobox'), { target: { value: 'addcustom' } });
        fireEvent.change(getByLabelText('Enter custom unit name:'), { target: { value: 'TestCustomUnit' } });
        fireEvent.change(getByLabelText('Enter custom earth radius:'), { target: { value: '123.45' } });
        fireEvent.click(getByTestId('submit-button'));

        await waitFor(() => {
            expect(queryByTestId('custom-units')).toBeNull();
        });

        expect(getByRole('option', { name: 'TestCustomUnit' })).toBeInTheDocument();
    });

    test('hridayab: custom unit name should be assigned the custom earth radius', async () => {
        const setEarthRadius = jest.fn();
        const { getByRole, getByTestId, getByLabelText, queryByTestId } = render(<Units distanceUnits="miles" setEarthRadius={setEarthRadius} setDistanceUnits={() => {}} />);

        fireEvent.change(getByRole('combobox'), { target: { value: 'addcustom' } });
        fireEvent.change(getByLabelText('Enter custom unit name:'), { target: { value: 'TestCustomUnit' } });
        fireEvent.change(getByLabelText('Enter custom earth radius:'), { target: { value: '123.45' } });
        fireEvent.click(getByTestId('submit-button'));

        await waitFor(() => {
            expect(queryByTestId('custom-units')).toBeNull();
        });

        const dropdown = getByRole('combobox');
        expect(dropdown.value).toBe('TestCustomUnit');
        fireEvent.change(dropdown, { target: { value: 'TestCustomUnit' } });

        expect(setEarthRadius).toHaveBeenCalledWith(123.45);
    });

    test('hridayab: should render the "Remove Custom Unit" option in the dropdown', () => {
        render(<Units distanceUnits="miles" setEarthRadius={() => {}} setDistanceUnits={() => {}} />);
        const removeCustomOption = screen.getByRole('option', { name: /remove custom unit/i });
        expect(removeCustomOption).toBeInTheDocument();
    });

    test('hridayab: should render the "Remove Custom Unit" option with "X" buttons for each custom unit', async () => {
        const setCustomUnits = jest.fn();
        const customUnits = ['TestCustomUnit1', 'TestCustomUnit2'];
        const { getByRole, queryByText } = render(<Units distanceUnits="miles" setEarthRadius={() => {}} setDistanceUnits={() => {}} />);

        fireEvent.change(getByRole('combobox'), { target: { value: 'removecustom' } });
        act(() => {
            setCustomUnits(customUnits);
        });

        customUnits.forEach((unit) => {
            const listItem = queryByText(unit);
            if (listItem) {
                const removeButton = getByTestId(`remove-custom-unit-button`);
                expect(listItem).toBeInTheDocument();
                expect(removeButton).toBeInTheDocument();
            }
        });
    });

    test('hridayab: should remove a custom unit and update the state', () => {
        const customUnits = ['TestCustomUnit1', 'TestCustomUnit2'];
        const customUnitInfo = 
        { 
            'TestCustomUnit1': {name: 'TestCustomUnit1', conversionFactor: 123.45,},
            'TestCustomUnit2': {name: 'TestCustomUnit2', conversionFactor: 1234.5678,} 
        };

        const setCustomUnits = jest.fn();
        const setCustomUnitInfo = jest.fn();
        const { getByRole, queryByText } = render(<Units distanceUnits="miles" setEarthRadius={() => {}} setDistanceUnits={() => {}} customUnits={customUnits} customUnitInfo={customUnitInfo} setCustomUnits={setCustomUnits} setCustomUnitInfo={setCustomUnitInfo}/> );

        fireEvent.change(getByRole('combobox'), { target: { value: 'removecustom' } });

        customUnits.forEach((unit) => {
            const listItem = queryByText(unit);
            if (listItem) {
                const removeButton = getByTestId(`remove-custom-unit-button`);
                act(() => {
                    fireEvent.click(removeButton);
                });
                expect(setCustomUnits).toHaveBeenCalledWith(['TestCustomUnit2']);
                expect(setCustomUnitInfo).toHaveBeenCalledWith({ 'TestCustomUnit2': {name: 'TestCustomUnit2', conversionFactor: 1234.5678,} });
            }
        });
    });
});
