import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import staffReducer from './reducers/staff'
import reportReducer from './reducers/report'
import currentLocationReducer from './reducers/currentStaffLocation'

export const store = configureStore({
    reducer: {
        user: userReducer,
        staff: staffReducer,
        report: reportReducer,
        currentLocation: currentLocationReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch