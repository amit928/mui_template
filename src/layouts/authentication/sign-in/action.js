import { NOTIFICATION_COLOUR } from "lib/Constants"
import { REQUEST_METHOD } from "lib/Constants"
import { setUserDataToStorage } from "lib/Utils"
import { fetchApi } from "lib/Utils"
import { onSetNotification } from "redux/action"
import { setAccessToken } from "redux/reducer"
import { setLoading } from "redux/reducer"


export const onLogin = (data, remember, navigate) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/api/token`,
            null,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "Login Successfull", true))
                if (remember) {
                    successResponse["loggedIn"] = remember
                }
                setUserDataToStorage("loginData", successResponse, navigate);
                dispatch(setAccessToken(successResponse.access))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, "Unauthorized Access", true))
            }, data
        )
    }
}