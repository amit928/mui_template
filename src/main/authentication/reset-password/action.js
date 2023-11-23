import { NOTIFICATION_COLOUR } from "lib/Constants"
import { REQUEST_METHOD } from "lib/Constants"
import { fetchApi } from "lib/Utils"
import { onSetNotification } from "redux/action"
import { setLoading } from "redux/reducer"


export const onForgotPassword = (email, onConfirm) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/password/forgot/${email}`,
            null,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, successResponse.message, true))
                onConfirm(true)
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }
        )
    }
}


export const onVerifyOTP = (body, onConfirm) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/password/verify/otp`,
            null,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, successResponse.message, true))
                onConfirm(true)
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}


export const onResetPassword = (body, navigate) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/reset/password`,
            null,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Password Reset Successfully", true))
                navigate("/authentication/sign-in")
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}