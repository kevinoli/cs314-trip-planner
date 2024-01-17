import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import { FaTimes } from 'react-icons/fa';

export default function Units(props) {
    const [showCustomUnit, setShowCustomUnit] = useState(false);
    const [customUnitName, setCustomUnitName] = useState('');
    const [customEarthRadius, setCustomEarthRadius] = useState('');
    const customUnitNameInputRef = useRef(null);
    const [selectedUnit, setSelectedUnit] = useState(props.distanceUnits);
    const [customUnits, setCustomUnits] = useState([]);
    const [customUnitInfo, setCustomUnitInfo] = useState({});

    useEffect(() => {
        const storedCustomUnitName = localStorage.getItem('customUnitName');
        const storedCustomEarthRadius = localStorage.getItem('customEarthRadius');

        if(storedCustomUnitName && storedCustomEarthRadius) {
            setCustomUnitName(storedCustomUnitName);
            setCustomEarthRadius(storedCustomEarthRadius);
            setCustomUnitInfo({...customUnitInfo, [storedCustomUnitName]: parseFloat(storedCustomEarthRadius),});
        }
    }, []);
    
    useEffect(() => {
        if (showCustomUnit) {
            customUnitNameInputRef.current.focus();
        }
    }, [showCustomUnit]);

    const handleChange = (event) => {
        const unit = event.target.value;
        setSelectedUnit(unit);
        props.setDistanceUnits(unit);

        switch (unit) {
            case 'miles':
                props.setEarthRadius(3963.19);
                break;
            case 'kilometers':
                props.setEarthRadius(6378.14);
                break;
            case 'nauticalmiles':
                props.setEarthRadius(3443.92);
                break;
            case 'addcustom':
                setShowCustomUnit(true);
                break;
            default:
                if (customUnitInfo[unit] !== undefined) {
                    props.setEarthRadius(customUnitInfo[unit]);
                } else {
                    props.setEarthRadius(3963.19);
                }
        }
    }

    const handleCustomUnit = (submitClicked) => {
        if (submitClicked) {
            const newCustomUnit = customUnitName;
            props.setDistanceUnits(customUnitName);
            props.setEarthRadius(parseFloat(customEarthRadius));
            localStorage.setItem('customUnitName', customUnitName);
            localStorage.setItem('customEarthRadius', customEarthRadius);
            setCustomUnits((prevCustomUnits) => [...prevCustomUnits, customUnitName]);
            setSelectedUnit(newCustomUnit);
            setCustomUnitInfo({...customUnitInfo, [customUnitName]: parseFloat(customEarthRadius),});
        }
        setShowCustomUnit(false);
    }

    const handleRemoveCustomUnit = (customUnitToRemove) => {
        setCustomUnits((prevCustomUnits) => 
            prevCustomUnits.filter((unit) => unit !== customUnitToRemove)
        );
        setCustomUnitInfo((prevCustomUnitInfo) => {
            const { [customUnitToRemove]: _, ...rest } = prevCustomUnitInfo;
            return rest;
        });
    }

    return (
        <div>
            <select value={selectedUnit} onChange={handleChange}>
                <option value="miles">Miles</option>
                <option value="kilometers">Kilometers</option>
                <option value="nauticalmiles">Nautical Miles</option>
                {customUnits.map((unit) => (<option key={unit} value={unit}>{unit}</option>))}
                {showCustomUnit && <option value={customUnitName}>{customUnitName}</option>}
                <option value="addcustom">Add Custom Unit</option>
                <option value="removecustom">Remove Custom Unit</option>
            </select>

            {showCustomUnit && (
                <div className="custom-units">
                    <div>
                    <label> Enter custom unit name: <input type="text" value={customUnitName} onChange={(e) => setCustomUnitName(e.target.value)} ref={customUnitNameInputRef} style={{ marginRight: '10px' }} /> </label>
                    <label> Enter custom earth radius: <input type="text" value={customEarthRadius} onChange={(e) => setCustomEarthRadius(e.target.value)} /> </label>
                    </div>
                    <Button onClick={() => handleCustomUnit(true)} data-testid="submit-button" color="primary">Submit</Button>
                    <Button onClick={() => handleCustomUnit(false)} data-testid="cancel-button">Cancel</Button>
                </div>
            )}

            {customUnits.length > 0 && selectedUnit === 'removecustom' && (
                <div data-testid="remove-custom-section">
                    <ul>
                        {customUnits.map((unit) => (<li key={unit}> {unit}{' '} <Button onClick={() => handleRemoveCustomUnit(unit)} data-testid="remove-custom-unit-button" color='danger'> <FaTimes /> </Button>{' '}</li>))}
                    </ul>
                </div>
            )}
        </div>
    );
}