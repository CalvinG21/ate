import React, { useState, useEffect } from 'react';
import { Container, Col,Row } from 'react-bootstrap';
import TestRunner from './TestRunner';
import io from 'socket.io-client';
import { Button, Table } from 'react-bootstrap';
import {  useDispatch } from "react-redux";
import { setUsbAteTestResults } from "../reduxStore/ateSlice";
import { setDutAteModeStatus } from "../reduxStore/ateSlice";



const socket = io('http://localhost:3001');
//192.168.1.124
let Home=()=>{
    const [serialData, setSerialData] = useState('');
    const dispatch=useDispatch();

    useEffect(() => {
        console.log("boooom")
        // Listen for serial data from the bacckend server
        socket.on('serialData', (data) => {
            setSerialData(data);
            dispatch(setUsbAteTestResults({result:data}))
        });
        
        socket.on('dutAteMode', (data) => {
           console.log("ws rx 'dutAteMode' : "+data)
            dispatch(setDutAteModeStatus({status:true}))
        });

        // Cleanup on unmount
        return () => {
        //socket.disconnect();
        };
    }, []); // Empty dependency array to run the effect only once
    return(<>
        <Container className='mt-5'>
            <Row className='mt-5'>
               <Col md={{ span: 4, offset: 4 }}>
                        <h1>ATE PC App</h1>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={{ span: 8, offset: 2 }}>
                    <TestRunner></TestRunner>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={{ span: 8, offset: 2 }}>
                    <h3>Debug Serial Rx : {serialData}</h3>
                    <Button onClick={()=>{setSerialData('')}} >
                        reset
                    </Button>
                </Col>
                 
            </Row>
        </Container>
    </>)
}

export default Home;
