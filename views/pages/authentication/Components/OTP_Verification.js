import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, StatusBar, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { SCREEN, common_color } from '../../../lib/Constants';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { onVerifyOTP } from '../action';

const OTP_Verification = (props) => {

    const dispatch = useDispatch();

    const [otp, setotp] = useState('');

    return (
        <ScrollView style={styles.body}>
            <StatusBar backgroundColor={common_color} />
            <View style={styles.header}>
                <Image source={require('../../../Image/logo.png')} style={{ width: 300, height: 35 }} />
            </View>
            <View style={styles.imageStyle}>
                <Image source={require('../../../Image/otp.png')} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={{ paddingBottom: 20 }}>
                <View style={{ width: "85%", alignSelf: "center" }}>
                    <Text style={{ fontSize: 30, color: common_color, fontWeight: "bold", fontFamily: "serif" }}>OTP Verification</Text>
                </View>
                <View style={styles.textInput}>
                    <TextInput placeholder='Enter OTP' maxLength={4} placeholderTextColor={"gray"} style={{ width: "92%", fontFamily: "serif", fontSize: 18 }} keyboardType='number-pad' secureTextEntry onChangeText={(text) => { setotp(text) }} />
                    <Entypo name="lock" size={24} color={common_color} />
                </View>
                <TouchableOpacity style={styles.signInButton} onPress={() => {
                    if (otp) {
                        dispatch(onVerifyOTP({ ...props.route.params, otp: otp }, props.navigation.navigate))
                    }
                    else {
                        alert("Please Enter OTP")
                    }
                }}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: "serif" }}>Verify</Text>
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

    imageStyle: { width: "95%", alignSelf: "center", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: SCREEN.HEIGHT / 2, marginTop: "33%" },

    textInput: { width: "85%", display: "flex", alignSelf: "center", flexDirection: "row", borderColor: common_color, borderBottomWidth: 1, padding: 7, marginTop: "9%", paddingVertical: 9, fontFamily: "serif" },
    signInButton: {
        width: "85%", alignSelf: "center", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: common_color, paddingVertical: 15, borderRadius: 10, marginTop: "6%", elevation: 5
    }
});

export default OTP_Verification;