import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../common/Header'
import { SCREEN, common_background_color } from '../../../lib/Constants'

import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const container_numbers = ["APZU4800607", "MSCU1234567"]


export default function History(props) {
    return (
        <View style={{ height: SCREEN.HEIGHT, width: SCREEN.WIDTH, backgroundColor: "#252746" }}>
            <Header navigation={props.navigation} headerName={"History"} />

            <ScrollView style={{ marginVertical: "5%" }}>
                {container_numbers.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={{ ...styles.containerItems, backgroundColor: "#323761" }}>
                            <View>
                                <Text style={{ color: "#d2d2d2", fontSize: 13, fontFamily: "serif" }}>Container No</Text>
                                <Text style={{ color: "#fff", fontSize: 17, fontWeight: "500", fontFamily: "serif" }}>{item}</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", width: "40%", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{ paddingHorizontal: 15, paddingVertical: 7, backgroundColor: "green", borderRadius: 7, elevation: 5 }}>
                                    <Text style={{ fontSize: 13, color: "#fff", fontFamily: "serif" }}>Delivered</Text>
                                </View>
                                <View>
                                    <Entypo name="info-with-circle" size={24} color="gray" />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

            <View style={styles.footer} >
                <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#5d4fbf", width: "40%", borderRadius: 15, elevation: 5, marginRight: 15 }} onPress={() => { props.navigation.navigate("Home") }} >
                    <Text style={{ color: "#fff", fontSize: 17, fontFamily: "serif" }}>HOME</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    tabView: { width: "70%", alignSelf: "center", borderRadius: 30, backgroundColor: "#323761", display: "flex", flexDirection: "row", padding: 5, marginVertical: "3%", elevation: 5 },

    tabTouch: { width: "50%", borderRadius: 30, paddingVertical: 10, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" },

    containerItems: { display: "flex", flexDirection: "row", justifyContent: "space-between", borderRadius: 15, backgroundColor: "#323761", width: "90%", alignSelf: "center", padding: 10, marginBottom: 14, alignItems: "center", paddingHorizontal: 20, elevation: 5 },
    footer: { position: "absolute", bottom: 0, borderTopColor: "#f2f2f2", borderTopWidth: 0.5, display: "flex", flexDirection: "row", paddingVertical: 10, justifyContent: "flex-end", width: "100%", backgroundColor: "#252746" },

})