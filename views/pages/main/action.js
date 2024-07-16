import { NOTIFICATION_COLOUR, REQUEST_METHOD, TOKEN } from "../../lib/Constants";
import { fetchApi } from "../../lib/Utils";
// import { onSetNotification } from "../../redux/action";
import { setLoading } from "../../redux/reducer";
import { setShipmentList } from "./reducer";


export const getShipmentList = (accessToken, truck_number, status) => {
    return function (dispatch) {
        dispatch(setLoading(true))
        fetchApi(
            `/trucking/booking/truck/containers/?truck_number=${truck_number}&status=${status}`,
            accessToken,
            REQUEST_METHOD.GET,
            (successResponse) => {
                dispatch(setShipmentList(successResponse))
                dispatch(setLoading(false));
            },
            (error) => {
                alert(error)
                dispatch(setLoading(false))
            }
        )
    }
}

export const getCoordinatesFromAddress = (Address, successResponse, errorResponse) => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    const formdata = new FormData();

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        // body: formdata,
        redirect: "follow"
    };

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${Address} .json?limit=5&proximity=-79.45119999999997%2C43.6568&access_token=${TOKEN}`, requestOptions)
        .then((response) => response.json())
        .then((result) => successResponse(result))
        .catch((error) => errorResponse(error));
}

export const getRoutesFromCoordinates = (from_address_coordinates, to_address_coordinates, successResponse, errorResponse) => {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${from_address_coordinates[0]}%2C${from_address_coordinates[1]}%3B${to_address_coordinates[0]}%2C${to_address_coordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${TOKEN}`, requestOptions)
        .then((response) => response.json())
        .then((result) => successResponse(result))
        .catch((error) => errorResponse(error));
}


export const bookingChangeResponse = (accessToken, body, success, error) => {
    fetchApi(`/trucking/shipment/stage`, accessToken, REQUEST_METHOD.POST,
        (successResponse) => {
            success(successResponse)
        },
        (errorResponse) => {
            error(errorResponse);
        }, body
    )
}

export const bookingUpdateResponse = (accessToken, id, body, success, error) => {
    fetchApi(`/trucking/shipment/stage/${id}`, accessToken, REQUEST_METHOD.PUT,
        (successResponse) => {
            success(successResponse)
        },
        (errorResponse) => {
            error(errorResponse);
        }, body
    )
}