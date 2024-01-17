import { expect, test } from '@jest/globals';
import { fetchPlaces, fetchConfigData } from '../../../../src/components/Header/Find/FindAPI';
import { getOriginalServerUrl, sendAPIRequest } from '../../../../src/utils/restfulAPI';

jest.mock('../../../../src/utils/restfulAPI', () => ({
    sendAPIRequest: jest.fn(),
    getOriginalServerUrl: jest.fn()
}));

describe('FindAPI tests', () => {

    beforeEach(() => {
        getOriginalServerUrl.mockClear();
        sendAPIRequest.mockClear();
    });

    test('dmorigea: fetchPlaces returns places from the server', async () => {
        sendAPIRequest.mockResolvedValueOnce({ places: ['place1', 'place2'] });
        getOriginalServerUrl.mockReturnValueOnce("mockedURL");

        const result = await fetchPlaces('testMatch', 'testType', 'testWhere', 50);

        expect(getOriginalServerUrl).toHaveBeenCalledTimes(1);
        expect(sendAPIRequest).toHaveBeenCalledWith({
            requestType: 'find',
            match: 'testMatch',
            type: 'testType',
            where: 'testWhere',
            limit: 50
        }, "mockedURL");
        expect(result).toEqual(['place1', 'place2']);
    });

    test('dmorigea: fetchConfigTypes returns types from the server', async () => {
        sendAPIRequest.mockResolvedValueOnce({ type: ['type1', 'type2'] });
        getOriginalServerUrl.mockReturnValueOnce("mockedURL");

        const result = await fetchConfigData('type');

        expect(getOriginalServerUrl).toHaveBeenCalledTimes(1);
        expect(sendAPIRequest).toHaveBeenCalledWith({
            requestType: 'config',
        }, "mockedURL");
        expect(result).toEqual(['type1', 'type2']);
    });

    test('dmorigea: fetchConfigWheres returns wheres from the server', async () => {
        sendAPIRequest.mockResolvedValueOnce({ where: ['where1', 'where2'] });
        getOriginalServerUrl.mockReturnValueOnce("mockedURL");

        const result = await fetchConfigData('where');

        expect(getOriginalServerUrl).toHaveBeenCalledTimes(1);
        expect(sendAPIRequest).toHaveBeenCalledWith({
            requestType: 'config',
        }, "mockedURL");
        expect(result).toEqual(['where1', 'where2']);
    });

    test('hridayab: should return an empty array when the data type is not found', async () => {
        const dataType = 'nonExistentType';
        const result = await fetchConfigData(dataType);
    
        expect(result).toEqual([]);
    });
});
