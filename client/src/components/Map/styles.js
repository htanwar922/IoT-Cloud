import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
	olMap: {
		minHidth: '600px',
		minHeight: '500px',
		margin: '50px',
		height: 800,
		width: 1300,
	},
	olControl: {
		position: 'absolute',
		backgroundColor: `rgba(255,255,255,0.4)`,
		borderRadius: '4px',
		padding: '2px',
	},
	olFullScreen: {
		top: '.5em',
		right: '.5em',
	}
}))