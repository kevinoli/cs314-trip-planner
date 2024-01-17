import { beforeEach, describe, expect, test } from "@jest/globals";
import { VALID_CONFIG_RESPONSE, VALID_DISTANCES_RESPONSE, INVALID_REQUEST } from '../sharedMocks';
import { MOCK_RESPONSE_FIND_BASE_VALID_NONE, MOCK_RESPONSE_FIND_BASE_VALID_ONE, MOCK_RESPONSE_FIND_BASE_VALID_MANY,
         MOCK_RESPONSE_FIND_EXT_VALID_NONE, MOCK_RESPONSE_FIND_EXT_VALID_ONE, MOCK_RESPONSE_FIND_EXT_VALID_MANY,
         MOCK_RESPONSE_FIND_BASE_INVALID, MOCK_RESPONSE_FIND_EXT_INVALID, VALID_TOUR_RESPONSE, INVALID_TOUR_RESPONSE } from '../sharedMocks';
import { LOG } from '../../src/utils/constants';
import { getOriginalServerUrl, sendAPIRequest } from '../../src/utils/restfulAPI';

describe('restfulAPI', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        fetch.resetMocks();
        jest.spyOn(LOG, 'error').mockImplementation(() => {});
    });

    test('base: sendAPIRequest handles valid server response', async () => {
        fetch.mockResponse(VALID_CONFIG_RESPONSE);
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(VALID_CONFIG_RESPONSE));
    });

    test('base: sendAPIRequest response is not ok', async () => {
        fetch.mockResponse(INVALID_REQUEST, { status: 404, ok: false, statusText: 'This is what we expect' });
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('base: sendAPIRequest response is rejected', async () => {
        fetch.mockReject(new Error('Expected rejection'));
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('base: sendAPIRequest schema not implemented', async () => {
        fetch.mockResponse(VALID_CONFIG_RESPONSE);
        expect(sendAPIRequest({ requestType: 'notValid' })).rejects.toThrow();
    });

    test('base: sendAPIRequest gives null response for invalid request', async () => {
        fetch.mockResponse(INVALID_REQUEST);
        const response = await sendAPIRequest(JSON.parse(VALID_CONFIG_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
    
    test('truongak: sendAPIRequest handles valid server response', async () => {
        fetch.mockResponse(VALID_DISTANCES_RESPONSE);
        const response = await sendAPIRequest(JSON.parse(VALID_DISTANCES_RESPONSE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(VALID_DISTANCES_RESPONSE));
    });

    test('truongak: sendAPIRequest response is not ok', async () => {
        fetch.mockResponse(INVALID_REQUEST, { status: 404, ok: false, statusText: 'This is what we expect' });
        const response = await sendAPIRequest(JSON.parse(VALID_DISTANCES_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('truongak: sendAPIRequest response is rejected', async () => {
        fetch.mockReject(new Error('Expected rejection'));
        const response = await sendAPIRequest(JSON.parse(VALID_DISTANCES_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('truongak: sendAPIRequest schema not implemented', async () => {
        fetch.mockResponse(VALID_DISTANCES_RESPONSE);
        expect(sendAPIRequest({ requestType: 'notValid' })).rejects.toThrow();
    });

    test('truongak: sendAPIRequest gives null response for invalid request', async () => {
        fetch.mockResponse(INVALID_REQUEST);
        const response = await sendAPIRequest(JSON.parse(VALID_DISTANCES_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('base: getOriginalServerUrl', async () => {
        process.env.SERVER_PORT = '3113';
        expect(getOriginalServerUrl()).toEqual('http://localhost:3113');
    });

    /******** Find protocol tests */

    test('rpcme: find: valid response, no places found', async () => {
        fetch.mockResponse(MOCK_RESPONSE_FIND_BASE_VALID_NONE);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_BASE_VALID_NONE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(MOCK_RESPONSE_FIND_BASE_VALID_NONE));
        expect(response["found"]).toEqual(0);
        expect(response["places"].length).toEqual(0);
    });

    test('rpcme: find: valid response, one place found', async () => {
        fetch.mockResponse(MOCK_RESPONSE_FIND_BASE_VALID_ONE);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_BASE_VALID_ONE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(MOCK_RESPONSE_FIND_BASE_VALID_ONE));
        expect(response["found"]).toEqual(1);
        expect(response["places"].length).toEqual(1);
    });

    test('rpcme: find: valid response, many places found', async () => {
        fetch.mockResponse(MOCK_RESPONSE_FIND_BASE_VALID_MANY);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_BASE_VALID_MANY), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(MOCK_RESPONSE_FIND_BASE_VALID_MANY));
        expect(response["found"]).toEqual(3);
        expect(response["places"].length).toEqual(3);
    });

    test('rpcme: find: valid response, no places found', async () => {
        fetch.mockResponse(MOCK_RESPONSE_FIND_EXT_VALID_NONE);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_EXT_VALID_NONE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(MOCK_RESPONSE_FIND_EXT_VALID_NONE));
        expect(response["found"]).toEqual(0);
        expect(response["places"].length).toEqual(0);
    });

    test('rpcme: find: valid response, one place found', async () => {
        fetch.mockResponse(MOCK_RESPONSE_FIND_EXT_VALID_ONE);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_EXT_VALID_ONE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(MOCK_RESPONSE_FIND_EXT_VALID_ONE));
        expect(response["found"]).toEqual(1);
        expect(response["places"].length).toEqual(1);
    });

    test('rpcme: find: valid response, many places found', async () => {
        fetch.mockResponse(MOCK_RESPONSE_FIND_EXT_VALID_MANY);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_EXT_VALID_MANY), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(MOCK_RESPONSE_FIND_EXT_VALID_MANY));
        expect(response["found"]).toEqual(3);
        expect(response["places"].length).toEqual(3);
    });

    test('rpcme: find: gives null on bad data', async () => {
        fetch.mockResponse(INVALID_REQUEST);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_BASE_INVALID), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('rpcme: find: gives null on bad data (extended)', async () => {
        fetch.mockResponse(INVALID_REQUEST);
        const response = await sendAPIRequest(JSON.parse(MOCK_RESPONSE_FIND_EXT_INVALID), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    test('dmorigea: sendAPIRequest handles valid server response', async () => {
        fetch.mockResponse(VALID_TOUR_RESPONSE);
        const response = await sendAPIRequest(JSON.parse(VALID_TOUR_RESPONSE), 'http://localhost:31400');
        expect(response).toEqual(JSON.parse(VALID_TOUR_RESPONSE));
    });

    test('dmorigea: sendAPIRequest handles invalid server response', async () => {
        fetch.mockResponse(INVALID_TOUR_RESPONSE);
        const response = await sendAPIRequest(JSON.parse(INVALID_TOUR_RESPONSE), 'http://localhost:31400');
        expect(response).toBeNull();
        expect(LOG.error.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
    
});
