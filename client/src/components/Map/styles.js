import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
	olMap: {
		// minWidth: 600,	// 1300
		// minHeight: 500,	// 800
		margin: 50,
		width: '200vh',
		height: '200vh',
		maxWidth: '120vh',	// 1300
		maxHeight: '80vh',	// 800
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