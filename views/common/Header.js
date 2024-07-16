import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Header(props) {
    return (
        <View style={{ width: "100%", backgroundColor: "#323761" }}>
            <StatusBar backgroundColor={"#323761"} />

            <View style={styles.header_bar}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    {
                        props.backVisible ?
                            <TouchableOpacity onPress={() => { props.navigation.goBack(); }}>
                                <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
                            </TouchableOpacity>
                            :
                            <Image source={require("../Image/truck.png")} style={{ height: 22, width: 35, marginLeft: 8, marginRight: 5 }} />
                        // <TouchableOpacity>
                        //     <MaterialCommunityIcons name="truck-cargo-container" size={24} color="#fff" style={{marginLeft:5}} />
                        // </TouchableOpacity>
                    }
                    <View>
                        <Text style={{ color: "#fff", fontSize: 19, marginLeft: 12, fontFamily: "serif" }}>{props.headerName}</Text>
                    </View>
                </View>
                <View>
                    {props.infoItems}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header_bar: {
        width: "92%", borderRadius: 10, marginVertical: 5, alignSelf: "center",
        backgroundColor: "rgba(75,77,133,128)", padding: 10, display: "flex", flexDirection: "row", marginBottom: 12, elevation: 5, alignItems: "center", justifyContent:"space-between"
    }
})