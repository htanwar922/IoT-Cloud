import { makeStyles } from "@mui/styles"

// Create styles
export default makeStyles(() => ({
	overlay: {
		position: 'absolute',
		// top: '10px',
		// right: '20px',
		width: 10,
		height: 30,
		color: 'black',
		backgroundColor: 'white',
		transform: `translate(1020px, -200px)`,
	},
	graphContainer: {
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
}))
