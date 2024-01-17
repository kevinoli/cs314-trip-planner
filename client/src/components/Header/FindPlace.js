import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'reactstrap';
import FindPlaceHeader from './Find/FindPlaceHeader';
import FindPlaceSearch from './Find/FindPlaceSearch';
import FindPlaceFooter from './Find/FindPlaceFooter';
import { handleAddPlace, handleRemovePlace, handleSearch, validateInput, clearPlaces, useUpdateTotalPages, useFetchPlaces, usePlacesLimit } from "./Find/FindPlaceHelper";

export default function FindPlace(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [foundPlaces, setFoundPlaces] = useState([]);
    const [placesCount, setPlacesCount] = useState(0);
    const [isValidInput, setIsValidInput] = useState(true);
    const [addedPlaces, setAddedPlaces] = useState([]);
    const initialSearchPerformed = useRef(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useUpdateTotalPages(foundPlaces, itemsPerPage);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedWheres, setSelectedWheres] = useState([]);
    const [fetchedPlaces, fetchedPlacesCount] = useFetchPlaces(searchTerm, selectedTypes, selectedWheres, isValidInput, initialSearchPerformed);
    const [placesLimit, setPlacesLimit] = usePlacesLimit();

    useEffect(() => {
            setFoundPlaces(fetchedPlaces);
            setPlacesCount(fetchedPlacesCount);
    }, [fetchedPlaces, fetchedPlacesCount]);

    return (
        <Modal isOpen={props.showFindPlace} toggle={props.toggleFindPlace}>
            <FindPlaceHeader toggleFindPlace={ props.toggleFindPlace } />
            <FindPlaceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} foundPlaces={foundPlaces} handleAddPlace={(place) => handleAddPlace(place, setAddedPlaces, props.placeActions)} handleRemovePlace={(id) => handleRemovePlace(id, props.places, setAddedPlaces, props.placeActions)} addedPlaces={addedPlaces} validateInput={validateInput} isValidInput={isValidInput} setIsValidInput={setIsValidInput} typeOptions={props.typeOptions} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} whereOptions={props.whereOptions} selectedWheres={selectedWheres} setSelectedWheres={setSelectedWheres} currentPage={currentPage} />
            <FindPlaceFooter placesCount={placesCount} setPlacesCount={setPlacesCount} foundPlaces={foundPlaces} setFoundPlaces={setFoundPlaces} setSearchTerm={setSearchTerm} setSelectedTypes={setSelectedTypes} setSelectedWheres={setSelectedWheres} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} setTotalPages={setTotalPages} clearPlaces={() => clearPlaces(setFoundPlaces, setPlacesCount, setSearchTerm, setSelectedTypes, setSelectedWheres, setTotalPages, setCurrentPage)} handleSearch={() => handleSearch(setFoundPlaces, setPlacesCount, selectedTypes, selectedWheres, placesLimit)} selectedTypes={selectedTypes} selectedWheres={selectedWheres}/>
        </Modal>
    );
}
