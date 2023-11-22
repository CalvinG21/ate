let express =require('express');
let app=express();
const cors = require('cors');
let ateCommsRouter=require('./routes/ateCommandRoutes')
const http = require('http');
const serialDebugFlags=require('./rdkSerialFlags');
const path = require('path');
const serialPortManager = require('./serialPortSingleton');//new SerialPort({ path: 'COM3', baudRate: 115200 })
const port=serialPortManager.serialPort;

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', //Currently only accpet web socket conns from localHost,  Use "*" to accept web socket connections from all ip domains 
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());//

app.use(cors());// Enable CORS for all routes
//security feature in web browsers called Cross-Origin Resource Sharing (CORS). 
//CORS is a security feature implemented by web browsers to prevent unauthorized web pages from making requests to a different domain than the one that served the web page.
//To resolve this issue, you need to enable CORS on your server

// Use the ateCommsRouter will handlde all routes that have url path that begins with '/ateCommand'
app.use('/ateCommand', ateCommsRouter);

console.log(__dirname);
let frontendPath = path.join(__dirname, 'build');
console.log(frontendPath);
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
    console.log("hava hava");
});


console.log("serialDebugFlags.rdkBootUp0"+serialDebugFlags.flags.rdkBootUp0)
// Listen for serial data and emit it to the connected clients
serialPortManager.parser1.on('data', (data) => {
  //console.log('Received serial data:', data);
  
  if (data.includes(serialDebugFlags.flags.rdkBootUp1)) {
      console.log('Data contains rdk boot up debug 1');
  }

  else if (data.includes(serialDebugFlags.flags.rdkBootUp0)) {
      console.log('Data contains rdk boot up debug 0');
  }

  else if (data.includes(serialDebugFlags.flags.rdkBootUp2)) {
      console.log('Data contains rdk boot up debug 2');
  }
  // Check if data contains a certain strings to detect state of the board and ate test results
  else if (data.includes(serialDebugFlags.flags.ateUsbTestResult)) {
      console.log('Data contains ate usb result');
      if (io.sockets.sockets.size > 0) {
        console.log('ws tx data');
        // Send data for route1 to connected clients
        io.emit('serialData', data);
      } else {
        console.log('No connected clients');
      }
  }
  else if (data.includes(serialDebugFlags.flags.ateModeInProg)) {
      console.log('Data contains ATE Mode In Progress');
      if (io.sockets.sockets.size > 0) {
        console.log('ws tx data');
        // Send data for route1 to connected clients
        io.emit('dutAteMode', data);
      } else {
        console.log('No connected clients');
      }
  }

});


    // Event listener for errors
serialPortManager.serialPort.on('error', (err) => {
  // Handle the "Access denied" error
  if (err.message.includes('Access denied')) {
    let displayErr="Error: Access denied. Make sure you have the necessary permissions.'";
      console.error(displayErr);
      if (io.sockets.sockets.size > 0) {
        console.log('ws tx data');
        // Send data for route1 to connected clients
        io.emit('serialPortAccessDenied', displayErr);
      } 
      else {
        console.log('No connected clients');
      }
      // You can add additional handling logic or exit the application here if needed.
  } 
  else {
    // Handle other types of errors
    console.error('Serial port error:', err.message);
    if (io.sockets.sockets.size > 0) {
      console.log('ws tx data');
      // Send data for route1 to connected clients
      io.emit('serialPortError', err.message);
    } 
    else {
      console.log('No connected clients');
    }
  }
});


// Event listener for open (optional, you can perform actions when the port is opened)
serialPortManager.serialPort.on('open', () => {
    console.log('Serial port opened successfully.');
    if (io.sockets.sockets.size > 0) {
       console.log('ws tx data');
       // Send data for route1 to connected clients
       io.emit('serialPortOpen', 'Serial port opened successfully.');
     } 
     else {
       console.log('No connected clients');
     }
});

// Event listener for close (optional, you can perform actions when the port is closed)
serialPortManager.serialPort.on('close', () => {
    console.log('Serial port closed.');
    if (io.sockets.sockets.size > 0) {
      console.log('ws tx data');
      // Send data for route1 to connected clients
      io.emit('serialPortClose', 'Serial port closed.');
    } 
    else {
      console.log('No connected clients');
    }
});

// Event listener for disconnect (optional, you can perform actions when the port is disconnected)
serialPortManager.serialPort.on('disconnect', () => {
    console.log('Serial port disconnected.');
    if (io.sockets.sockets.size > 0) {
      console.log('ws tx data');
      // Send data for route1 to connected clients
      io.emit('serialPortDisconnected', 'Serial port disconnected.');
    } 
    else {
      console.log('No connected clients');
    }
});

// setTimeout(()=>{
//     serialPortManager.serialPort.open();
// },30000)



// Listen on all available network interfaces
const PORT = process.env.PORT || 3001;
const HOST = '192.168.1.101';

server.listen(PORT, () => {
  console.log('Server running on http://localhost:'+PORT);
});
