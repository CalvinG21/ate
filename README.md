# Getting Started with development 
Follow the steps below are to be executed in your pc terminal, to build and run the ATE PC App:

    1.	Navigate to the project directory: `ATE_PC_APP_Vx `
    2.	Install frontend dependencies: `cd frontend && npm install`
    3.	Install backend dependencies: `cd ../backend7&& npm install`
    4.	Start the development server:
    5.	For the frontend: `cd client && npm start`
    6.	For the backend: `cd server && node app.js

# Running in production
Update Code to handle serial port name of your pc.
If you using linux please ensure serial comms port ids and paths are correctly.
If you want to expree server accessible to network then ensure IP addresses used in code are correct from backend to frontend.

To run app in production:

    1.Navigate to ate-pc-app-frontend folder and run 'npm run build' to Build React Source 
    2.Serve React build files for home route request on Express server.

In development you can launch the front end from react server or use express to serve up react build files.
 