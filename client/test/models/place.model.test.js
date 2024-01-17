import { describe, expect, test } from '@jest/globals';
import { Place } from '../../src/models/place.model';

describe('place model', () => {
	test('base: handles postcode', () => {
		const postcodeTest = new Place({
			latitude: '0.0',
			longitude: '0.0',
			postcode: '12345',
		});
		expect(postcodeTest.formatPlace()).toEqual('12345');
	});

	test('base: handles street address', () => {
		const placeWithName = new Place({
			name: 'Test',
			suburb: 'Test Suburb',
		});
		expect(placeWithName.formatPlace()).toEqual('Test, Test Suburb');

		const placeNoName = new Place({
			suburb: 'Test Suburb',
		});
		expect(placeNoName.formatPlace()).toEqual('Test Suburb');
	});

	test('base: handles municipality', () => {
		const placeWithAddy = new Place({
			suburb: 'Test Suburb',
			city: 'Fort Collins',
		});

		expect(placeWithAddy.formatPlace()).toEqual('Test Suburb, Fort Collins');

		const placeNoAddy = new Place({
			city: 'Fort Collins',
		});
		expect(placeNoAddy.formatPlace()).toEqual('Fort Collins');
	});

	test('base: handles region', () => {
		const placeWithCity = new Place({
			city: 'Fort Collins',
			state: 'Colorado',
		});
		expect(placeWithCity.formatPlace()).toEqual('Fort Collins, Colorado');

		const placeNoCity = new Place({
			state: 'Colorado',
		});
		expect(placeNoCity.formatPlace()).toEqual('Colorado');
	});

	test('base: handles country', () => {
		const placeWithRegion = new Place({
			state: 'Test State',
			country: 'Test Country',
		});
		expect(placeWithRegion.formatPlace()).toEqual('Test State, Test Country');

		const placeNoRegion = new Place({
			country: 'Test Country',
		});
		expect(placeNoRegion.formatPlace()).toEqual('Test Country');
	});
	
	test('dmorigea: handles id', () => {
		const placeWithId = new Place({
			id: 'test-id',
			name: 'Test Place'
		});
		expect(placeWithId.id).toEqual('test-id');
	});

	test('dmorigea: builds street address when components are provided', () => {
		const placeWithComponents = new Place({
			house_number: '123',
			road: 'Test Street',
			suburb: 'Test Suburb'
		});
		expect(placeWithComponents.streetAddress).toEqual('123 Test Street, Test Suburb');
	});

	test('dmorigea: uses existing street address when provided', () => {
		const placeWithExistingAddress = new Place({
			streetAddress: '123 Test Street',
			house_number: '999', // This should be ignored
			road: 'Fake Street', // This should be ignored
			suburb: 'Fake Suburb' // This should be ignored
		});
		expect(placeWithExistingAddress.streetAddress).toEqual('123 Test Street');
	});

	test('dmorigea: builds default display name from components', () => {
		const placeWithComponents = new Place({
			name: 'Test Name',
			city: 'Test City',
			state: 'Test State'
		});
		expect(placeWithComponents.defaultDisplayName).toEqual('Test Name');
	});

	test('dmorigea: uses existing default display name when provided', () => {
		const placeWithExistingName = new Place({
			defaultDisplayName: 'Test Place',
			name: 'Ignored Name', // This should be ignored
			city: 'Ignored City' // This should be ignored
		});
		expect(placeWithExistingName.defaultDisplayName).toEqual('Test Place');
	});
});
