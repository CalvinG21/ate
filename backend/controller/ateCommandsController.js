const serialPortManager = require('../serialPortSingleton');//new SerialPort({ path: 'COM3', baudRate: 115200 })

const fs = require('fs');

let sendSerialData= async(command)=>{
    console.log("*** sendSerialData() : "+command)
     try {
        let binaryData = null;

            switch (command) {
                case 1:
                    binaryData=fs.readFileSync('bins/usbCountCmd.bin')
                    break;
                case 2:
                    binaryData=fs.readFileSync('bins/volume.bin')
                    break;
                default:
                    break;
        }

         return new Promise((resolve, reject) => {
             
             serialPortManager.serialPort.write(binaryData, (err) => {
                 if (err) {
                     console.log("err : "+JSON.stringify(err))
                     reject(err);
                 } else {
                     console.log("so far so good")
                     resolve();
                 }
             });
            
         });

     } catch (error) {
         console.log("err sendSerialData() : "+JSON.stringify(error))
     }      
 
}

let enterAteMode=async()=>{
    console.log("**** enterAteMode()")
    try {
        return new Promise((resolve, reject) => {
            serialPortManager.serialPort.write("/usr/sbin/rdk-factory-pcb-testapp-launch.sh \n", (err) => {
                if (err) {
                    console.log("err : "+JSON.stringify(err))
                    reject(err);
                } else {
                    console.log("wrote serial command to enter ate mode!!!")
                    resolve();
                }
            });
               
        });
    } 
    catch (error) {
         console.log("err enterAteMode() : "+JSON.stringify(error))
    }
}

// Exporting the functions
module.exports = {
  sendSerialData,
  enterAteMode
};
