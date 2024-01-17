import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";

export default function SaveFile(props) {
    const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState("json");
    const [fileName, setFileName] = useState(props.tripName);

    const toggleFormatDropdown = () => {
        setFormatDropdownOpen(!formatDropdownOpen);
    };

    function clear() {
        props.toggleSaveFile();
    };

    const bodyProps = {
        tripName: props.tripName,
        places: props.places,
        clear,
        selectedFormat,
        setSelectedFormat,
        fileName,
        setFileName,
    };

    return (
        <Modal isOpen={props.showSaveFile} toggle={clear} data-testid="save-file-modal">
            <SaveFileHeader toggleSaveFile={clear} />
            <SaveFileBody {...bodyProps} toggleFormatDropdown={toggleFormatDropdown} formatDropdownOpen={formatDropdownOpen}/>
            <SaveFileFooter {...bodyProps} />
        </Modal>
    );
}

function SaveFileHeader(props) {
    return (
        <ModalHeader className="ml-2" toggle={props.toggleSaveFile}>
            Save Trip
        </ModalHeader>
    );
}

function SaveFileBody(props) {
    return (
        <div className="d-flex align-items-center">
            <Dropdown className="p-3 mr-2" isOpen={props.formatDropdownOpen} toggle={props.toggleFormatDropdown} data-testid="save-file-dropdown-toggle">
            <DropdownToggle caret data-testid="selected-format-text">
                {props.selectedFormat === "json" ? "Save as JSON" : "Save as KML"}
            </DropdownToggle>
            <DropdownMenu className="">
                <DropdownItem onClick={() => props.setSelectedFormat("json")}>JSON</DropdownItem>
                <DropdownItem onClick={() => props.setSelectedFormat("kml")}>KML</DropdownItem>
            </DropdownMenu>
            </Dropdown>
            <Input
                type="text"
                value={props.fileName}
                onChange={(e) => props.setFileName(e.target.value)}
                data-testid="file-name-input"
            />
            <span className="pe-4 ps-1">.{props.selectedFormat}</span>
        </div>
    );
}


function SaveFileFooter(props) {
    return (
        <ModalFooter>
            <ConfirmSaveButton {...props} />
            <CancelSaveButton {...props} />
        </ModalFooter>
    );
}

function ConfirmSaveButton(props) {
    return (
        <Button
            color="primary"
            onClick={() => {
                props.clear();
                if (props.selectedFormat === "json") {
                    SaveJSON(props.fileName, JSON.stringify({ places: props.places }));
                } else if (props.selectedFormat === "kml") {
                    SaveKML(props.fileName, props.places);
                }
            }}
            data-testid="confirm-save-button"
        >
            Save File
        </Button>
    );
}

function CancelSaveButton(props) {
    return (
        <Button
            color="secondary"
            onClick={() => {props.clear()}}
            data-testid="close-save-button"
        >
            Cancel
        </Button>
    );
}

function SaveJSON(tripName, fileText){
    const file = new Blob([fileText], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = tripName + ".json";
    document.body.appendChild(link);
    link.click();
    setTimeout(function() {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function SaveKML(tripName, places) {
    let placesArray;
    placesArray = Object.values(places);
    const kmlString = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Document>
        ${places.map(place => `
          <Placemark>
            <name>${place.streetAddress}</name>
            <Point>
              <coordinates>${place.longitude},${place.latitude}</coordinates>
            </Point>
          </Placemark>
        `).join('\n')}
      </Document>
    </kml>`;

    const file = new Blob([kmlString], { type: 'application/vnd.google-earth.kml+xml' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = tripName + '.kml';
    document.body.appendChild(link);
    link.click();
  
    setTimeout(function () {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 0);
}

