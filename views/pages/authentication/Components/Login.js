import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, StatusBar, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { SCREEN, common_color } from '../../../lib/Constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { getDriverOTP } from '../action';

const Login = (props) => {

    const dispatch = useDispatch();

    const [truck_no, settruck_no] = useState('');


    return (
        <ScrollView style={styles.body}>
            <StatusBar backgroundColor={common_color} />
            <View style={styles.header}>
                <Image source={require('../../../Image/logo.png')} style={{ width: 300, height: 35 }} />
            </View>
            <View style={styles.imageStyle}>
                <Image source={require('../../../Image/delivery-service.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={{ paddingBottom: 20 }}>
                <View style={{ width: "85%", alignSelf: "center" }}>
                    <Text style={{ fontSize: 30, color: common_color, fontWeight: "bold", fontFamily: "serif" }}>Login To iTMS</Text>
                </View>
                <View style={styles.textInput}>
                    <TextInput placeholder='Truck Number' placeholderTextColor={"gray"} style={{ width: "92%", fontFamily: "serif", fontSize: 18 }} autoCapitalize='characters' onChangeText={(text) => { settruck_no(text) }} />
                    <FontAwesome5 name="truck-moving" size={24} color={common_color} />
                </View>
                <TouchableOpacity style={styles.signInButton} onPress={() => {
                    if (truck_no) {
                        dispatch(getDriverOTP({ "truck_number": truck_no }, props.navigation.navigate))
                    }
                    else {
                        alert("Please Enter Truck Number")
                    }
                }}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "serif" }}>Send OTP</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        backgroundColor: "#ecf5fa", height: "100%", width: "100%", position: "relative", display: "flex"
    },
    header: { width: "100%", alignSelf: "center", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingVertical: 10 },

    imageStyle: { width: "95%", alignSelf: "center", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: SCREEN.HEIGHT / 2, marginTop: "33%"  },

    textInput: { width: "85%", display: "flex", alignSelf: "center", flexDirection: "row", borderColor: common_color, borderBottomWidth: 1, padding: 7, marginTop: "9%", paddingVertical: 9, fontFamily: "serif" },
    signInButton: {
        width: "85%", alignSelf: "center", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: common_color, paddingVertical: 15, borderRadius: 10, marginTop: "6%", elevation: 5
    }
});

export default Login;