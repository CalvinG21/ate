import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import {Col,Row } from 'react-bootstrap';
import InfoCard from './InfoCard';
import { useSelector, useDispatch } from "react-redux";
import { setDutAteModeStatus } from "../reduxStore/ateSlice";

let testData=[
   {testId:0,testName:'USB Count',testDesc:'Gets how many USB devices are connected to the DUT',result:'Not Run',resultData:'N/A'},
   {testId:1,testName:'Get Ip Address',testDesc:'Gets the Ip adress of DUT',result:'Not Run',resultData:'N/A'},
   {testId:2,testName:'Set Volume',testDesc:'Sets the volume of the DUT to default value',result:'Not Run',resultData:'N/A'},
   {testId:3,testName:'Get Mac Adress',testDesc:'Gets the Mac adress of DUT',result:'Not Run',resultData:'N/A'},
]


const TestRunner = () => {
const [testResults, setTestResults] = useState([]);
const [isTesting, setIsTesting] = useState(false);

let ateMode = useSelector((state) => state.ate.dutAteModeStatus);
let usbAteTestResult = useSelector((state) => state.ate.ateTestResults.usb);


const dispatch = useDispatch();

  useEffect(() => {
    setTestResults(testData)
  }, []);

  useEffect(() => {
    
    if(usbAteTestResult!=null)
    {
      setTestResults((prevState)=>{
        prevState[0].result='Pass';
        prevState[0].resultData=usbAteTestResult;
        return prevState 
      })
    }
      
  }, [usbAteTestResult]);

  const startTests = async () => {
    try {
      // Make an API request to start the tests
      setIsTesting(true);
      //192.168.1.101
      const response = await fetch('http://localhost:3001/ateCommand/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Test started:', data);
    } catch (error) {
      console.error('Error starting tests:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const enterATE = async () => {
    try {
      // Make an API request to the backend to put the board in ate mode
      
      const response = await fetch('http://localhost:3001/ateCommand/ateMode', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include any additional data needed for starting tests in the body
        //body: JSON.stringify({}),
      });

      const data = await response.json();
      console.log('enterATE:', data);
      //dispatch(setDutAteModeStatus({status:true}))
    } catch (error) {
      console.error('Error enterATE:', error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div>
        <Row className='mt-5'>
                <Col md={{ span: 4, offset: 0 }}>
                    <InfoCard></InfoCard>
                </Col>
            </Row>
            <Row className='mt-1'>
                <Col className='ps-0' md={{ span: 2, offset: 0 }}>
                    <Button onClick={enterATE} variant="secondary">Enter ATE</Button>
                </Col>
            </Row>
       
        <div className='mt-5'>
            
            <Table striped bordered hover  variant="dark">
                <thead>
                <tr>
                    <th>Test Name</th>
                    <th>Test Description</th>
                    <th>Result</th>
                    <th>Result Data</th>
                </tr>
                </thead>
                <tbody>
                {testResults.map((result) => (
                    <tr key={result.testId}>
                        <td>{result.testName}</td>
                        <td>{result.testDesc}</td>
                        <td>{result.result}</td>
                        <td>{result.resultData}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            
        </div>
         <Row>
        <Col md={{ span: 2, offset: 0 }}>
          <Button variant="success" onClick={startTests} disabled={isTesting}>
             {isTesting ? 'Testing in progress...' : 'Start Tests'}
          </Button>
        </Col>
        <Col md={{ span: 2, offset: 0 }}>
             <Button variant="danger"  disabled={isTesting}>
              Stop Tests
            </Button>
        </Col>
      </Row>
     
        {/* <div>
          ateMode:{ ateMode }
        </div> */}
    </div>
  );
};

export default TestRunner;
