const path = require('path')
const { SerialPort, ReadlineParser } = require('serialport')
const pushData = require('./pushData')

require('dotenv').config()

// .env constants
const port = Number(process.env.WS_PORT) || 80
const serialPortPath = process.env.ARDUINO_PORT || 'COM1'

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
    data = JSON.parse(data)
    process.stdout.write("Test: " + Math.random);
    pushData(data)
});
