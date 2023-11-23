export const BASEURL = "http://127.0.0.1:8000";
// export const BASEURL = "http://visibility.cozentus.com:8001";

export const REQUEST_METHOD = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

export const PAGE_SIZE = 10;

export const RESPONSE_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500
}

export const ITEM_PER_PAGE_LIST = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_READ_DATA = "False";
export const DEFAULT_DATA = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

export const NOTIFICATION_COLOUR = {
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
    DANGER: 'error',
    PRIMARY: "primary",
    SECONDARY: "secondary",
    LIGHT: "light",
    DARK: "dark",
    ERROR: "error"
}

export const RESPONSE_TYPE = {
    JSON: 'json',
    NULL: null,
    BLOB: 'blob'
}

export const TIME_ZONE = [
    {
        value: 'Asia/Kolkata'
    }

]

export function updateFormattedDateTime() {
    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getUTCDay()];
    const month = months[now.getUTCMonth()];
    const dayOfMonth = now.getUTCDate();
    const year = now.getUTCFullYear();
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${dayOfWeek}, ${month} ${dayOfMonth} ${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
}