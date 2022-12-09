import axios from 'axios'

// Server node
const url = 'http://localhost:5000/graphs'

// Link Server node using axios
export const fetchData = (GraphProperties) => axios.post(url, GraphProperties)