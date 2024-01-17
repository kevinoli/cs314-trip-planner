import React from 'react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import Distance from '../../../src/components/Trip/Itinerary/Distance';

describe('Distance', () => {
    test('hridayab: checks if function returns props value', () => {
        const props = 60; // Some distance in miles
        const result = Distance({distance: props});
        expect(result).toBe(props.toLocaleString());
    });
});