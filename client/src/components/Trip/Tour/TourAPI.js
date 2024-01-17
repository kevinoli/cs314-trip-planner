import {getOriginalServerUrl, sendAPIRequest} from '../../../utils/restfulAPI'

export const fetchTour = async (earthRadius, responseTime, places) => {
    const request = {
        requestType: 'tour',
        earthRadius: earthRadius,
        response: responseTime,
        places: places
    };

    const response = await sendAPIRequest(request, getOriginalServerUrl());
    if (response && response.places) {
        return response.places;
    }
    return [];
};
