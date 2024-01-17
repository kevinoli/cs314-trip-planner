import { useState, useEffect } from 'react';
import { fetchPlaces, fetchConfigData } from "./FindAPI";

const DEFAULT_PLACES_LIMIT = 250;

export const usePlacesLimit = () => {
    const [placesLimit, setPlacesLimit] = useState(DEFAULT_PLACES_LIMIT);
    return [placesLimit, setPlacesLimit];
};

export const clearPlaces = (setFoundPlaces, setPlacesCount, setSearchTerm, setSelectedTypes, setSelectedWheres, setTotalPages, setCurrentPage) => {
    setFoundPlaces([]);
    setPlacesCount(0);
    setSearchTerm('');
    setSelectedTypes([]);
    setSelectedWheres([]);
    setTotalPages(0);
    setCurrentPage(1);
}

export const handleAddPlace = (place, setAddedPlaces, placeActions) => {
    placeActions.append(place);
    setAddedPlaces(prevPlaces => [...prevPlaces, place.id]);
}

export const handleRemovePlace = (id, places, setAddedPlaces, placeActions) => {
    const placeToRemove = places.findIndex(place => place.id === id);
    if (placeToRemove !== -1) {
        placeActions.removeAtIndex(placeToRemove);
        setAddedPlaces(prevPlaces => prevPlaces.filter(existingId => existingId !== id));
    }
}

export const handleSearch = async (setFoundPlaces, setPlacesCount, selectedTypes, selectedWheres, placesLimit) => {
    try {
        const typeValues = selectedTypes.map(option => option.value);
        const whereValues = selectedWheres.map(option => option.value);
        const places = await fetchPlaces('', typeValues, whereValues, placesLimit);
        setFoundPlaces(places);
        setPlacesCount(places.length);
    } catch (error) {
        console.error("Error fetching places:", error);
    }
}

export const validateInput = (input) => {
    const regex = /['";=\(\)\*\\\/]/g;
    return !regex.test(input);
};

export const useUpdateTotalPages = (foundPlaces, itemsPerPage) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(foundPlaces.length / itemsPerPage));
    }, [foundPlaces, itemsPerPage]);

    return [totalPages, setTotalPages];
};

export const useFetchConfigData = (configKey) => {
    const [configOptions, setConfigOptions] = useState([]);

    useEffect(() => {
        fetchConfigData(configKey).then(data => {
            const formattedData = data.map((item) => ({value: item, label: item}));
            setConfigOptions(formattedData);
        });
    }, [configKey]);

    return [configOptions, setConfigOptions];
}

export const useFetchPlaces = (searchTerm, selectedTypes, selectedWheres, isValidInput, initialSearchPerformed) => {
    const [foundPlaces, setFoundPlaces] = useState([]);
    const [placesCount, setPlacesCount] = useState(0);
    const [placesLimit, setPlacesLimit] = usePlacesLimit();
    
    useEffect(() => {
        if (isValidInput) {
            const typeValues = selectedTypes.map(option => option.value);
            const whereValues = selectedWheres.map(option => option.value);

            if (!initialSearchPerformed.current) {
                initialSearchPerformed.current = true;
            } else if (searchTerm.length > 2 || typeValues.length > 0 || whereValues.length > 0) {
                fetchPlaces(searchTerm, typeValues, whereValues, placesLimit).then(places => {
                    setFoundPlaces(places);
                    setPlacesCount(places.length);
                });
            }
        }
    }, [searchTerm, selectedTypes, selectedWheres, isValidInput, initialSearchPerformed]);

    return [foundPlaces, placesCount];
};

export const useFetchTypeAndWhereData = () => {
    const [typeOptions] = useFetchConfigData('type');
    const [whereOptions] = useFetchConfigData('where');

    return [typeOptions, whereOptions];
};
