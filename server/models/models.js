import { model, Schema } from 'mongoose'
import dayjs from 'dayjs'

import { collectionName } from '../config/connection.js'

// https://mongoosejs.com/docs/index.html : Getting Started
const APMDSchema = new Schema({
		Timestamp: Date,		// Object
		Temperature: Number,
		Humidity: Number,
		NO2: Number,
		OX: Number,
		CO: Number,
		SO2: Number,
		H2S: Number,
		NO: Number,
		PM_1: Number,
		'PM_2&period;5': Number,
		PM_10: Number
	}, {
		// If not existing, don't creates the indexes defined in the model's schema above
		autoIndex: false,

		// If false and if not connecting, return errors immediately rather than waiting for reconnect
		bufferCommands: true,  // Make sure you `await mongoose.connect()` if you have `bufferCommands = false`.
		bufferTimeoutMS: 10000,

		// The collection name to use.
		// If not set, the model name is used by default.
		// If passed from model parameters, is overridden.
		collection: collectionName
})

export function dbCollection(collection = collectionName) {
	return model('Test', APMDSchema, collection);
}

var dateIST = dayjs('Jun 16 2022 20:30:00.000 GMT+0530 (India Standard Time)', 'MMM D YYYY HH:mm:ss.SSS')
console.log(dateIST.toString())
const doc = await dbCollection().find({ Timestamp: { $lte: dateIST.toISOString() } });
console.log(doc);