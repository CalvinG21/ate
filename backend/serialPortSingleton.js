const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM3', baudRate: 115200 })//'/dev/ttyUSB0'
const parser = new ReadlineParser()




// Event listener for open (optional, you can perform actions when the port is opened)
port.on('open', () => {
  console.log('Serial port opened successfully.');
});
class SerialPortSingleton {
  constructor() {
    if (!SerialPortSingleton.instance) {
      // Create a new instance of the serial port object
      this.serialPort = port;
      this.parser1 = port.pipe(parser);

      // Ensure that only one instance is created
      SerialPortSingleton.instance = this;
    }

    return SerialPortSingleton.instance;
  }

  // Other methods related to the serial port can be added here
}



module.exports = new SerialPortSingleton();
