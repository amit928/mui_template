import { createSlice } from '@reduxjs/toolkit'

export const master = createSlice({
    name: 'master',
    initialState: {
        userList: {},
        roleList: {},
        privilegeList: {}
    },
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload
        },

        setRoleList: (state, action) => {
            state.roleList = action.payload
        },

        setPrivilegeList: (state, action) => {
            state.privilegeList = action.payload
        },
    },
})

export const {
    setUserList, setRoleList, setPrivilegeList
} = master.actions

export default master.reducer