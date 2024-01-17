import React from 'react';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import SaveFile from '../../../src/components/Header/SaveFile';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('SaveFile' , () =>{
    const props = {
        showSaveFile: true,
        toggleSaveFile: jest.fn(),
        tripName: 'TestTrip',
        places: [
          { streetAddress: 'Address1', latitude: 123, longitude: 456 },
          { streetAddress: 'Address2', latitude: 2, longitude: 4 },
          { streetAddress: 'Address3', latitude: 998, longitude: 543 }
        ],
        setTripName: jest.fn()
    }

    beforeEach(() => {
        render(<SaveFile {...props} />);
	});

    test('renders without errors', () => {
        screen.getByTestId('save-file-modal');
    });

    test('truongak: renders when toggles', ()=>{
        screen.getByText("Save Trip");
    });

    test('truongak: closes when button is pressed', async ()=>{
        const closeButton = screen.getByTestId('close-save-button');
        userEvent.click(closeButton);
        expect(props.toggleSaveFile).toBeCalled;
    });

    test('truongak: renders Save as JSON by default', () => {
        const dropdownToggle = screen.getByTestId('save-file-dropdown-toggle');
        expect(dropdownToggle).toBeInTheDocument();
        fireEvent.click(dropdownToggle);
        
        const jsonOption = screen.getByText('JSON');
        const kmlOption = screen.getByText('KML');
        
        expect(jsonOption).toBeInTheDocument();
        expect(kmlOption).toBeInTheDocument();
    });
    
    test('truongak: changes the selected format when an option is clicked', () => {        
        const dropdownToggle = screen.getByTestId('save-file-dropdown-toggle');
        fireEvent.click(dropdownToggle);
    
        const kmlOption = screen.getByText('KML');
        fireEvent.click(kmlOption);
    
        const selectedFormatText = screen.getByTestId('selected-format-text');
        expect(selectedFormatText).toHaveTextContent('KML');
    });

    test('truongak: save trip as json', async () => {
        global.URL.createObjectURL = jest.fn();
        
        const dropdownToggle = screen.getByTestId('save-file-dropdown-toggle');
        fireEvent.click(dropdownToggle);
    
        const jsonOption = screen.getByText('JSON');
        fireEvent.click(jsonOption);
        
        const saveTripButton = screen.getByText("Save File")
        fireEvent.click(saveTripButton);

		expect(global.URL.createObjectURL).toBeCalledTimes(1);
	});

    test('truongak: save trip as kml', async () => {
        global.URL.createObjectURL = jest.fn();
        
        const dropdownToggle = screen.getByTestId('save-file-dropdown-toggle');
        fireEvent.click(dropdownToggle);
    
        const kmlOption = screen.getByText('KML');
        fireEvent.click(kmlOption);

        const saveTripButton = screen.getByText("Save File")
        fireEvent.click(saveTripButton);

        expect(global.URL.createObjectURL).toBeCalledTimes(1);
	});

    test("truongak: test custom file name change", async () => {
        const fileNameInput = screen.getByTestId("file-name-input");
        expect(fileNameInput).toHaveValue("TestTrip");
        userEvent.type(fileNameInput, "NewTrip" );
        fireEvent.change(fileNameInput, { target: { value: "NewTrip" } });
    });
});