/**
 * _Applications list._
 * @typedef {{
 * 		name: String,
 * 		alias: String,
 * 		parameters: [String],
 * 		options: [String],
 * 		databaseName: String,
 * 		collectionName: String,
 * 		connection: import("mongoose").Connection,
 * 		schema: import("mongoose").Schema
 *	}} applicationType
 *
 * @type {[applicationType]}  
 */
var ApplicationList = [
	{
		name: 'Air Pollution Monitoring Devices',
		alias: 'APMD',
		parameters: ['Temperature', 'Humidity', 'NO2', 'OX', 'CO', 'SO2', 'H2S', 'NO', 'PM_1', 'PM_2&period;5', 'PM_10'],
		options: [],
		databaseName: 'APMDjs',
		collectionName: 'collection',
		connection: null,
		schema: null
	},
	{
		name: 'Smart Meters',
		alias: 'SM',
		parameters: [
			"Energy", "Frequency",
			"AppPower (R)", "Power (R)", "PF (R)", "Voltage (R)", "Current (R)",
			"AppPower (Y)", "Power (Y)", "PF (Y)", "Voltage (Y)", "Current (Y)",
			"AppPower (B)", "Power (B)", "PF (B)", "Voltage (B)", "Current (B)",
		],
		options: ['Original', 'Reconstructed'],
		databaseName: 'SmartMeters',
		collectionName: 'collection',
		connection: null,
		schema: null
	}
]

export default ApplicationList