# Client App

## Create template app
`$ npx create-react-app . `
Clear out src folder - `cd src && rm -r *`

## Reconfigure dependencies in `package.json`
	"@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@mui/material": "^5.10.6",
    "@mui/styles": "^5.10.6",
    "@testing-library/react": "^11.1.0",
    "react": "^17.0.0",
    "react-dom": "^17.0.0",
    "react-native": "^0.68.5",
    "react-native-web": "^0.18.10",
    "react-router-dom": "^6.4.3",
    "react-router-native": "^6.4.3",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"

# Steps
Create React App in client folder
Clear out src. Create App.js and index.js
Render App to root element in index.js
Define App in App.js
Created tree:
	src
	|-- components
	|	|-- Form
	|	|-- Posts
	|	|	|-- Post
Created several style.js which will use @mui/styles for styling instead of css
