import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../../common/Header'
import { SCREEN } from '../../../lib/Constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { handleDateTime } from '../../../lib/Utils';

const conatiner_details_items = [
    { icon: <Image source={require("../../../Image/date.png")} style={{ height: 35, width: 35 }} />, labelName: "DATE & TIME:", value: "May 4th 2020" },
    { icon: <Image source={require("../../../Image/time.png")} style={{ height: 35, width: 35 }} />, labelName: "TIMEZONE:", value: "23:05 PM" },
    { icon: <Image source={require("../../../Image/location.png")} style={{ height: 35, width: 35 }} />, labelName: "LOCATION:", value: "Marina Beach" }
]

export default function PickupInformation(props) {

    const shipmentDetails = useSelector((store) => store.main.shipmentDetails)

    return (
        <View style={{ height: SCREEN.HEIGHT, width: SCREEN.WIDTH, backgroundColor: "#252746" }}>
            <Header navigation={props.navigation} headerName={"Pickup Confirmation"} backVisible={true} />

            <View style={{ width: "100%", displ: "flex", justifyContent: "center", alignItems: "center", }}>
                <Text style={styles.helpText}>
                    Pickup Confirmation
                </Text>
                <View style={{ width: "90%", backgroundColor: "#323761", borderRadius: 7, padding: 15, paddingHorizontal: 15, paddingTop: 25, elevation: 5 }}>
                    {
                        conatiner_details_items.map((item, index) => {
                            return <View key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: 15, marginBottom: 18 }}>
                                {item.icon}
                                <View style={{ marginLeft: 15, flex: 1  }}>
                                    <Text style={{ color: "#d2d2d2", fontFamily: "serif", fontSize: 10 }}>{item.labelName}</Text>
                                    <Text style={{ color: "#fff", fontFamily: "serif", fontSize: 17, fontWeight: "600", flexWrap: 'wrap' }}>
                                        {
                                            index == 0 ? handleDateTime(new Date()) :
                                                index == 1 ? shipmentDetails.pickup_timezone && shipmentDetails.pickup_timezone.timezone
                                                    : shipmentDetails.pickup_address && shipmentDetails.pickup_address.split("_").join(", ")
                                        }
                                    </Text>
                                </View>
                            </View>
                        })
                    }

                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ ...styles.helpText, fontSize: 11, width: "auto", fontWeight: "500", marginRight: 7 }}>If Container is damaged ?</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 12, fontFamily: "serif", color: "#cf783e" }}>Click Here</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer} >
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#323761", width: "40%", borderRadius: 15, elevation: 5 }} onPress={() => { props.navigation.goBack(); }} >
                    <Text style={{ color: "#d2d2d2", fontSize: 17 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#5d4fbf", width: "40%", borderRadius: 15, elevation: 5 }} onPress={() => { props.navigation.navigate("ScanConatiner") }} >
                    <Text style={{ color: "#fff", fontSize: 17 }}>SCAN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    footer: { position: "absolute", bottom: 0, borderTopColor: "#f2f2f2", borderTopWidth: 0.5, display: "flex", flexDirection: "row", paddingVertical: 10, justifyContent: "space-evenly", width: "100%", backgroundColor: "#252746" },

    tabTouch: { width: "50%", borderRadius: 30, paddingVertical: 10, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" },

    helpText: { color: "#b2b2b2", fontFamily: "serif", fontSize: 15, fontWeight: "600", textAlign: "center", width: "80%", alignSelf: "center", marginVertical: "5%" },
})