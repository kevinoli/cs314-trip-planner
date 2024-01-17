import { beforeEach, describe, expect, test } from '@jest/globals';
import { fetchTour } from '../../../../src/components/Trip/Tour/TourAPI';
import { getOriginalServerUrl, sendAPIRequest } from '../../../../src/utils/restfulAPI';

jest.mock('../../../../src/utils/restfulAPI', () => ({
    sendAPIRequest: jest.fn(),
    getOriginalServerUrl: jest.fn()
}));

describe('TourAPI tests', () => {

    beforeEach(() => {
        getOriginalServerUrl.mockClear();
        sendAPIRequest.mockClear();
    });

    test('dmorigea: fetches tour places from the server', async () => {
        // Mocked data
        const mockPlaces = ['Test Place 1', 'Test Place 2'];
        sendAPIRequest.mockResolvedValueOnce({ places: mockPlaces });
        getOriginalServerUrl.mockReturnValueOnce("mockedURL");

        // Test call
        const result = await fetchTour(3959.0, 10.0, mockPlaces);

        // Expectations
        expect(getOriginalServerUrl).toHaveBeenCalledTimes(1);
        expect(sendAPIRequest).toHaveBeenCalledWith({
            requestType: 'tour',
            earthRadius: 3959.0,
            response: 10.0,
            places: mockPlaces
        }, "mockedURL");
        expect(result).toEqual(mockPlaces);
    });
});
