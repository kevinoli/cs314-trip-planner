import { getOriginalServerUrl, sendAPIRequest } from '../../../utils/restfulAPI';

export const fetchPlaces = async (match, type, where, limit) => {
    const request = {
        requestType: 'find',
        match: match,
        type: type || [],
        where: where || [],
        limit: limit
    };

    const response = await sendAPIRequest(request, getOriginalServerUrl());
    if (response && response.places) {
        return response.places;
    }
    return [];
};

export const fetchConfigData = async (dataType) => {
    const request = {
        requestType: 'config'
    }

    const response = await sendAPIRequest(request, getOriginalServerUrl());
    if (response && response[dataType]) {
        return response[dataType];
    }
    return [];
};
