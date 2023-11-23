import { createSlice } from '@reduxjs/toolkit'

export const tradingpartner = createSlice({
    name: 'tradingpartner',
    initialState: {
        profileSetupList: {},
        ruleSetupList: {},
        mappingLibraryList: {},
        codeList: {},
        codeListLibrary: {},
        messageSpecialHandlingList: {},
        specialHandlingManagementList: {}
    },
    reducers: {
        setProfileSetupList: (state, action) => {
            state.profileSetupList = action.payload
        },
        setRuleSetupList: (state, action) => {
            state.ruleSetupList = action.payload
        },
        setMappingLibraryList: (state, action) => {
            state.mappingLibraryList = action.payload
        },
        setCodeList: (state, action) => {
            state.codeList = action.payload
        },
        setCodeListLibrary: (state, action) => {
            state.codeListLibrary = action.payload
        },
        setSpecialHandlingManagementList: (state, action) => {
            state.specialHandlingManagementList = action.payload
        },
        setMessageSpecialHandling: (state, action) => {
            state.messageSpecialHandlingList = action.payload
        },
    },
})

export const {
    setProfileSetupList, setRuleSetupList, setMappingLibraryList, setCodeList, setCodeListLibrary, setMessageSpecialHandling, setSpecialHandlingManagementList
} = tradingpartner.actions

export default tradingpartner.reducer