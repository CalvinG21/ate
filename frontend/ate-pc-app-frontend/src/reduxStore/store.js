import { configureStore } from "@reduxjs/toolkit";
import ateReducer from "./ateSlice";
// The configureStore function will automatically set up an empty store for you
// with the relevant settings you will need in the future.

export default configureStore({
    reducer: {
        ate: ateReducer,
    },
});

/* GLOBAL STATE for the application, all components have access to this global state! */
