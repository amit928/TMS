import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { SCREEN, common_color } from '../../../lib/Constants'

export default function Register(props) {
    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Image source={require('../../../Image/logo.png')} style={{ width: "70%", height: 40 }} />
            </View>
            <ScrollView>
                <View style={styles.form}>
                    <View style={{ width: "60%", alignSelf: "center", marginTop: "7%" }}>
                        <Text style={{ fontSize: 20, color: common_color, fontWeight: "bold", textAlign: "center", fontFamily: "serif" }}>Register To Cozentus</Text>
                    </View>

                    <View style={styles.textInput}>
                        <TextInput placeholder='Name' placeholderTextColor={"gray"} style={{ width: "80%", marginLeft: "6%", fontFamily: "serif" }} onChangeText={(text) => { }} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput placeholder='Address' placeholderTextColor={"gray"} style={{ width: "80%", marginLeft: "6%", fontFamily: "serif" }} onChangeText={(text) => { }} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput placeholder='Town' placeholderTextColor={"gray"} style={{ width: "80%", marginLeft: "6%", fontFamily: "serif" }} onChangeText={(text) => { }} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput placeholder='Phone No' placeholderTextColor={"gray"} style={{ width: "80%", marginLeft: "6%", fontFamily: "serif" }} onChangeText={(text) => { }} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput placeholder='Email Id' placeholderTextColor={"gray"} style={{ width: "80%", marginLeft: "6%", fontFamily: "serif" }} onChangeText={(text) => { }} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput placeholder='Password' placeholderTextColor={"gray"} style={{ width: "80%", marginLeft: "6%", fontFamily: "serif" }} onChangeText={(text) => { }} />
                    </View>

                    <TouchableOpacity style={styles.signInButton} onPress={() => { }}>
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "serif" }}>Register Now</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: "center", marginTop: "3%", color: "gray", fontFamily: "serif" }}>OR</Text>
                    <Text style={{ textAlign: "center", marginTop: "1%", color: "gray", fontFamily: "serif" }}>Already Have An Account</Text>

                    <TouchableOpacity style={styles.registerButton} onPress={() => props.navigation.navigate('Login')}>
                        <Text style={{ color: common_color, fontSize: 16, fontWeight: "bold", fontFamily: "serif" }}>Sign In</Text>
                    </TouchableOpacity>
                </View >
            </ScrollView>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: "#ecf5fa", height: "100%", width: "100%", position: "relative"
    },
    header: { width: "100%", alignSelf: "center", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingVertical: 10 },
    form: {
        width: "90%", alignSelf: "center", backgroundColor: "#fff", borderRadius: 10, marginTop: "15%"
    },
    textInput: { width: "85%", display: "flex", alignSelf: "center", flexDirection: "row", borderColor: "gray", borderWidth: 0.7, paddingHorizontal: 7, borderRadius: 7, marginTop: "5%", height: 45, fontFamily: "serif" },
    signInButton: {
        width: "85%", alignSelf: "center", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: common_color, paddingVertical: 12, borderRadius: 10, marginTop: "6%", elevation: 5
    },
    registerButton: {
        width: "85%", alignSelf: "center", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderColor: common_color, borderWidth: 0.7, paddingVertical: 12, borderRadius: 10, marginTop: "3%", marginBottom: "5%"
    }
})