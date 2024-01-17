import React from 'react';
import Select from 'react-select';
import { Button, ModalFooter } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';

export default function FindPlaceFooter(props) {
    const { setSearchTerm, placesCount, setPlacesCount, foundPlaces, setFoundPlaces, setSelectedTypes, setSelectedWheres, setTotalPages, currentPage, setCurrentPage, clearPlaces, handleSearch, selectedTypes, selectedWheres} = props;
    const totalPages = props.totalPages > 0 ? props.totalPages : 1;
    const options = [...Array(totalPages).keys()].map(num => ({
        value: num + 1,
        label: `${num + 1}`
    }));

    const handlePageChange = selectedOption => {
        setCurrentPage(selectedOption.value);
    };

    return (
        <ModalFooter>
            <FindPlaceModalContent setFoundPlaces={setFoundPlaces} setPlacesCount={setPlacesCount} setSearchTerm={setSearchTerm} setSelectedTypes={setSelectedTypes} setSelectedWheres={setSelectedWheres} setTotalPages={setTotalPages} setCurrentPage={setCurrentPage} clearPlaces={clearPlaces} handleSearch={handleSearch} handlePageChange={handlePageChange} currentPage={currentPage} options={options} foundPlaces={foundPlaces} placesCount={placesCount} selectedTypes={selectedTypes} selectedWheres={selectedWheres} />
        </ModalFooter>
    );
}

export function FindPlaceModalContent({ setFoundPlaces, setPlacesCount, setSearchTerm, setSelectedTypes, setSelectedWheres, setTotalPages, setCurrentPage, clearPlaces, handleSearch, handlePageChange, currentPage, options, foundPlaces, placesCount, selectedTypes, selectedWheres }) {
    const itemsPerPage = 10;
    const startIndex = foundPlaces.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, foundPlaces.length);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                Showing {startIndex}-{endIndex} out of {foundPlaces.length} results
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button color="primary" data-testid='clear-place-button' onClick={() => clearPlaces(setFoundPlaces, setPlacesCount, setSearchTerm, setSelectedTypes, setSelectedWheres, setTotalPages, setCurrentPage)}><FaTrash style={{ marginBottom: 2 }}/></Button>
                <Button color="primary" onClick={() => handleSearch(setFoundPlaces, setPlacesCount, selectedTypes, selectedWheres)}> Random </Button>
                <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="pagination-dropdown"></label>
                    <Select id="pagination-dropdown" options={options} value={options.find(option => option.value === currentPage)} onChange={handlePageChange} isSearchable={false} className="pagination-select" menuPlacement="auto" />
                </div>
            </div>
        </div>
    );
}
