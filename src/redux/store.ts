import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import staffReducer from './reducers/staff'
import reportReducer from './reducers/report'

export const store = configureStore({
    reducer: {
        user: userReducer,
        staff: staffReducer,
        report: reportReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch