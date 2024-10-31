import { configureStore } from "@reduxjs/toolkit";
import tasksreducer from './slice/taskSlice'

export const store = configureStore({
    reducer:{
        tasks:tasksreducer,
    }
})