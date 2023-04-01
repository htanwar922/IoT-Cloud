import { Feature, Overlay } from "ol";
import { Point } from "ol/geom";
import { Style, Stroke, Fill, Icon, Text, Circle, RegularShape } from "ol/style";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Component, Fragment, useState } from "react";
import { Button, Checkbox, FormControlLabel, Popover, Typography } from "@mui/material";

/**
 * _LocationLayer._
 * @param {import("../Applications/Applications").locationsType} locations
 * @returns VectorLayer
 */
export const LocationLayer = (locations) => {
	console.log(locations)
	const features = Object.keys(locations).map((locationName, i) => new Feature({
		geometry: new Point(fromLonLat(locations[locationName])),
		locationName: locationName, i: i, type: 'uncheckedBox',
	}))

	const styles = {
		checkedBox: new Style({
			image: new Icon({
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				// src: 'https://openlayers.org/en/latest/examples/data/icon.png',
				src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30" height="30" viewBox="0 0 24 24">							\
					<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>		\
				</svg>',
				scale: 1
			})
		}),
		uncheckedBox: new Style({
			image: new Icon({
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				// src: 'https://openlayers.org/en/latest/examples/data/icon.png',
				src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="30" height="30" viewBox="0 0 24 24">			\
					<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />		\
				</svg>',
				scale: 1
			})
		}),
		uncheckedCircle: new Style({
			image: new Circle({
				radius: 10,
				fill: new Fill({color: '#1100ff'}),
				stroke: new Stroke({color: '#00ff00', width: 5}),
			}),
		}),
		uncheckedStar: new Style({
			image: new RegularShape({
				points: 2,
				radius1: 15,
				radius2: 15,
				fill: new Fill({color: '#1100ff'}),
				stroke: new Stroke({color: '#00ff00', width: 5}),
				angle: Math.PI / 4,
			}),
			// hitDetectionRenderer: (coordinate, state) => {
			// 	console.log('HERE', coordinate)
			// 	console.log(state)
			// }
		}),
	};

	return new VectorLayer({
		source: new VectorSource({
			features: features,
			wrapX: true,
		}),
		style: function (feature) {
			return styles[feature.get('type')];
		},
	});
}

/**
 * 
 * @param {import('ol').Map} mapObject 
 * @param {Dispatch<SetStateAction<HTMLButtonElement | null>>} setAnchorEl 
 */
export const AddOverlays = (mapObject, setAnchorEl, setSelectedLocation) => {
	const popup = mapObject.getOverlayById('location-popup')

	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */	//React.MouseEvent<HTMLButtonElement>
	const handleClick = (event) => {
		console.log("EVENT")
		setAnchorEl(null)
		const feature = mapObject.getFeaturesAtPixel(event.pixel)[0];
		if (!feature)
			{ return }
		console.log(feature.getGeometry().getCoordinates())
		console.log(feature.get('locationName'))
		popup.setPosition(feature.getGeometry().getCoordinates())
		setSelectedLocation(feature.get('locationName'))
		setAnchorEl(popup.getElement());
	};

	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */
	const handleClose = (event) => {
		setAnchorEl(null);
		setSelectedLocation(null)
		const type = mapObject.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
		mapObject.getViewport().style.cursor = type;
	};

	mapObject.on('click', handleClick);
	mapObject.on('pointermove', handleClose);
}

/**
 * 
 * 
 * @param {{
 * 		mapObject: import('ol').Map,
 * 		id: String
 * 		locations: import("../Applications/Applications").locationsType,
 * 		anchorEl: HTMLButtonElement,
 * 		setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>,
 * 		formState: import("../Applications/Application/Application").graphType,
 * 		setFormState: Dispatch<SetStateAction<import("../Applications/Application/Application").graphType | null>>,
 * }} props
 * @returns 
 */
export const LocationPopover = ({ mapObject, id, locations, anchorEl, setAnchorEl, formState, setFormState, selectedLocation, setSelectedLocation }) => {
	const checked = selectedLocation in formState.props.locations
	console.log(checked)

	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */
	const handleClose = (event) => {
		// setAnchorEl(null);
		setSelectedLocation(null)
	};

	return (
		<Popover id={id}
			open={Boolean(anchorEl)}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
		>
			{selectedLocation
				? <Fragment>
					<FormControlLabel label={<font size='+2'>Bharti</font>} sx={{p: 2}} control={
						<Checkbox name="bharti" checked={checked}
							onChange={(event) => {
								if(selectedLocation in formState.props.locations) {
								}
								else{
									setFormState({...formState, props: {...formState.props, locations: [...formState.props.locations, selectedLocation]} })
								}
								console.log(formState)
							}}
						/>
					} />
					<Button type="reset" onClick={handleClose}>CLOSE</Button>
				</Fragment>
				: <></>
			}
		</Popover>
	)
}