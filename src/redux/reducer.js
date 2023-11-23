import { createSlice } from '@reduxjs/toolkit'

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        access_token: "",
        common_color: {
            BACKGROUND_COLOR: "#f0f2f5",
            TEXT_COLOR: "#fff",
            TEXT_LIGHT_COLOR: "#7b809a",
        },
        notification_msg: "",
        notification_color: "",
        notification_status: false,
        loading: false,
    },


    reducers: {
        setAccessToken: (state, action) => {
            state.access_token = action.payload
        },
        setLightTheme: (state, action) => {
            state.common_color = {
                BACKGROUND_COLOR: "#f0f2f5",
                TEXT_COLOR: "#000",
                TEXT_LIGHT_COLOR: "#7b809a"
            }
        },
        setDarkTheme: (state, action) => {
            state.common_color = {
                BACKGROUND_COLOR: "#1a2035",
                TEXT_COLOR: "#ffffff",
                TEXT_LIGHT_COLOR: "#ffffffcc"
            }
        },
        setNotification: (state, action) => {
            state.notification_color = action.payload.color
            state.notification_msg = action.payload.msg
            state.notification_status = action.payload.status
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

    },
})

export const {
    setLightTheme, setDarkTheme, setNotification, setLoading, setAccessToken
} = commonSlice.actions

export default commonSlice.reducer
