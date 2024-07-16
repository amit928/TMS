import { Button, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React, { useEffect, useState } from 'react'
import { SCREEN, common_color } from '../../../lib/Constants'
import Header from '../../../common/Header'
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';

export default function MyBarCodeScanner(props) {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [barCodeData, setbarCodeData] = useState("")
    const [openModal, setOpenModal] = useState(false);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // console.log("barCodeData", barCodeData)
    return (
        <View style={{ height: SCREEN.HEIGHT, width: SCREEN.WIDTH, backgroundColor: "#252746" }}>
            <Header navigation={props.navigation} headerName={"Bar Code Scanner"} backVisible={true} />

            {barCodeData ?
                <Modal animationType="slide" transparent={true} visible={openModal} onRequestClose={() => { setOpenModal(false) }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <View style={styles.modal}>
                            <View>
                                <Text style={{ color: "#fff", fontSize: 21, fontWeight: "500", fontFamily: "serif" }}>{barCodeData}</Text>
                            </View>
                            <View style={styles.options}>
                                <TouchableOpacity style={styles.button} onPress={() => { setOpenModal(false); props.navigation.navigate("ContainerDetails") }}  >
                                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: "serif" }}>TRANSPORT DOCUMENT NUMBER</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}   >
                                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: "serif" }}>CONTAINER NUMBER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View><Text style={{ color: "#d2d2d2", fontSize: 18, marginTop: 40, fontFamily: "serif" }}>Please Select The Type</Text></View>
                    </View>
                </Modal>
                : <View style={{ width: "100%", height: "70%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Text style={{ color: "#d2d2d2", fontWeight: "500", fontSize: 19, fontFamily: "serif", width: "70%", textAlign: "center" }}>Scan Your Container OR Transport Document Number</Text>
                    <CameraView
                        style={styles.camera}
                        type={facing}
                        barCodeScannerSettings={{
                            barCodeTypes: ['aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a'],
                        }}
                        onBarcodeScanned={(result) => { setbarCodeData(result.data); setOpenModal(true) }}
                    >
                    </CameraView>
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        height: SCREEN.HEIGHT / 4, width: SCREEN.WIDTH / 1.2, alignSelf: "center"
    },
    modal: { height: SCREEN.HEIGHT / 3, width: SCREEN.WIDTH / 1.3, backgroundColor: common_color, borderRadius: 15, elevation: 5, display: "flex", justifyContent: "space-evenly", alignItems: "center" },

    button: { width: "85%", borderRadius: 30, paddingVertical: 15, textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#5d4fbf", borderRadius: 15, elevation: 5, alignSelf: "center", borderColor: "#f2f2f2", borderWidth: 1 },

    options: { width: SCREEN.WIDTH / 1.15, height: "70%", display: "flex", justifyContent: "space-evenly", backgroundColor: "#5d4fbf", marginBottom: "-15%", borderRadius: 20, elevation: 5, }
})

