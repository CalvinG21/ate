let express =require('express');
let router=express.Router()//this router will only handle routes for ATE commands
let ateController=require('../controller/ateCommandsController')


router.get("/",async (req,res)=>{
    try {
        await ateController.sendSerialData(1);
        res.status(200).json({ data: 'Successfully sent all ATE Commands to board' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error Sending ATE Commands' });
    }
})

router.get("/ateMode",async (req,res)=>{
    try {
        await ateController.enterAteMode();
        res.status(200).json({ data: 'Successfully sent Enter-ATE-Mode serial command' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error Failed To Entered ATE Mode' });
    }
   
})

//export the ATE comms router , so express web server can use it  
module.exports = router;