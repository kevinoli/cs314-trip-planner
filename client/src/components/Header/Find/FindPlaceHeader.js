import { ModalHeader } from "reactstrap";
import React from "react";

export default function FindPlaceHeader(props) {
    const { toggleFindPlace } = props;

    return (
        <ModalHeader toggle={toggleFindPlace}>Find a Place</ModalHeader>
    );
}
