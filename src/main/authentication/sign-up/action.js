import { NOTIFICATION_COLOUR } from "lib/Constants"
import { REQUEST_METHOD } from "lib/Constants"
import { fetchApi } from "lib/Utils"
import { onSetNotification } from "redux/action"
import { setLoading } from "redux/reducer"

export const onRegister = (data, navigate) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/v1/user/register`,
            null,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setLoading(false));
                dispatch(onSetNotification(NOTIFICATION_COLOUR.SUCCESS, "User Register Successfully, Please wait for Admin's approval.", true))
                navigate("/authentication/sign-in")
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, data
        )
    }
}