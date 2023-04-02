import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useState } from "react";
import { Popover, Typography } from "@mui/material";


var selectedLocation = null
var anchorEl = null
var hidePopover = false
var setPopoverStateGlobal = null

const setSelectedLocation = (value) => {
	selectedLocation = value
}
const setAnchorEl = (value) => {
	anchorEl = value
	if(setPopoverStateGlobal)
		setPopoverStateGlobal(Boolean(value))
}

const styles = {
	checkedBox: new Style({
		image: new Icon({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			// src: 'https://openlayers.org/en/latest/examples/data/icon.png',
			src: 'data:image/svg+xml;utf8,'
			+'	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30" height="30" viewBox="0 0 24 24">'
			+'		<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
			+'	</svg>',
			scale: 1
		})
	}),
	uncheckedBox: new Style({
		image: new Icon({
			anchor: [0.5, 46],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			// src: 'https://openlayers.org/en/latest/examples/data/icon.png',
			src: 'data:image/svg+xml;utf8,'
			+'	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30" height="30" viewBox="0 0 24 24">'
			+'		<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />'
			+'	</svg>',
			scale: 1
		})
	}),
};

/**
 * _LocationLayer._
 * @param {import("../Applications/Applications").locationsType} locations
 * @returns VectorLayer
 */
export const LocationLayer = (locations) => {
	const features = Object.keys(locations).map((locationName, i) => new Feature({
		geometry: new Point(fromLonLat(locations[locationName])),
		locationName: locationName, locationIP: locations[locationName],
		i: i, //type: 'uncheckedBox',
	}))

	return new VectorLayer({
		source: new VectorSource({
			features: features,
			wrapX: true,
		}),
		style: styles['uncheckedBox']	// function (feature) { return styles[feature.get('type')]; },
	});
}

/**
 * 
 * @param {import('ol').Map} mapObject 
 * @param {{
 * 		formState: import("../Applications/Application/Application").graphType,
 * 		setFormState: (value: import("../Applications/Application/Application").graphType) => void
 * }} formContext 
 */
export const AddOverlays = (mapObject, formContext) => {
	const popup = mapObject.getOverlayById('location-popup')

	/** @param event {React.ChangeEvent<HTMLElement>} */
	const handleHover = (event) => {
		setSelectedLocation(null)
		setAnchorEl(null)
		const feature = mapObject.getFeaturesAtPixel(event.pixel)[0];
		if (!feature) {
			mapObject.getViewport().style.cursor = 'inherit';
			return
		}
		mapObject.getViewport().style.cursor = 'pointer';
		popup.setPosition(feature.getGeometry().getCoordinates())
		setSelectedLocation(feature.get('locationName'))
		setAnchorEl(popup.getElement());
	};

	/** @param event {React.ChangeEvent<HTMLElement>} */
	const handleSingleClick = (event) => {
		mapObject.forEachFeatureAtPixel(event.pixel, function (feature) {
			const locations = formContext.formState.props.locations
			const index = locations.indexOf(feature.get('locationName'));
			if (index < 0) {
				locations.push(feature.get('locationName'));
				formContext.setFormState({...formContext.formState, props: {...formContext.formState.props, locations: locations}})
				feature.setStyle(styles.checkedBox);
			} else {
				locations.splice(index, 1);
				formContext.setFormState({...formContext.formState, props: {...formContext.formState.props, locations: locations}})
				feature.setStyle(styles.uncheckedBox);
			}
		});
	}
	
	/** @param event {React.ChangeEvent<HTMLElement>} */
	const handleClose = (event) => {
		console.log('CLOSE')
		setAnchorEl(anchorEl)
		const type = mapObject.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
		mapObject.getViewport().style.cursor = type;
	};

	mapObject.on('pointermove', handleHover);
	mapObject.on('singleclick', handleSingleClick);
	mapObject.on('dblclick', handleClose);
}

/**
 * 
 * @param {{
 * 		mapObject: import('ol').Map,
 * 		id: String
 * 		locations: import("../Applications/Applications").locationsType,
 * }} props
 * @returns 
 */
export const LocationPopover = ({ mapObject, id }) => {
	const [popoverState, setPopoverState] = useState(false)
	setPopoverStateGlobal = setPopoverState

	if(mapObject && popoverState)
		return (
			<Popover id={id}
				open={popoverState}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				hidden={hidePopover}
				style={{ pointerEvents: 'none'}}
				disableRestoreFocus
			>
				<Typography margin={1} variant="h6">{selectedLocation}</Typography>
			</Popover>
		)
	else
		return <></>
}

/** @param event {React.ChangeEvent<HTMLElement>} */
// const handleClose = (event) => {
// 	setSelectedLocation(null)
// 	setAnchorEl(null);
// 	setPopoverState(false)
//	hidePopover = true
// 	setAnchorEl(anchorEl)
// 	var timerId = setTimeout(() => {
// 		hidePopover = false
// 		setAnchorEl(anchorEl)
// 		clearTimeout(timerId)
// 	}, 2000);
// };
// onClose={handleClose}