import React, { useState } from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { Table, Collapse, Button } from 'reactstrap';
import { latLngToText, placeToLatLng } from '../../../utils/transformers';
import { PiCaretDownDuotone, PiArrowFatLinesDownBold } from "react-icons/pi";
import { BsChevronDown } from 'react-icons/bs';
import PlaceActions from './PlaceActions';
import Distance from './Distance';
import Units from './Units';
import { useDistances } from '../../../hooks/useDistances';
import TourPlace from "../Tour/TourPlace";

export default function Itinerary(props) {
	const DEFAULT_EARTHRADIUS = 3959.0;
	const DEFAULT_UNIT = "miles";
	const DEFAULT_RESPONSE_TIME = 20;

	const [responseTime, setResponseTime] = useState( DEFAULT_RESPONSE_TIME );
	const [earthRadius, setEarthRadius] = useState( DEFAULT_EARTHRADIUS );
	const [distanceUnits, setDistanceUnits] = useState( DEFAULT_UNIT );
	
	const {distances} = useDistances(props.places, earthRadius, props.serverSettings);
	const total = distances.total;

	const unitsProps = {
		setEarthRadius: setEarthRadius,
		earthRadius: earthRadius,
		setDistanceUnits: setDistanceUnits,
		distanceUnits: distanceUnits,
		tripName: props.tripName,
		total: total,
		responseTime: responseTime,
		places: props.places,
		placeActions: props.placeActions
	}

	const placeListProps = { distances, places: props.places, placeActions: props.placeActions, selectedIndex: props.selectedIndex }
	
	return (<Table responsive>
				<TripHeader {...unitsProps} />
				<PlaceList {...placeListProps} />
			</Table>
	);
}

export function renderCommonTd(className, align, testDataId, content) {
    return (
      <td className={className} align={align} data-testid={testDataId}>
        {content}
      </td>
    );
}

function TripHeader(props) {
	const { placeActions, places, responseTime, total, tripName, distanceUnits, setDistanceUnits, earthRadius, setEarthRadius } = props;
	return (
		<thead>
			<tr>
				<th className='trip-header-title' data-testid='trip-header-title'>
						{tripName} is
						&nbsp;
						<label id="total-value"><Distance distance={total}/></label>
						&nbsp;
						<label id="total-units">
							<Units
								setEarthRadius={setEarthRadius}
								setDistanceUnits={setDistanceUnits}
								distanceUnits={distanceUnits}
							/>
						</label>
				</th>
				<TourPlace
					earthRadius={earthRadius}
					responseTime={responseTime}
					places={places}
					placeActions={placeActions}
				/>
				{renderCommonTd('leg-heading', 'center', 'Leg-arrow', <PiCaretDownDuotone fontSize={24} />)}
                {renderCommonTd('cumulative-header-title', 'center', 'Pi-Arrow-Fat-Lines-Down-Bold', <PiArrowFatLinesDownBold fontSize={24} />)}
			</tr>
		</thead>
	);
}

function PlaceList(props) {
	const {selectedIndex, placeActions, places, distances } = props;
	return (
		<tbody>
			{places.map((place, index) => (
				<PlaceRow
					distances={distances}
					placeActions={placeActions}
					selectedIndex={selectedIndex}
					place={place}
					index={index}
				/>
			))}
		</tbody>
	);
}

function PlaceRow(props) {
	const {index, place, selectedIndex, placeActions, distances } = props;
	const [showFullName, toggleShowFullName] = useToggle(false);
	const name = place.defaultDisplayName;
	const location = latLngToText(placeToLatLng(place));
	return (
		<tr className={selectedIndex === index ? 'selected-row' : ''}>
			<td
				data-testid={`place-row-${index}`}
				onClick={() =>
					placeRowClicked(
						toggleShowFullName,
						placeActions.selectIndex,
						index
					)
				}
			>
				<strong>{name}</strong>
				<AdditionalPlaceInfo {...props} showFullName={showFullName} location={location}/>
			</td>
			{distancesValues('right', 'leg-distances', distances.leg[index || 0])}
			{distancesValues('right', 'cumulative-distances', distances.cumulative[index || 0])}
			<RowArrow toggleShowFullName={toggleShowFullName} index={index}/>
		</tr>
	);
}

export function distancesValues(align, dataTestId, distance) {
	return (
	  <td align={align} data-testid={dataTestId}>
		<Distance distance={distance || 0} />
	  </td>
	);
}

function AdditionalPlaceInfo(props) {
	if (props.showFullName == undefined) {
		props.showFullName = "Undefined";
	}
	if (props.place.defaultDisplayName == undefined) {
		props.place.defaultDisplayName = "Undefined";
	}
	return (
		<Collapse isOpen={props.showFullName}>
			{props.place.formatPlace().replace(`${props.place.defaultDisplayName}, `, '')}
			<br />
			{props.location}
			<br />
			<PlaceActions placeActions={props.placeActions} index={props.index} />
		</Collapse>
	);
}

function placeRowClicked(toggleShowFullName, selectIndex, placeIndex) {
	toggleShowFullName();
	selectIndex(placeIndex);
}

function RowArrow(props) {
	return (
		<td>
			<BsChevronDown data-testid={`place-row-toggle-${props.index}`} onClick={props.toggleShowFullName}/>
		</td>
	);
}
