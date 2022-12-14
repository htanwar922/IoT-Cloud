import { networkInterfaces } from 'os'
import { createConnection } from 'mongoose'

import ApplicationList from '../config/Applications.js';

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

export const hostname = ip_address['eth0'] ? ip_address['eth0'] : ip_address[Object.keys(ip_address)[0]]
export const port = 5000;
export const uri = 'mongodb://localhost:27017';

ApplicationList.forEach(async application => {
    // const err = await connect(`${uri}/${databaseName}`).then(() => {
    //         console.log("Database Connection Successful");
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    var conn = createConnection(`${uri}/${application.databaseName}`)
    conn.on('connected', function() {
            console.log(`${application.databaseName} database connected`);
        });
    conn.on('disconnected', function(){
            console.log(`${application.databaseName} database disconnected`);
        })
    conn.on('error', (error) => {
            console(`${application.databaseName} database connection error: ${error}`)
        });
    application.connection = conn
});
console.log("HERE")