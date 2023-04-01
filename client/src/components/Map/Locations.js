import { Feature, Overlay } from "ol";
import { Point } from "ol/geom";
import { Style, Stroke, Fill, Icon, Text, Circle, RegularShape } from "ol/style";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Component, useState } from "react";
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
		name: locationName, i: i, type: 'uncheckedBox',
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

export const Overlays = (locations, popoverRef) => {
	return Object.keys(locations).map((locationName, i) => new Overlay({
		position: fromLonLat(locations[locationName]),
		positioning: 'center-center',
		element: popoverRef.current,
	}))
}

/**
 * 
 * @param {import('ol').Map} mapObject 
 * @param {import("../Applications/Applications").locationsType} locations 
 * @param {HTMLButtonElement | null} anchorEl 
 * @param {Dispatch<SetStateAction<HTMLButtonElement | null>>} setAnchorEl 
 * @param {React.MutableRefObject<Component>} popoverRef 
 */
export const AddOverlays = (mapObject, locations, anchorEl, setAnchorEl, popoverRef) => {
	const popup = new Overlay({
		element: popoverRef.current, // document.getElementById('popup'),
		positioning: 'center-center',
		stopEvent: false,
	});
	mapObject.addOverlay(popup);


	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */	//React.MouseEvent<HTMLButtonElement>
	const handleClick = (event) => {
		console.log("EVENT")
		setAnchorEl(null)
		const feature = mapObject.getFeaturesAtPixel(event.pixel)[0];
		if (!feature)
			{ return }
		const coordinate = feature.getGeometry().getCoordinates();
		popup.setPosition(coordinate)
		console.log(coordinate)
		setAnchorEl(popup.getElement());
	};

	/** @param event {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} */
	const handleClose = (event) => {
		setAnchorEl(null);
		const type = mapObject.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
		mapObject.getViewport().style.cursor = type;
	};

	mapObject.on('click', handleClick);
	mapObject.on('pointermove', handleClose);
}

export const LocationPopover = ({ mapObject, id, anchorEl, setAnchorEl, handleClose, formState, setFormState }) => {
	console.log('MAP', mapObject)
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
			<FormControlLabel label={<font size='+2'>Bharti</font>} sx={{p: 2}} control={
				<Checkbox name="bharti" defaultChecked
					// onChange={(event) => this.setChecked(!this.checked)}
				/>
			} />
			<Button type="reset" onClick={() => {setAnchorEl(null)}}>CLOSE</Button>
		</Popover>
	)
}