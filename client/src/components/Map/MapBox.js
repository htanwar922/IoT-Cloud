import { createContext, useRef, useState, useEffect } from "react";
import { Map, View } from "ol";
import OSM from 'ol/source/OSM';
// import XYZ from "ol/source/XYZ";
import TileLayer from 'ol/layer/Tile';
import {
	DragRotateAndZoom,
	defaults as defaultInteractions,
} from 'ol/interaction';
import { fromLonLat } from "ol/proj";

import useStyles from './styles'

const MapContext = new createContext();

const MapContainer = ({ center, zoom }) => {
	return (
		<MapBox center={fromLonLat(center)} zoom={zoom}>
			{/* <TileLayer source={new OSM()} zIndex={0} /> */}
			{/* https://github.com/mbrown3321/openlayers-react-map/blob/master/src/Layers/TileLayer.js */}
		</MapBox>
	);
};

const MapBox = ({ children, zoom, center }) => {
	const classes = useStyles()
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	// on component mount
	useEffect(() => {
		let mapObject = new Map({
			interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			target: 'map',
			view: new View({
				center: center,
				zoom: zoom,
			}),
			// controls: [],
			// overlays: []
		});
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);
		return () => mapObject.setTarget(undefined);
	}, [center, zoom]);

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
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className={classes.olMap}>
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default MapContainer;

// https://www.openstreetmap.org/way/283148869#map=19/28.54513/77.18959


// import mapImage from '../../images/IITD-Map.jpg'
// const MapImage = () => {
// 	return (
// 		<img src={mapImage} alt='IITD Map' maxWidth='lg' />
// 	)
// }

// const MapBox1 = () => {
// 	const map = new Map({
// 		interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
// 		layers: [
// 			new TileLayer({
// 				source: new OSM(),
// 				// source: new XYZ({
// 				// 	url: 'https://www.openstreetmap.org/way/283148869#map=19/28.54513/77.18959'
// 				// })
// 			}),
// 		],
// 		target: 'map',
// 		view: new View({
// 			center: [0, 0],
// 			zoom: 2,
// 		}),
// 	});
// }