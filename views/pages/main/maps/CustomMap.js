import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREEN, common_color, my_truck_route } from '../../../lib/Constants';
import Header from '../../../common/Header';
import * as Location from 'expo-location';
import { bookingChangeResponse, getCoordinatesFromAddress, getRoutesFromCoordinates } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../redux/reducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { calculateHeading, convertDistance, convertSecondsToMinutesAndSeconds } from '../../../lib/Utils';
import ConfirmationModal from '../../../common/modals/ConfirmationModal';
import { setShipmentStageDetails } from '../reducer';

export default function CustomMap(props) {

    const dispatch = useDispatch();

    const shipmentDetails = useSelector((store) => store.main.shipmentDetails)
    const pickupDetails = useSelector((store) => store.main.pickupDetails)

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [coordinates, setcoordinates] = useState({})
    const [marker_coordinates, setmarker_coordinates] = useState([])
    const [truck_details_list, settruck_details_list] = useState([])
    const [pick_drop_status, setpick_drop_status] = useState(false);
    const [truckRoutes, settruckRoutes] = useState([]);
    const [from_address_coordinates, setfrom_address_coordinates] = useState([]);
    const [to_address_coordinates, setto_address_coordinates] = useState([]);
    const [total_distance, settotal_distance] = useState("");
    const [total_duration, settotal_duration] = useState('');
    const [total_routes, settotal_routes] = useState(null);
    const [current_route, setcurrent_route] = useState(0);
    const [picked_up, setpicked_up] = useState(false);
    const [visible, setvisible] = useState(false);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setmapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,

            })
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const [mapRegion, setmapRegion] = useState({
        latitude: 0,
        longitude: 1,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,

    });

    useEffect(() => {
        if (truckRoutes && truckRoutes[0]) {
            setmapRegion({
                latitude: truckRoutes[0][1],
                longitude: truckRoutes[0][0],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,

            })
        }
    }, [truckRoutes])

    const handlePolylineCoordinates = (coordinates) => {
        var x = []
        coordinates.map((item, index) => {
            x.push({ longitude: item[0], latitude: item[1] })
        })
        // console.log("x", x)
        return x
    }


    useEffect(() => {
        if (shipmentDetails.pickup_address) {
            get_coordinates_from_address(shipmentDetails.pickup_address, (coordinates) => { setfrom_address_coordinates(coordinates) })
        }
        if (shipmentDetails.drop_address) {
            get_coordinates_from_address(shipmentDetails.drop_address, (coordinates) => { setto_address_coordinates(coordinates) })
        }

    }, [shipmentDetails.pickup_address, shipmentDetails.drop_address])

    useEffect(() => {
        if (from_address_coordinates && to_address_coordinates && from_address_coordinates.length > 0 && to_address_coordinates.length > 0) {
            dispatch(setLoading(true));
            getRoutesFromCoordinates(from_address_coordinates, to_address_coordinates,
                (successResponse) => {
                    settotal_routes(successResponse.routes);
                    successResponse.routes && successResponse.routes[0] && successResponse.routes[0].geometry && settruckRoutes(successResponse.routes[0].geometry.coordinates);

                    successResponse.routes && successResponse.routes[0] && settotal_duration(successResponse.routes[0].duration);
                    successResponse.routes && successResponse.routes[0] && settotal_distance(successResponse.routes[0].distance);

                    dispatch(setLoading(false));
                },
                (errorResponse) => {
                    dispatch(setLoading(false));
                }
            )
        }
    }, [from_address_coordinates, to_address_coordinates])


    useEffect(() => {
        if (total_routes && total_routes.length > 0) {
            total_routes[current_route] && total_routes[current_route].geometry && settruckRoutes(total_routes[current_route].geometry.coordinates);
            total_routes[current_route] && settotal_duration(total_routes[current_route].duration);
            total_routes[current_route] && settotal_distance(total_routes[current_route].distance);
        }
    }, [current_route, total_routes,])

    const get_coordinates_from_address = (address, getCoordinates) => {
        dispatch(setLoading(true));
        getCoordinatesFromAddress(address.replaceAll("#", ''),
            (successResponse) => {
                successResponse.features[0] && getCoordinates(successResponse.features[0].center)
                dispatch(setLoading(false));
            },
            (errorResponse) => {
                dispatch(setLoading(false));
            }
        )
    }

    useEffect(() => {
        if (props.route.params) {
            setpicked_up(true);
        }
    }, [props.route])


    const onStartShipment = () => {
        var body =
        {
            "stage": "Pickup",
            "time": new Date(pickupDetails.date_time),
            "location": pickupDetails.current_location && pickupDetails.current_location.coords && `${pickupDetails.current_location.coords.latitude}_${pickupDetails.current_location.coords.longitude}`,
            "signature": pickupDetails.signature && pickupDetails.signature.replace(" data:image/png;base64,", ""),
            "timezone": shipmentDetails.pickup_timezone && shipmentDetails.pickup_timezone.id,
            "shipment": shipmentDetails.id,
            "image": pickupDetails.image && pickupDetails.image.base64
        }

        // console.log("pickupDetails", shipmentDetails)

        dispatch(setLoading(true));
        bookingChangeResponse(null, body
            ,
            (successResponse) => {
                console.log("successResponse", successResponse)
                dispatch(setShipmentStageDetails(successResponse))
                setpicked_up(true);
                dispatch(setLoading(false));
            },
            (errorResponse) => {
                console.log("errorResponse", errorResponse)
                alert(errorResponse)
                dispatch(setLoading(false));
            }
        )
    }

    useEffect(() => {
        // console.log("shipmentDetails", shipmentDetails)
    }, [])



    return (

        <View style={{ height: SCREEN.HEIGHT, width: SCREEN.WIDTH, backgroundColor: "#252746" }}>
            <Header navigation={props.navigation} headerName={"Map Routes"}
                infoItems={<TouchableOpacity onPress={() => { setpick_drop_status(!pick_drop_status) }}>
                    <MaterialCommunityIcons name="information-variant" size={24} color="white" />
                </TouchableOpacity>}
            />

            <View style={styles.container}>

                {
                    pick_drop_status && total_routes && total_routes.length > 0 &&
                    <View style={{ position: "absolute", zIndex: 5, top: 10, left: 10, backgroundColor: "rgba(50, 55, 97, 0.8)", padding: 7, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", width: "95%", justifyContent: "center", borderRadius: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <View style={{ width: "45%", flex: 1 }}>
                                <Text style={{ color: "#f2f2f2", fontWeight: "bold" }}>
                                    Drop Point :
                                </Text>
                                <Text style={{ color: "#fff", flexWrap: "wrap" }}>
                                    {shipmentDetails.drop_address && shipmentDetails.drop_address.split("_").join(", ")}
                                </Text>
                            </View>
                        </View>
                    </View>
                }

                <View style={{ position: "absolute", zIndex: 5, bottom: 10, left: 10, backgroundColor: "rgba(50, 55, 97, 0.8)", padding: 7, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", width: "55%", justifyContent: "center", borderRadius: 5 }}>
                    <View style={{ width: "100%", flex: 1 }}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Distance :
                        </Text>
                        <Text style={{ color: "#fff", flexWrap: "wrap" }}>
                            {total_distance && convertDistance(total_distance)}
                        </Text>
                        <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 5 }}>
                            Duration :
                        </Text>
                        <Text style={{ color: "#fff", flexWrap: "wrap" }}>
                            {total_duration && convertSecondsToMinutesAndSeconds(total_duration)}
                        </Text>
                    </View>
                </View>

                {
                    total_routes && total_routes.length > 0 &&
                    <View style={{ position: "absolute", zIndex: 5, bottom: 120, left: 10, backgroundColor: common_color, borderRadius: 20, padding: 7, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", flexDirection: "row" }}>
                        {total_routes.map((item, custom_index) => {
                            return <TouchableOpacity key={custom_index} style={{ padding: 4, borderRadius: 50, backgroundColor: current_route == custom_index ? common_color : "#f2f2f2", cursor: "pointer", paddingHorizontal: 10 }} onPress={() => { setcurrent_route(custom_index) }}>
                                <Text style={{ color: current_route == custom_index ? "#fff" : common_color, }}  >{custom_index + 1}</Text>
                            </TouchableOpacity>
                        })}
                    </View>
                }

                {
                    truckRoutes &&
                    <MapView style={styles.map} region={mapRegion} mapType='mutedStandard' >

                        <Marker coordinate={mapRegion} />
                        {
                            truckRoutes && truckRoutes[truckRoutes.length - 1] &&
                            <Marker coordinate={{ latitude: truckRoutes[truckRoutes.length - 1][1], longitude: truckRoutes[truckRoutes.length - 1][0] }} />
                        }

                        {truckRoutes && truckRoutes[0] &&
                            <Marker coordinate={{ latitude: truckRoutes[0][1], longitude: truckRoutes[0][0] }} image={require("../../../Image/box-truck.png")} style={{ transform: `rotate(${calculateHeading({ latitude: truckRoutes[0][1], longitude: truckRoutes[0][0] }, { latitude: truckRoutes[1][1], longitude: truckRoutes[1][0] })}deg)` }} />
                        }

                        <Polyline
                            // lineDashPattern={[1]}
                            coordinates={handlePolylineCoordinates(truckRoutes)}
                            strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeWidth={6}
                        />
                    </MapView>
                }

                <ConfirmationModal visible={visible} headerText={"Are you sure , You reached the destination point ?"} onClose={() => setvisible(false)} onSubmit={() => { setvisible(false); props.navigation.navigate("ReachedScanContainer") }} />


                <View style={{ position: "absolute", zIndex: 5, bottom: 10, right: 10 }}>
                    {picked_up ?
                        <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#5d4fbf", borderRadius: 15, elevation: 5 }} onPress={() => { setvisible(true); }} >
                            <Text style={{ color: "#fff", fontSize: 17, fontFamily: "serif" }}>REACHED</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#5d4fbf", borderRadius: 15, elevation: 5 }} onPress={() => {
                            onStartShipment();
                        }} >
                            <Text style={{ color: "#fff", fontSize: 17, fontFamily: "serif" }}>START</Text>
                        </TouchableOpacity>}
                </View>


            </View >
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    tabTouch: { width: 120, borderRadius: 30, paddingVertical: 10, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" },

});
