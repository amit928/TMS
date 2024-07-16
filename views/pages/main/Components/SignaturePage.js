import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../common/Header';
import { SCREEN } from '../../../lib/Constants';
import SignatureScreen from "react-native-signature-canvas";
import { useDispatch, useSelector } from 'react-redux';
import { setPickupDetails, setShipmentDetails, setShipmentStageDetails } from '../reducer';
import * as Location from 'expo-location';
import { bookingChangeResponse, bookingUpdateResponse, getShipmentList } from '../action';
import { setLoading } from '../../../redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignaturePage(props) {

    const [signatureData, setsignatureData] = useState("")

    const ref = useRef();
    const dispatch = useDispatch();

    const pickupDetails = useSelector((store) => store.main.pickupDetails)
    const shipmentDetails = useSelector((store) => store.main.shipmentDetails)
    const shipmentStageDetails = useSelector((store) => store.main.shipmentStageDetails)

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);



    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        setsignatureData(signature);
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        dispatch(setPickupDetails({ ...pickupDetails, signature: signatureData, current_location: location }))
        if (props.route.params == 'Reached') {
            onDropShipment();
        }
        else {
            props.navigation.navigate("CustomMap")
        }
    };

    const onDropShipment = () => {
        var body =
        {
            "stage": "Drop",
            "time": new Date(pickupDetails.date_time),
            "location": location && location.coords && `${location.coords.latitude}_${location.coords.longitude}`,
            "signature": signatureData && signatureData.replace("data:image/png;base64,", ""),
            "timezone": shipmentDetails.drop_timezone && shipmentDetails.drop_timezone.id,
            "shipment": shipmentDetails.id,
            "image": pickupDetails.image && pickupDetails.image.base64
        }

        // console.log("shipmentStageDetails", body.shipment, shipmentDetails.shipment_stage_id, body.time, body.timezone, body.location, pickupDetails.current_location )
        
        dispatch(setLoading(true));
        bookingUpdateResponse(null, shipmentStageDetails.id ?? shipmentDetails.shipment_stage_id, body
            ,
            (successResponse) => {
                console.log("successResponse", successResponse)
                setShipmentStageDetails({});
                props.navigation.navigate("Home", 'Reached')
                dispatch(setLoading(false));
            },
            (errorResponse) => {
                console.log("errorResponse", errorResponse)
                dispatch(setLoading(false));
            }
        )
    }

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // value previously stored
                dispatch(getShipmentList(null, value, 4));
                props.navigation.navigate("Home", 'Reached')
            }
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        if (props.route.params == 'Reached') {
            handleClear();
            setsignatureData("")
            handleEmpty();
            ref.current.clearSignature();
        }
    }, [props.route])

    return (
        <View style={{ height: SCREEN.HEIGHT, width: SCREEN.WIDTH, backgroundColor: "#252746" }}>
            <Header navigation={props.navigation} headerName={"Signature"} backVisible={true} />

            <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty}
                onClear={handleClear}
                onGetData={handleData}
            // autoClear={true}
            //   descriptionText={text}
            />

        </View>
    )
}