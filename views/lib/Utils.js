import { BASEURL, REQUEST_METHOD, RESPONSE_CODE, RESPONSE_TYPE, DEFAULT_DATA, TIME_ZONE } from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    case RESPONSE_TYPE.TEXT:
                        return response.text();
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
            deleteUserDataFromStorage('loginData');
            errorCallBack("Unauthorized Access")
            window.location.reload();
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
        if (typeof data === 'string')
            return errorCallBack(data)

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

export const handleDateTime = (datetime) => {
    // Your date-time string
    const dateTimeString = datetime;

    // Parse the date-time string into a JavaScript Date object
    const dateTime = new Date(dateTimeString);

    // Get the date components
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateTime.getDate()).padStart(2, '0');

    // Get the time components
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    // Format the date and time
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

export function convertDistance(distanceInMeters) {
    // Convert to kilometers
    const distanceInKilometers = distanceInMeters / 1000;

    // Convert to miles
    const distanceInMiles = distanceInMeters / 1609.344;

    // Format the result
    const result = `${(distanceInKilometers).toFixed(1)} km | ${(distanceInMiles).toFixed(1)} mi`

    return result;
}

export function convertSecondsToMinutesAndSeconds(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = Math.round(seconds % 60);

    let result = '';

    if (days > 0) {
        result += `${days}d `;
    }
    if (hours > 0) {
        result += `${hours}h `;
    }
    if (minutes > 0) {
        result += `${minutes}min `;
    }
    if (remainingSeconds > 0 || result === '') {
        result += `${remainingSeconds}sec`;
    }

    return result.trim();
}

export const calculateHeading = (coord1, coord2) => {
    // if (cord2) {
    //     const { latitude: lat1, longitude: lng1 } = cord1;
    //     const { latitude: lat2, longitude: lng2 } = cord2;
    //     const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
    //     const x =
    //         Math.cos(lat1) * Math.sin(lat2) -
    //         Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
    //     const θ = Math.atan2(y, x);
    //     const brng = (((θ * 180) / Math.PI + 360) % 360) ;
    //     return brng;
    // }
    // return 0;

    const { latitude: lat1, longitude: lon1 } = coord1;
    const { latitude: lat2, longitude: lon2 } = coord2;

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let brng = Math.atan2(y, x);
    brng = brng * (180 / Math.PI); // convert to degrees
    brng = ((brng + 360) % 360) - 120; // ensure the result is between 0 and 360 degrees
    return brng;
};

export const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key,
            value,
        );
    } catch (error) {
        // Error saving data
    }
};

export const _retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};