import { Dimensions } from "react-native"

export const BASEURL = "http://192.168.0.182:9099";
// export const BASEURL = "https://visibilityapi.cozentus.com";

export const TOKEN = 'pk.eyJ1IjoibWFoZW5kcmE5MzI5IiwiYSI6ImNrcHpld25pNzBsdGEycG82aTh2NjI0YnAifQ.AD4EUC9iCaDZMT36sNq50w';


export const REQUEST_METHOD = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

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

export const BACKGROUND_COLORS = {
    PRIMARY: "#007bff",
    SECONDARY: "#c757d",
    SUCCESS: "#28a745",
    DANGER: "#dc3545",
    WARNING: "#ffc107",
    INFO: "#17a2b8",
    DARK: "#343a40",
}

export const COLORS = {
    Red: "#FF0000",
    Green: "#00FF00",
    Blue: "#0000FF",
    Yellow: "#FFFF00",
    Magenta: "#FF00FF",
    Cyan: "#00FFFF",
    Orange: "#FF8000",
    Purple: "#8000FF",
    Teal: "#00FF80",
    Pink: "#FF0080",
    Navy_Blue: "#336699",
    Dark_Purple: "#663366",
    Dark_Red: "#990000",
    Dark_Green: "#009900",
    Dark_Blue: "#000099",
    Brown: "#993300",
    Olive: "#996633",
    Forest_Green: "#669933",
    Dark_Magenta: "#660066",
    Charcoal_Gray: "#333333"
};
;

export const RESPONSE_TYPE = {
    JSON: 'json',
    NULL: null,
    BLOB: 'blob',
    TEXT: 'text'
}

export const APP_LABEL = {
    DOCUMENTS: 'documents'
}

export const MODEL = {
    DOCUMENT: 'document'
}

export const SEARCH_MODEL = {
    user: 'auth.User'
}

export const TIME_ZONE = [
    {
        value: 'Asia/Kolkata'
    }

]
export const METADATA_FIELDS = {
    DATE: 'date',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    DROPDOWN: 'dropdown',
    TEXTBOX: 'textbox'
}


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


export const common_color = "#323761"
export const common_light_color = "#d4c6d1"
export const common_background_color = "#d4c6d1"
export const common_text_color = "#000"

export const SCREEN = {
    HEIGHT: Dimensions.get('window').height,
    WIDTH: Dimensions.get('window').width
}


export const my_truck_route = [
    [85.80369, 20.34431], [85.80336, 20.3443], [85.80308, 20.34427], [85.80306, 20.34423],
    [85.80306, 20.34409], [85.80309, 20.34367], [85.80311, 20.34364], [85.80315, 20.34361],
    [85.80319, 20.34361], [85.80322, 20.34319], [85.8034, 20.34322], [85.80344, 20.34322],
    [85.80345, 20.34292], [85.80441, 20.34293], [85.80522, 20.34295], [85.80523, 20.34297],
    [85.80524, 20.343], [85.80526, 20.34303], [85.80532, 20.34307], [85.8054, 20.3431],
    [85.80553, 20.34307], [85.80559, 20.34302], [85.80642, 20.34301], [85.80706, 20.34298],
    [85.80726, 20.34296], [85.80813, 20.34294], [85.81011, 20.34298], [85.81036, 20.34299],
    [85.81058, 20.34302], [85.81074, 20.34302], [85.8109, 20.343], [85.81238, 20.34305],
    [85.81418, 20.3431], [85.8158, 20.34312], [85.81689, 20.34311], [85.81726, 20.34308],
    [85.81778, 20.34302], [85.81912, 20.34281], [85.82046, 20.34269], [85.82152, 20.34261],
    [85.82282, 20.34245], [85.82342, 20.34424], [85.82418, 20.34646], [85.82456, 20.34758],
    [85.8249, 20.3485], [85.82543, 20.35006], [85.82587, 20.35128], [85.82627, 20.35249],
    [85.82657, 20.35326], [85.82693, 20.35428], [85.82731, 20.35533], [85.82738, 20.35556],
    [85.82752, 20.35625], [85.82768, 20.3573], [85.8279, 20.35873], [85.82819, 20.36039],
    [85.82841, 20.3617], [85.82869, 20.36336], [85.82883, 20.36379], [85.829, 20.36416],
    [85.82944, 20.36479], [85.82966, 20.36507], [85.82989, 20.36532], [85.83058, 20.36603],
    [85.8309, 20.36643], [85.83162, 20.36743], [85.83175, 20.36764], [85.8321, 20.36828],
    [85.83219, 20.36855], [85.83222, 20.36872], [85.83223, 20.36901], [85.83221, 20.3697],
    [85.8322, 20.37033], [85.83216, 20.37102], [85.83211, 20.3713], [85.83202, 20.37155],
    [85.83157, 20.37232], [85.83116, 20.37311], [85.83086, 20.37377], [85.82997, 20.37533],
    [85.82964, 20.376], [85.82936, 20.37651], [85.82886, 20.37734], [85.82859, 20.37767],
    [85.82844, 20.37783], [85.82793, 20.37821], [85.82697, 20.37884], [85.82632, 20.37933],
    [85.82603, 20.37969], [85.82587, 20.3798], [85.8252, 20.38062], [85.82494, 20.3809],
    [85.82433, 20.38169], [85.82359, 20.38269], [85.82322, 20.38328], [85.82304, 20.38389],
    [85.82299, 20.38459], [85.82301, 20.38501], [85.82337, 20.38607], [85.82457, 20.38976],
    [85.82526, 20.39184], [85.82568, 20.39301], [85.826, 20.39378], [85.82618, 20.39415],
    [85.8265, 20.39491], [85.82683, 20.39561], [85.82682, 20.39563], [85.82632, 20.39569],
    [85.82629, 20.39573], [85.82618, 20.39573], [85.82616, 20.39581], [85.82614, 20.39585],
    [85.82607, 20.39588], [85.82597, 20.39588]
]