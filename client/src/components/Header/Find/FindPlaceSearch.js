import React from 'react';
import { Button, Collapse, FormGroup, Input, Label, ModalBody } from 'reactstrap';
import { MultiSelect } from './FindSelect';
import { latLngToText, placeToLatLng } from "../../../utils/transformers";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function FindPlaceSearch(props) {
    const searchProps = {
        validateInput: props.validateInput,
        isValidInput: props.isValidInput,
        setIsValidInput: props.setIsValidInput,
        searchTerm: props.searchTerm,
        setSearchTerm: props.setSearchTerm

    }

    const whereSelectProps = {
        selectedValues: props.selectedWheres,
        setSelectedValues: props.setSelectedWheres,
        options: props.whereOptions,
        isMulti: true,
        placeholder: "Wheres"
    }

    const typeSelectProps = {
        selectedValues: props.selectedTypes,
        setSelectedValues: props.setSelectedTypes,
        options: props.typeOptions,
        isMulti: true,
        placeholder: "Types"
    }

    const placeResultsProps = {
        places: props.foundPlaces,
        onAdd: props.handleAddPlace,
        onRemove: props.handleRemovePlace,
        addedPlaces: props.addedPlaces,
        currentPage: props.currentPage
    }
    
    return (
        <ModalBody>
            <FormGroup>
                <Label for="match">Match</Label>
                    <SearchInput {...searchProps} />
                <Label className="pt-2" for="type">Type</Label>
                    <MultiSelect {...typeSelectProps} />
                <Label className="pt-2" for="where">Where</Label>
                    <MultiSelect {...whereSelectProps} />
            </FormGroup>
            <PlaceResults {...placeResultsProps} />
        </ModalBody>
    );
}

export function SearchInput(props) {
    const { setSearchTerm, searchTerm, setIsValidInput, isValidInput, validateInput } = props;

    return (
        <Input
            id="match"
            value={searchTerm}
            onChange={(event) => {
                const inputValue = event.target.value;
                setIsValidInput(validateInput(inputValue));
                setSearchTerm(inputValue);
            }}
            placeholder="Search for a place..."
            style={isValidInput ? { color: "black"} : { color: "red"}}
        />
    );
}

export function PlaceResults(props) {
    const places = props.places || [];
    const itemsPerPage = 10;
    const currentPlaces = paginate(places, itemsPerPage, props.currentPage);

    return (
        <Collapse isOpen={places.length > 0} style={{maxWidth: "84%"}}>
            {currentPlaces.map(place => (
                <div key={place.id}>
                    <PlaceInfo place={place} onAdd={props.onAdd} onRemove={() => props.onRemove(place.id)} isAdded={(props.addedPlaces || []).includes(place.id)} />
                </div>
            ))}
        </Collapse>
    );
}

function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export function PlaceInfo(props) {
    const {place, onAdd, onRemove, isAdded} = props;

    const defaultName = place.defaultDisplayName;
    const name = place.name;
    const id = place.id;
    const municipality = place.municipality;
    const region = place.region;
    const country = place.country;
    const location = latLngToText(placeToLatLng(place));

    return (
        <div>
            <AddRemoveButton place={place} onAdd={onAdd} onRemove={onRemove} isAdded={isAdded}/>
            <strong>{defaultName || name} ({id})</strong>
            <div>
                {municipality && `${municipality}, `}
                {region && `${region}, `}
                {country}
            </div>
            <div>
                {location}
            </div>
        </div>
    );
}

export function AddRemoveButton(props) {
    const { place, onAdd, onRemove, isAdded } = props;

    if (isAdded) {
        return (
            <Button aria-label="Remove" style={{ marginRight: 10 }} color="danger" size="sm" onClick={() => onRemove(place.id)}>
                <FaMinus />
            </Button>
        );
    } else {
        return (
            <Button aria-label="Add" style={{ marginRight: 10 }} color="primary" size="sm" onClick={() => onAdd(place)}>
                <FaPlus />
            </Button>
        );
    }
}
