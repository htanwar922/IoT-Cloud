import axios from 'axios'

var hostIP = '10.17.50.136'

// Server node
const url = `http://${hostIP}:5000/graphs`

// Link Server node using axios
export const fetchData = (GraphProperties) => axios.post(url, GraphProperties)