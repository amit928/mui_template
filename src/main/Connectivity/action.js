import { PAGE_SIZE } from "lib/Constants"
import { NOTIFICATION_COLOUR } from "lib/Constants"
import { REQUEST_METHOD } from "lib/Constants"
import { fetchApi } from "lib/Utils"
import { onSetNotification } from "redux/action"
import { setLoading } from "redux/reducer"
import { setSetupList } from "./reducer"



export const getSetupList = (accessToken, body = { "page": 1, "page_size": PAGE_SIZE }) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/edi/partner/connectivity/list`,
            accessToken,
            REQUEST_METHOD.POST,
            (successResponse) => {
                dispatch(setSetupList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                dispatch(setLoading(false))
                dispatch(onSetNotification(NOTIFICATION_COLOUR.DANGER, error, true))
            }, body
        )
    }
}