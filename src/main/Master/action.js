import { NOTIFICATION_COLOUR } from "lib/Constants"
import { REQUEST_METHOD } from "lib/Constants"
import { fetchApi } from "lib/Utils"
import { onSetNotification } from "redux/action"
import { setLoading } from "redux/reducer"
import { setPrivilegeList, setRoleList, setUserList } from "./reducer"
import { RESPONSE_TYPE } from "lib/Constants"
import { PAGE_SIZE } from "lib/Constants"



export const getUserList = (accessToken, body = { "page": 1, "page_size": PAGE_SIZE }) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/v1/user/list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setUserList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const getRoleList = (accessToken, body = { "page": 1, "page_size": PAGE_SIZE, "include_privilege_data": true }) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/acl/role/list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setRoleList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}


export const getPrivilageList = (accessToken, body = {}) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/acl/privilege/list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setPrivilegeList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const createUser = (accessToken, body, navigate) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/v1/user`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "User Created Successfully", true))
                dispatch(getUserList(accessToken));
                dispatch(setLoading(false));
                navigate("/user-management")
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const createRole = (accessToken, body, navigate) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/acl/role`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Role Created Successfully", true))
                dispatch(getRoleList(accessToken));
                dispatch(setLoading(false));
                navigate("/role-management")
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const updateRole = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/acl/role/${id}`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Role Updated Successfully", true))
                dispatch(getRoleList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const updateUser = (accessToken, body, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/v1/user/${id}`,
            accessToken,
            REQUEST_METHOD.PUT,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "User Updated Successfully", true))
                dispatch(getUserList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}

export const deleteRole = (accessToken, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/acl/role/${id}`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Role Deleted Successfully", true))
                dispatch(getRoleList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}

export const deleteUser = (accessToken, id) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/v1/user/${id}`,
            accessToken,
            REQUEST_METHOD.DELETE,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "User Deleted Successfully", true))
                dispatch(getUserList(accessToken));
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, null, true, RESPONSE_TYPE.NULL
        )
    }
}