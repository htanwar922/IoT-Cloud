import { networkInterfaces } from 'os'
import { connect, connections } from 'mongoose'

const nets = networkInterfaces();
const ip_address = {} //Object.create(null);
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!ip_address[name]) {
                ip_address[name] = [];
            }
            ip_address[name].push(net.address);
        }
    }
}
console.log(ip_address)

export const hostname = ip_address['eth0'] // '10.17.10.11';
export const port = 5000;
export const uri = 'mongodb://localhost:27017';
export const databaseName ='APMDjs'
export const collectionName = "collection";

const err = await connect(uri + '/' + databaseName).then(() => {
        console.log("Database Connection Successful");
    }).catch((error) => {
        console.log(error);
    });
export var conn = connections[0]; // mongoose.connection - default

conn.on('connected', function() {
        console.log('Database connected');
    });
conn.on('disconnected', function(){
        console.log('Database disconnected');
    })
conn.on('error', (error) => {
        console('Database connection error: ' + error)
    });   // console.error.bind(console, 'connection error:' + error)
