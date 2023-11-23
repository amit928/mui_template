import { setAccessToken, setNotification } from "./reducer";

export const set_accessToken = (access_token) => {
    return function (dispatch) {
        dispatch(setAccessToken(access_token))
    }
}

export const onSetNotification = (color, msg, status) => {
    return function (dispatch) {
        dispatch(setNotification({ color: color, msg: msg, status: status }))
        setTimeout(() => {
            dispatch(setNotification({ color: color, msg: msg, status: false }))
        }, 3000);
    }
}
