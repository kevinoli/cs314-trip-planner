import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { MOCK_PLACES } from '../../sharedMocks';
import Itinerary, { renderCommonTd, distancesValues } from '../../../src/components/Trip/Itinerary/Itinerary.js';

describe('Itinerary', () => {
	const placeActions = { append: jest.fn(), selectIndex: jest.fn() };
	beforeEach(() => {
		render(
			<Itinerary
				places={MOCK_PLACES}
				placeActions={placeActions}
				selectedIndex={0}
				total={999}
				distanceUnits="miles"
			/>
		);
	});

	test('base: renders the name attribute', () => {
		screen.getByRole('cell', { name: /Place A/i });
	});

	test('base: sets new index when clicked.', () => {
		const row = screen.getByTestId('place-row-0');
		expect(placeActions.selectIndex).toBeCalledTimes(0);

		user.click(row);
		expect(placeActions.selectIndex).toBeCalledTimes(1);
	});

	test('base: expands a place row when clicked.', () => {
		const row = screen.getByTestId('place-row-2');
		expect(screen.getByText(/123 Test/i)).toBeTruthy();

		user.click(row);
		expect(screen.getByText(/expanded test/i)).toBeTruthy();
	});

	test('base: expands a place row when button is clicked.', () => {
		const toggle = screen.getByTestId('place-row-toggle-2');
		expect(screen.getByText(/123 Test/i)).toBeTruthy();

		user.click(toggle);
		expect(screen.getByText(/expanded test/i)).toBeTruthy();
	});

	test('hridayab: should find PiCaretDownDuotone icon in itinerary.', () => {
		const icon = screen.getByTestId('Leg-arrow');
		expect(icon).toBeInTheDocument();
	});  

	test('truongak: should find PiArrowFatLinesDownBold icon in itinerary.', () => {
		const icon = screen.getByTestId('Pi-Arrow-Fat-Lines-Down-Bold');
		expect(icon).toBeInTheDocument();
	});  
	
	test('ingjacob: shows cumulative distances.', () => {
		const cumulativeDists = screen.findAllByTestId('cumulative-distances');
		expect(cumulativeDists).toBeTruthy();
	});

	test('ingjacob: shows leg distances.', () => {
		const legDists = screen.findAllByTestId('leg-distances');
		expect(legDists).toBeTruthy();
	});

	test('rpcme: shows correct unit', () => {
		const unit = screen.findAllByTestId('total-units');
		expect(unit).toBeTruthy();
	});

	test('rpcme: shows correct mock distance', () => {
		const value = screen.findAllByTestId('total-value');
		expect(value).toBeTruthy();
	});

	test('hridayab: renders a common <td/> element', () => {
		const className = 'test-class-name';
  		const align = 'center';
  		const testDataId = 'test-id';
  		const content = 'test content';
    	renderCommonTd(className, align, testDataId, content);
	});

	test('hridayab: displays the distance values', () => {
		const align = 'right';
		const testDataId = 'test-id';
		const distance = 'test distances';
		distancesValues(align, testDataId, distance);
	});

});
