import { BASEURL, REQUEST_METHOD, RESPONSE_CODE, RESPONSE_TYPE, DEFAULT_DATA, TIME_ZONE } from './Constants';

export function getRequestHeader(accessToken) {
    let headers = {
        "Content-Type": "application/json",
        "accept": "application/json"
    };
    if (accessToken !== null) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return headers;
}

export const fetchApi = (endPoint, accessToken, method, successCallBack, errorCallBack, body = null, setBaseUrl = true, responseType = RESPONSE_TYPE.JSON) => {
    let options = {
        method: method,
        headers: getRequestHeader(accessToken)
    };

    let requestUrl = endPoint;
    if (setBaseUrl) {
        requestUrl = `${BASEURL}${endPoint}`;
    }

    if (method === REQUEST_METHOD.GET && body !== null) {
        errorCallBack("GET request does not support body")
        return null
    } else if (method !== REQUEST_METHOD.GET) {
        options["body"] = JSON.stringify(body)
    }
    fetch(requestUrl, options)
        .then(response => {
            if (response.status >= 400) {
                return response
            } else {
                switch (responseType) {
                    case RESPONSE_TYPE.JSON:
                        return response.json();
                    case RESPONSE_TYPE.BLOB:
                        return response.blob();
                    case RESPONSE_TYPE.NULL:
                        return DEFAULT_DATA
                }
            }
        })
        .then(responseJson => {
            if (responseJson.type === 'cors') {
                apiErrorHandler(responseJson, errorCallBack)
            } else {
                successCallBack(responseJson)
            }
        }).catch(error => {
            console.log("`Something Went Wrong. error : ${error}`", `Something Went Wrong. error : ${error}`, requestUrl, options)
            errorCallBack(`Something Went Wrong. error : ${error}`)
        })
}

export function apiErrorHandler(response, errorCallBack) {
    switch (response.status) {
        case RESPONSE_CODE.INTERNAL_SERVER_ERROR:
            return errorCallBack(`Something Went Wrong, please try again later.`);
        case RESPONSE_CODE.FORBIDDEN:
            errorCallBack(`You do not have permission to perform this action.`)
            break;
        case RESPONSE_CODE.UNAUTHORIZED:
            deleteUserDataFromStorage('loginData');
            errorCallBack("Unauthorized Access")
            window.location.reload();
            break;
        default:
            getApiErrorMessage(response, errorCallBack);
            break;
    }
}

function getApiErrorMessage(response, errorCallBack) {
    (response.json()).then((data) => {
        if (Array.isArray(data))
            return errorCallBack(data)
        let key = Object.keys(data)
        key = key[0]
        if (typeof data[key] === 'string')
            return errorCallBack(data[key])
        if (data.length > 0) {
            data = data[0]
        }
        let keys = Object.keys(data)
        if (keys.length > 0) {
            keys = keys[0]
        }
        return errorCallBack(`${keys}:${data[keys][0]}`)
    })
}

export async function ConvertPageImageToBlob(accessToken, imageUrl) {
    let requestOptions = {
        method: REQUEST_METHOD.GET,
        headers: getRequestHeader(accessToken),
    };
    let response = await fetch(imageUrl, requestOptions)
    response = await response.blob()
    let blobResponse = await URL.createObjectURL(response);
    return blobResponse;
}

export function setUserDataToStorage(key, data, navigate) {
    localStorage.setItem(key, JSON.stringify(data));
    navigate('/dashboard');
}

export function getUserDataFromStorage(key) {
    try {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
}

export function deleteUserDataFromStorage(key) {
    localStorage.removeItem(key);
}

export function csvToJSON(csv) {
    csv = csv.replace('\r', '');
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            if (currentline[j] !== undefined && currentline[j] !== "") {
                obj[headers[j]] = currentline[j];
            }
        }
        if (Object.keys(obj).length > 0) {
            result.push(obj);
        }
    }
    return result;
}

export function readFile(file) {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = x => resolve(fr.result);
        fr.readAsText(file);
    })
}

export function setTimezone(date, timeZone = TIME_ZONE[0].value) {
    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: timeZone
    })).toString();
    invdate = invdate.slice(0, invdate.indexOf('G'))
    return invdate;
}

export function validator(type, checkValue) {
    try {
        switch (type) {
            case "alphabet":
                return /^[a-zA-Z ]*$/.test(checkValue);
            case "number":
                return /^\d+$/.test(checkValue);
            case "alphanumeric":
                return /^[A-Za-z0-9 ]+$/.test(checkValue);
            case "email":
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(checkValue);
            case "password":
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(checkValue);

            default:
                return true;
        }
    }
    catch (error) {
        console.log(error, type);
        return true;
    }
}

export const makeColumnArrayToObject = (my_arr = []) => {
    var updatedArr = []
    my_arr.length > 0 && my_arr.map((item, index) => {
        var obj = { name: item, code: index }
        updatedArr.push(obj)
    })
    return updatedArr
}

export const customizeDropdownData = (data, name = "name") => {
    const my_arr = []
    data && data.length > 0 && data.map((item, index) => {
        var obj = { name: item[name], code: item.id }
        my_arr.push(obj)
    })
    return my_arr
}

export const handleDateTime = (datetime) => {
    // Your date-time string
    const dateTimeString = datetime;

    // Parse the date-time string into a JavaScript Date object
    const dateTime = new Date(dateTimeString);

    const dateFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const timeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    // Format the date and time using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(dateTime);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeFormatOptions).format(dateTime);

    // Concatenate the formatted date and time
    const formattedDateTime = `${formattedDate} ${formattedTime} `;

    return formattedDateTime;

}
