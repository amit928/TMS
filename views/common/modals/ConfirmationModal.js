import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SCREEN } from '../../lib/Constants';

export default function ConfirmationModal(props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                props.onClose();
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{display:"flex", justifyContent:"center", alignItems:"center", height:"80%", width:"85%"}}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
                            {props.headerText}
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#323761", width: "40%", borderRadius: 15, elevation: 5 }} onPress={() => { props.onClose() }} >
                            <Text style={{ color: "#fff", fontSize: 17, fontFamily: "serif" }}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.tabTouch, backgroundColor: "#5d4fbf", width: "40%", borderRadius: 15, elevation: 5 }} onPress={() => { props.onSubmit() }} >
                            <Text style={{ color: "#fff", fontSize: 17, fontFamily: "serif" }}>YES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    modalView: {
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: "#323761",
        height: SCREEN.HEIGHT / 3.5,
        width: SCREEN.WIDTH / 1.5,
    },
    tabTouch: { width: "50%", borderRadius: 30, paddingVertical: 10, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" },

    footer: { position: "absolute", bottom: 0, borderTopColor: "#f2f2f2", borderTopWidth: 0.5, display: "flex", flexDirection: "row", paddingVertical: 10, justifyContent: "space-evenly", width: "100%" },
});