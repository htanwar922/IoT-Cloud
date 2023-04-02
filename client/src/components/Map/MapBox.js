import { createContext, useRef, useState, useEffect, useContext } from "react";
import { Map, Overlay, View } from "ol";
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { defaults as defaultInteractions, DragRotateAndZoom, DragPan, MouseWheelZoom } from 'ol/interaction';
import { fromLonLat } from "ol/proj";
import { platformModifierKeyOnly } from "ol/events/condition";

import useStyles from './styles'
import { AddOverlays, LocationLayer, LocationPopover } from "./Locations";
import { FormContext } from "../Applications/Application/Application";

export const MapContext = createContext();

const MapBox = ({ center, zoom, locations }) => {
	return (
		<MapContainer center={fromLonLat(center)} zoom={zoom} locations={locations}>
			{/* <TileLayer source={new OSM()} zIndex={0} /> */}
			{/* https://github.com/mbrown3321/openlayers-react-map/blob/master/src/Layers/TileLayer.js */}
		</MapContainer>
	);
};

const MapContainer = ({ children, zoom, center, locations }) => {
	const classes = useStyles()
	const mapRef = useRef();
	const popoverRef = useRef();
	const [map, setMap] = useState(null);
	const formContext = useContext(FormContext)
	
	console.log('RENDER')

	// on component mount
	useEffect(() => {
		let mapObject = new Map({
			interactions: defaultInteractions({dragPan: false, mouseWheelZoom: false}).extend([
				new DragRotateAndZoom(),
				new DragPan({
					condition: function (event) {
						return this.getPointerCount() === 2 || platformModifierKeyOnly(event);
					},
				}),
				new MouseWheelZoom({
					condition: platformModifierKeyOnly,
				}),
			]),
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				LocationLayer(locations)
			],
			target: 'map',
			view: new View({
				center: center,
				zoom: zoom,
			}),
			// controls: [],
			overlays: [
				new Overlay({
					element: popoverRef.current, // document.getElementById('popup'),
					positioning: 'center-center',
					stopEvent: false,
					id: 'location-popup'
				})
			]
		});
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);
		AddOverlays(mapObject, formContext)
		return () => mapObject.setTarget(undefined);
	}, [center, zoom, locations, formContext]);

	// zoom change handler
	useEffect(() => {
		if (!map) return;
		map.getView().setZoom(zoom);
	}, [map, zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;
		map.getView().setCenter(center)
	}, [map, center])

	return (
		<MapContext.Provider value={map}>
			<div ref={mapRef} className={classes.olMap}> {/* Container */}
				{children}
			</div>
			<div ref={popoverRef}>
				<LocationPopover
					mapObject={map}
					id={classes.olMap + '-popover'}
					locations={locations}
				></LocationPopover>
			</div>
		</MapContext.Provider>
	)
}

export default MapBox;

// https://www.openstreetmap.org/way/283148869#map=19/28.54513/77.18959