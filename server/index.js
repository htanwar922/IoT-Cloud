// import React from 'react'
// import Child from './chart_data';

import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import cors from 'cors'

import { hostname, port } from "./config/connection.js";

import generateGraphRoutes from './routes/createGraph.js'

const app = express();

// serve your css as static
app.use(express.static(__dirname));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));
// app.use(express.query())
app.use(express.raw())
app.use(cors())

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
app.use('/graphs', generateGraphRoutes)

app.put('/update-data', function (req, res) {
  res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
  res.send('DELETE Request');
});

var server = app.listen(port, hostname, () => {
  console.log('Server started on ' + hostname + ':' + port);
});