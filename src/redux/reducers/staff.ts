import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userData } from './user'
import { TaskStatusKey } from '../../config/reportStatus'

export type countStaffTask = {
  assignedTasks: number,
  completedTasks: number
}

export type taskType = {
    id: string,
    report_id: string,
    assigned_by: string,
    task_details: string,
    status: TaskStatusKey,
    created_at: string,
    updated_at: string,
    report: {
        id: string,
        name: string,
        details: string,
        status: TaskStatusKey,
        attachment_paths: string[],
        lat: number,
        lng: number,
        user_id: string,
        created_at: string,
        updated_at: string,
        user: {
            id: string,
            username: string,
            phone_number: string | null,
            email: string | null,
            address: string | null,
            city: string | null,
            state: string | null,
            postal_code: string | null,
            country: string | null,
            profilepic: string | null,
            created_at: string,
            updated_at: string
        }
    },
    assignedBy: {
        id: string,
        username: string,
        phone_number: string | null,
        address: string | null,
        city: string | null,
        state: string | null,
        postal_code: string | null,
        country: string | null,
        profilepic: string | null,
        created_at: string,
        updated_at: string
    }
}

export interface StaffState {
    staff: userData['user'],
    isAuth: boolean,
    isSharedLocation: boolean,
    otherStaffLocation: { staffId: string, lat: number, lng: number }[]
    newTask: taskType
}

const initialState: StaffState = {
    staff: {} as userData['user'],
    isAuth: false,
    isSharedLocation: false,
    otherStaffLocation: [] as { staffId: string, lat: number, lng: number }[],
    newTask: {} as taskType
}

export const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        setStaff: (state, action: PayloadAction<userData['user']>) => {
            state.staff = action.payload
        },

        setStaffAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },

        setStateUpdatePassword: (state, action: PayloadAction<boolean>) => { // false => Not new user => No update password
            state.staff.is_new_user = action.payload
        },

        addOtherStaffLocation: (state, action: PayloadAction<{ staffId: string, lat: number, lng: number }>) => {
            const { staffId, lat, lng } = action.payload

            if (staffId === state.staff.id) return

            const existing = state.otherStaffLocation.find(s => s.staffId === staffId)

            if (existing) {
                existing.lat = lat
                existing.lng = lng
            } else {
                state.otherStaffLocation.push({ staffId, lat, lng })
            }
        },

        setNewTask: (state, action: PayloadAction<taskType>) => {
            state.newTask = action.payload
        },

        removeTask: (state) => {
            state.newTask = {} as taskType
        }

    },
})

// Action creators are generated for each case reducer function
export const { setStaff, setStaffAuth, setStateUpdatePassword, addOtherStaffLocation, setNewTask, removeTask } = staffSlice.actions

export default staffSlice.reducer