import { REQUEST_METHOD } from "../../lib/Constants";
import { _storeData, fetchApi } from "../../lib/Utils";
import { setLoading } from "../../redux/reducer";


export const getDriverOTP = (body, navigate) => {
    return function (dispatch) {
        navigate("OTP_Verification", body)

        // dispatch(setLoading(true))
        // fetchApi(
        //     `/trucking/driver/login`,
        //     null,
        //     REQUEST_METHOD.POST,
        //     (successResponse) => {
        //         navigate("OTP_Verification", body)
        //         dispatch(setLoading(false));
        //     },
        //     (error) => {
        //         alert(error)
        //         dispatch(setLoading(false))
        //     }, body
        // )
    }
}


export const onVerifyOTP = (body, navigate) => {

    return function (dispatch) {

        _storeData("truck_no", body.truck_number).then(() => {
            navigate("Home")
        })

        // dispatch(setLoading(true))
        // fetchApi(
        //     `/trucking/driver/login/otp/verify`,
        //     null,
        //     REQUEST_METHOD.POST,
        //     (successResponse) => {
        //         navigate("Home")
        //         dispatch(setLoading(false));
        //     },
        //     (error) => {
        //         alert(error)
        //         dispatch(setLoading(false))
        //     }, body
        // )
    }
}