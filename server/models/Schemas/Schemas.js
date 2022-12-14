import { Schema } from "mongoose";

import ApplicationList from "../../config/Applications.js";

ApplicationList.forEach(application => {
	var schemaTypes = {}
	application.parameters.forEach(param => {
		schemaTypes[param] = Number
	});

	// https://mongoosejs.com/docs/index.html : Getting Started
	application.schema = new Schema({
		Timestamp: Date,
		Location: String,
		...schemaTypes
	}, {
		// If not existing, don't creates the indexes defined in the model's schemaTypes above
		autoIndex: false,

		// If false and if not connecting, return errors immediately rather than waiting for reconnect
		bufferCommands: true,  // Make sure you `await mongoose.connect()` if you have `bufferCommands = false`.
		bufferTimeoutMS: 10000,

		// The collection name to use.
		// If not set, the model name is used by default.
		// If passed from model parameters, is overridden.
		collection: application.collectionName
	})
})