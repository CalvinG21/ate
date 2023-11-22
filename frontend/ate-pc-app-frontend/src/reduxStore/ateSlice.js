import { createSlice } from "@reduxjs/toolkit";
export const ateSlice = createSlice({
// This is the name of the slice of state that we will implement in our
// empty store.
name: "ate",
// This is the initial state for your slice of state. This can be
// anything from an empty array or other data structure that your
// application requires to avoid prop drilling.
// For this example, we use a number.
initialState: {
    dutAteModeStatus: false,
    ateTestResults:{
        usb:null,
        volume:null,
        ipAdress:null,
        macAdress:null
    }
},
// As indicated before. The reducer is used to manipulate the initial
// state or current state.
reducers: {

    setDutAteModeStatus: (state, action) => {
        state.dutAteModeStatus += action.payload.status;
    },
     setUsbAteTestResults: (state, action) => {
        state.ateTestResults.usb = action.payload.result;
    },
},
});
// Action creators are generated for each case reducer function.
export const { setDutAteModeStatus,setUsbAteTestResults
} =
ateSlice.actions;
// Exporting the reducer function we will implement into our empty
//store, previously created.
export default ateSlice.reducer;