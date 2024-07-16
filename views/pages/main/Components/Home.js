import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN, common_background_color, common_color } from '../../../lib/Constants'
import Header from '../../../common/Header';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getShipmentList } from '../action';
import { setShipmentDetails } from '../reducer';
import { _retrieveData, handleDateTime } from '../../../lib/Utils';
import ConfirmationModal from '../../../common/modals/ConfirmationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(props) {

    const dispatch = useDispatch();

    const shipmentList = useSelector((store) => store.main.shipmentList)

    const [status, setstatus] = useState(1);
    const [choosedNumber, setchoosedNumber] = useState("");
    const [selectedItem, setselectedItem] = useState({});
    const [visible, setvisible] = useState(false);


    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // value previously stored
                dispatch(getShipmentList(null, value, status))
            }
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        getData('truck_no');
        setselectedItem({});
    }, [status])

    useEffect(() => {
        if (props.route.params == 'Reached') {
            setstatus(4);
            setchoosedNumber("")
        }
    }, [props.route.params])


    return (
        <View style={{ height: SCREEN.HEIGHT, width: SCREEN.WIDTH, backgroundColor: "#252746" }}>
            <Header navigation={props.navigation} headerName={"Home"} />

            <ConfirmationModal visible={visible} headerText={"Do you want to start the journey, timer will start clicking ?"} onClose={() => setvisible(false)} onSubmit={() => { setvisible(false); props.navigation.navigate("TruckPickUpMap") }} />

            <View style={styles.tabView}>
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: status == 1 ? "rgba(75,77,133,128)" : "transparent", elevation: status == 1 ? 5 : 0 }} onPress={() => { setstatus(1) }}>
                    <Text style={{ color: "#fff", fontSize: 15 }}>New</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: status == 3 ? "rgba(75,77,133,128)" : "transparent", elevation: status == 3 ? 5 : 0 }} onPress={() => { setstatus(3) }}>
                    <Text style={{ color: "#fff", fontSize: 15 }}>Intransit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: status == 4 ? "rgba(75,77,133,128)" : "transparent", elevation: status == 4 ? 5 : 0 }} onPress={() => { setstatus(4) }}>
                    <Text style={{ color: "#fff", fontSize: 15 }}>Delivered</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ marginBottom: status !== 4 ? "15%" : "auto" }}>
                {shipmentList.results.length > 0 && shipmentList.results.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={{ ...styles.containerItems, backgroundColor: choosedNumber == item.shipment_number ? "rgba(75,77,133,128)" : "#323761", transform: [{ scale: choosedNumber == item.shipment_number ? 1.02 : 1 }] }} onPress={() => { setchoosedNumber(item.shipment_number); setselectedItem(item) }}>

                            <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{ paddingHorizontal: 15, paddingVertical: 7, backgroundColor: status == 1 ? "#5d4fbf" : status == 3 ? "orange" : "green", borderRadius: 7, elevation: 5 }}>
                                    <Text style={{ fontSize: 13, color: "#fff", fontFamily: "serif" }}>{status == 1 ? "New" : status == 3 ? "Intransit" : "Delivered"}</Text>
                                </View>
                                {status !== 4 && <View>
                                    {
                                        choosedNumber == item.shipment_number ?
                                            <Ionicons name="radio-button-on" size={24} color="#fff" />
                                            :
                                            <Ionicons name="radio-button-off" size={24} color="#fff" />
                                    }
                                </View>}
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                <View  >
                                    <Text style={{ color: "#d2d2d2", fontSize: 13, fontFamily: "serif" }}>Shipment No</Text>
                                    <Text style={{ color: "#fff", fontSize: 17, fontWeight: "500", fontFamily: "serif" }}>{item.shipment_number}</Text>
                                </View>
                                <View >
                                    <Text style={{ color: "#d2d2d2", fontSize: 13, fontFamily: "serif", textAlign: "right" }}>Container No</Text>
                                    <Text style={{ color: "#fff", fontSize: 17, fontWeight: "500", fontFamily: "serif", textAlign: "right" }}>{item.container_details && item.container_details.container_no}</Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                                <View  >
                                    <Text style={{ color: "#d2d2d2", fontSize: 13, fontFamily: "serif" }}>Pick Up Time</Text>
                                    <Text style={{ color: "#fff", fontSize: 17, fontWeight: "500", fontFamily: "serif", }}>{item.pickup_datetime && handleDateTime(item.pickup_datetime)}</Text>
                                </View>
                                <View  >
                                    <Text style={{ color: "#d2d2d2", fontSize: 13, fontFamily: "serif", textAlign: "right" }}>Drop Time</Text>
                                    <Text style={{ color: "#fff", fontSize: 17, fontWeight: "500", fontFamily: "serif", textAlign: "right" }}>{item.drop_datetime && handleDateTime(item.drop_datetime)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity >
                    )
                })}
            </ScrollView >
            {status !== 4 && <View style={styles.footer} >
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#323761", width: "40%", borderRadius: 15, elevation: 5 }} onPress={() => { setchoosedNumber("") }} >
                    <Text style={{ color: "#d2d2d2", fontSize: 17, fontFamily: "serif" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: choosedNumber ? "#5d4fbf" : "#323761", width: "40%", borderRadius: 15, elevation: 5 }} disabled={!choosedNumber} onPress={() => {
                    dispatch(setShipmentDetails(selectedItem));
                    if (status == 1) {
                        setvisible(true);
                    }
                    if (status == 3) {
                        props.navigation.navigate("CustomMap", "Intransit");
                    }
                }} >
                    <Text style={{ color: "#fff", fontSize: 17, fontFamily: "serif" }}>Next</Text>
                </TouchableOpacity>
            </View>}
        </View >
    )
}
const styles = StyleSheet.create({
    tabView: { width: "80%", alignSelf: "center", borderRadius: 30, backgroundColor: "#323761", display: "flex", flexDirection: "row", padding: 5, marginVertical: "3%", elevation: 5, display: "flex", justifyContent: "space-between" },

    tabTouch: { width: "33%", borderRadius: 30, paddingVertical: 10, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" },

    containerItems: { display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 15, backgroundColor: "#323761", width: "90%", alignSelf: "center", padding: 10, marginBottom: 14, alignItems: "center", paddingHorizontal: 20, elevation: 5 },
    footer: { position: "absolute", bottom: 0, borderTopColor: "#f2f2f2", borderTopWidth: 0.5, display: "flex", flexDirection: "row", paddingVertical: 10, justifyContent: "space-evenly", width: "100%", backgroundColor: "#252746" },

})