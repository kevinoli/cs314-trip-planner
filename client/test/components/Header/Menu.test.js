import React from 'react';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import Menu from '../../../src/components/Header/Menu';

describe('Menu', () => {
	const menuProps = {
		toggleAbout: jest.fn(),
		placeActions: {
			append: jest.fn(),
			removeAll: jest.fn(),
		},
		toggleAddPlace: jest.fn(),
		disableRemoveAll: false,
		toggleSettings: jest.fn(),
		toggleFindPlace: jest.fn(),
		toggleSaveFile: jest.fn(),
	};

	beforeEach(() => {
		render(<Menu {...menuProps} />);
	});

	test('base: Opens the menu', () => {
		const menuToggle = screen.getByTestId('menu-toggle');
		user.click(menuToggle);
		expect(screen.getByTestId('menu-button-container')).toBeTruthy();
	});

	test('base: Toggles About', async () => {
		const menuToggle = screen.getByTestId('menu-toggle');
		await waitFor(() => user.click(menuToggle));
		const aboutButton = screen.getByTestId('about-button');
		user.click(aboutButton);
		expect(menuProps.toggleAbout).toHaveBeenCalled();
	});

	test('base: Removes all places', async () => {
		const menuToggle = screen.getByTestId('menu-toggle');
		await waitFor(() => user.click(menuToggle));
		const removeAllButton = screen.getByTestId('remove-all-button');
		user.click(removeAllButton);
		expect(menuProps.placeActions.removeAll).toHaveBeenCalled();
	});

	test('base: Toggles Server Settings', async () => {
		const menuToggle = screen.getByTestId('menu-toggle');
		await waitFor(() => user.click(menuToggle));
		const settingsButton = screen.getByTestId('settings-button');
		user.click(settingsButton);
		expect(menuProps.toggleSettings).toHaveBeenCalled();
	});

	test('hridayab: Finds place', async () => {
        const menuToggle = screen.getByTestId('menu-toggle');
        await waitFor(() => user.click(menuToggle));
        const findPlaceButton = screen.getByTestId('find-place-button');
        user.click(findPlaceButton);
        expect(menuProps.toggleFindPlace).toHaveBeenCalled();
    });
	
	test('truongak: Save trip toggled', async () => {
		const menuToggle = screen.getByTestId('menu-toggle');
		await waitFor(() => user.click(menuToggle));
		const saveTripButton = screen.getByTestId('save-trip-button');
		user.click(saveTripButton);
		expect(menuProps.toggleSaveFile).toHaveBeenCalled();
	});
});
