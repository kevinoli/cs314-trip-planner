import React from 'react';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { render } from '@testing-library/react';
import ReorderTrip, { ReorderFromUI } from '../../../src/components/Header/ReorderTrip';

describe('ReorderTrip', () => {
    test('hridayab: renders the ReorderTrip component without exceptions', () => {
        render(<ReorderTrip />);
    }); 
});

describe('ReorderFromUI', () => {
    test('hridayab: renders the ReorderFromUI component without exceprions', () => {
        render(<ReorderFromUI />);
    });
});
