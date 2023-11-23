import { NOTIFICATION_COLOUR } from "lib/Constants"
import { REQUEST_METHOD } from "lib/Constants"
import { fetchApi } from "lib/Utils"
import { onSetNotification } from "redux/action"
import { setLoading } from "redux/reducer"
import { setCodeList, setCodeListLibrary, setMappingLibraryList, setMessageSpecialHandling, setProfileSetupList, setRuleSetupList, setSpecialHandlingManagementList } from "./reducer"
import { RESPONSE_TYPE } from "lib/Constants"
import { PAGE_SIZE } from "lib/Constants"

export const getSpecialHandlingManagementList = (accessToken, page = 1) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/special-handling-management/?page=${page}`,
            accessToken,
            REQUEST_METHOD.GET,
            (successResponse) => {
                dispatch(setSpecialHandlingManagementList(successResponse))
                // dispatch(setLoading(false));
            },
            (error) => {
                // dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }
        )
    }
}

export const getMessageSpecialHandling = (accessToken, page = 1) => {
    // var moduleType = module_type ? `?module_type=${module_type}&` : "?"
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/message-special-handling/?page=${page}`,
            accessToken,
            REQUEST_METHOD.GET,
            (successResponse) => {
                dispatch(setMessageSpecialHandling(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }
        )
    }
}

export const getCodeListLibrary = (accessToken, body = { "page": 1, "page_size": PAGE_SIZE }) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/list_library/list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setCodeListLibrary(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const getCodeList = (accessToken, body = { "page": 1, "page_size": PAGE_SIZE }) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/code_list/list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setCodeList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const getProfileSetupList = (accessToken, body = { "page": 1, "page_size": PAGE_SIZE }) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/partner/setup/list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setProfileSetupList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const getRuleSetupList = (accessToken) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-rules/`,
            accessToken,
            REQUEST_METHOD.GET,
            (successResponse) => {
                dispatch(setRuleSetupList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }
        )
    }
}
export const getMappingLibraryList = (accessToken, map_id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-library/?map_rule=${map_id}`,
            accessToken,
            REQUEST_METHOD.GET,
            (successResponse) => {
                dispatch(setMappingLibraryList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }
        )
    }
}

export const onCreateSpecialHandlingManagement = (accessToken, body) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/special-handling-management/`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Special Handling Management Created Successfully", true))
                dispatch(getSpecialHandlingManagementList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onCreateMessageSpecialHandling = (accessToken, body) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/message-special-handling/`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Special Handling Created Successfully", true))
                dispatch(getMessageSpecialHandling(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onCreateCodelist = (accessToken, body) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/code_list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Codelist Created Successfully", true))
                dispatch(getCodeList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onCreateCodelistLibrary = (accessToken, body, code_id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/list_library`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Codelist Library Created Successfully", true))
                dispatch(getCodeListLibrary(accessToken, { "page": 1, "page_size": PAGE_SIZE, "conversion_list_id": code_id }));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onCreateMappingLibrary = (accessToken, body) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-library/`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Library Created Successfully", true))
                dispatch(getMappingLibraryList(accessToken, body.map_rule));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onCreateProfileSetup = (accessToken, body, navigate) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/partner/setup`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Profile Created Successfully", true))
                navigate("/profile-setup");
                getProfileSetupList(accessToken);
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onCreateRuleSetup = (accessToken, body, navigate) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-rules/`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Rule Created Successfully", true))
                dispatch(getRuleSetupList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onEditCodelistLibrary = (accessToken, body, id, code_id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/list_library/${id}`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Codelist Updated Successfully", true))
                dispatch(getCodeListLibrary(accessToken, { "page": 1, "page_size": PAGE_SIZE, "conversion_list_id": code_id }));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onEditRuleSetup = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-rules/${id}/`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Rule Updated Successfully", true))
                dispatch(getRuleSetupList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onEditMapping = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-library/${id}/`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Library Updated Successfully", true))
                dispatch(getMappingLibraryList(accessToken, body.map_rule));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onUpdateCodelist = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/code_list/${id}`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Profile Updated Successfully", true))
                dispatch(getCodeList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}


export const onUpdateProfileSetup = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/partner/setup/${id}`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Profile Updated Successfully", true))
                dispatch(getProfileSetupList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onUpdateMessageSpecialHandling = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/message-special-handling/${id}/`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Special Handling Updated Successfully", true))
                dispatch(getMessageSpecialHandling(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const onUpdateSpecialHandlingManagement = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/message-special-handling/${id}/`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Special Handling Management Updated Successfully", true))
                dispatch(getSpecialHandlingManagementList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const deleteProfileSetup = (accessToken, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/partner/setup/${id}`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Profile Deleted Successfully", true))
                dispatch(getProfileSetupList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}

export const deleteRuleSetup = (accessToken, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-rules/${id}/`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Rule Deleted Successfully", true))
                dispatch(getRuleSetupList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}

export const deleteMapping = (accessToken, id, map_id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/map-library/${id}/`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Library Deleted Successfully", true))
                dispatch(getMappingLibraryList(accessToken, map_id));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}

export const deleteCodeList = (accessToken, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/code_list/${id}`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Codelist Deleted Successfully", true))
                dispatch(getCodeList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}

export const deleteCodeListLibrary = (accessToken, id, code_id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/conversion/list_library/${id}`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Codelist Library Deleted Successfully", true))
                dispatch(getCodeListLibrary(accessToken, { "page": 1, "page_size": PAGE_SIZE, "conversion_list_id": code_id }));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}

export const deleteMessageSpecialHandling = (accessToken, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/message-special-handling/${id}/`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Special Handling Deleted Successfully", true))
                dispatch(getMessageSpecialHandling(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}

export const deleteSpecialHandlingManagement = (accessToken, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/special-handling-management/${id}/`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Special Handling Management Deleted Successfully", true))
                dispatch(getSpecialHandlingManagementList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}