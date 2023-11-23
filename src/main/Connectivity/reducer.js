import { createSlice } from '@reduxjs/toolkit'

export const connectivity = createSlice({
    name: 'master',
    initialState: {
        setupList: {},
    },
    reducers: {
        setSetupList: (state, action) => {
            state.setupList = action.payload
        },
    },
})

export const {
    setSetupList
} = connectivity.actions

export default connectivity.reducer