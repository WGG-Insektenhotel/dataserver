const path = require('path')
const { SerialPort, ReadlineParser } = require('serialport')
const { initializeApp } = require('firebase/app')
const { getDatabase, ref, set, enableLogging } = require("firebase/database")

require('dotenv').config()

// .env constants
const port = Number(process.env.WS_PORT) || 80
const serialPortPath = process.env.ARDUINO_PORT || 'COM1'

// firebase
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID
}

initializeApp(firebaseConfig)

const database = getDatabase()

enableLogging(true);

// serialport reader
const serialPort = new SerialPort({
    path: serialPortPath,
    baudRate: 9600 
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

serialPort.on("open", () => {
    console.log('serial port open');
});

parser.on('data', data =>{
    console.log(data)
    set(ref(database), data);
});
