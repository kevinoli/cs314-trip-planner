import { Place } from "../src/models/place.model";
export const VALID_CONFIG_RESPONSE = JSON.stringify({
    requestType: 'config',
    serverName: 't00',
    features: ['config']
});

export const VALID_DISTANCES_RESPONSE = JSON.stringify({
        requestType    : "distances",
        places         : [{"name":"place1", "latitude":  "40.6",  "longitude": "-105.1"},
                            {"name": "place2", "latitude":  "-33.9", "longitude": "151.2"},
                            {"name": "place3", "latitude":  "-57.9", "longitude": "175.2"}],
        earthRadius    : 6371.0,
        distances       : [1034, 785, 1503]
});

export const INVALID_REQUEST = JSON.stringify({
    invalid: 'this is an invalid response to fail the schema'
});

export const MOCK_PLACES = [
    new Place({ name: 'Place A', latitude: "40.0", longitude: "-20.0" }),
    new Place({ name: 'Place B', latitude: "-20.0", longitude: "50.0" }),
    new Place({ name: '123 Test', city: 'expanded test', latitude: "50.0", longitude: "60.0"}),
    new Place({lat: '27.0', lng: '100.0', road: 'Main St'}),
    new Place({lat: '80', lng: '-80', suburb: 'Test Suburb', name: 'Test Place'}),
    new Place({house_number: '123', road: 'Main St', suburb: 'Test Suburb', lat: '5.0', lng: '-40.0'}),
    new Place({latitude: "0.0", longitude: "0.0", postcode: '12345'}),
    new Place({lat: '50', lng: '50', road: 'Main St', country: 'Test Country'})
];

export const REVERSE_GEOCODE_RESPONSE = JSON.stringify({
    "place_id": 259127396,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 8539568,
    "lat": "40.57066025",
    "lng": "-105.08539645568865",
    "place_rank": 30,
    "category": "amenity",
    "type": "university",
    "importance": 0.4948531325947546,
    "addresstype": "amenity",
    "name": "Colorado State University",
    "display_name": "Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States",
    "address": {
        "amenity": "Colorado State University",
        "road": "South College Avenue",
        "city": "Fort Collins",
        "county": "Larimer County",
        "state": "Colorado",
        "postcode": "80525-1725",
        "country": "United States",
        "country_code": "us"
    },
    "boundingbox": [
        "40.5527786",
        "40.5789122",
        "-105.0972937",
        "-105.0721817"
    ]
});

export const MOCK_PLACE_RESPONSE = {
    country: "United States",
    defaultDisplayName: "Colorado State University",
    latitude: '40.57',
    longitude: '-105.085',
    name: 'Colorado State University',
    municipality: 'Fort Collins',
    postcode: "80525-1725",
    region: "Colorado",
    streetAddress: "South College Avenue",
};

/******** Find protocol mock responses */

export const MOCK_RESPONSE_FIND_BASE_VALID_NONE = JSON.stringify({
    requestType: "find",
    match: "mock",
    limit: 100,
    found: 0,
    places: []
});

export const MOCK_RESPONSE_FIND_BASE_VALID_ONE = JSON.stringify({
    requestType: "find",
    match: "mock",
    limit: 100,
    found: 1,
    places: [
        {"name":"place1", "latitude":  "40.6",  "longitude": "-105.1"}
    ]
});

export const MOCK_RESPONSE_FIND_BASE_VALID_MANY = JSON.stringify({
    requestType: "find",
    match: "mock",
    limit: 100,
    found: 3,
    places: [
        {"name": "place1", "latitude": "40.6",  "longitude": "-105.1"},
        {"name": "place2", "latitude": "-33.9", "longitude": "151.2"},
        {"name": "place3", "latitude": "-57.9", "longitude": "175.2"}
    ]
});

export const MOCK_RESPONSE_FIND_EXT_VALID_NONE = JSON.stringify({
    requestType: "find",
    match: "mock",
    limit: 100,
    found: 0,
    type: [],
    where: [],
    places: []
});
export const MOCK_RESPONSE_FIND_EXT_VALID_ONE = JSON.stringify({
    requestType: "find",
    match: "mock",
    limit: 100,
    found: 1,
    type: [],
    where: [],
    places: [
        {"name":"place1", "latitude":  "40.6",  "longitude": "-105.1"}
    ]
});
export const MOCK_RESPONSE_FIND_EXT_VALID_MANY = JSON.stringify({
    requestType: "find",
    match: "mock",
    limit: 100,
    found: 3,
    type: [],
    where: [],
    places: [
        {"name": "place1", "latitude": "40.6",  "longitude": "-105.1"},
        {"name": "place2", "latitude": "-33.9", "longitude": "151.2"},
        {"name": "place3", "latitude": "-57.9", "longitude": "175.2"}
    ]
});
export const MOCK_RESPONSE_FIND_BASE_INVALID = JSON.stringify({
    requestType: "find",
    match: "mock",
    limit: 100,
    found: 0,
    places: []
});
export const MOCK_RESPONSE_FIND_EXT_INVALID = JSON.stringify({
    requestType: "find",
    bogusProperty: "This should ruin me.",
    match: "mock",
    limit: 100,
    found: 0,
    type: [],
    where: [],
    places: []
});

export const VALID_TOUR_RESPONSE = JSON.stringify({
    requestType: "tour",
    earthRadius: 6371.0,
    response: 200,
    places: [
        { "latitude": "40.6", "longitude": "-105.1" },
        { "latitude": "-33.9", "longitude": "151.2" },
        { "latitude": "51.5", "longitude": "-0.1" }
    ]
});

export const INVALID_TOUR_RESPONSE = JSON.stringify({
    requestType: "tour",
    earthRadius: "incorrect_type",
    response: 200
});

