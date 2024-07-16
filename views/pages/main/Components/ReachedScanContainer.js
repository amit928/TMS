import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCREEN } from '../../../lib/Constants'
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setPickupDetails } from '../reducer';
import { handleDateTime } from '../../../lib/Utils';

export default function ReachedScanContainer(props) {

    const dispatch = useDispatch();

    const [type, setType] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }


    function toggleCameraType() {
        setType(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync({ quality: 0.8, base64: true, skipProcessing: true });
            dispatch(setPickupDetails({ image: data, date_time: handleDateTime(new Date()) }))
            setImageUri(data.uri);
        }
    };

    return (
        <View style={{ height: SCREEN.HEIGHT, width: SCREEN.WIDTH, backgroundColor: "#252746" }}>
            {/* <Header navigation={props.navigation} headerName={"Scan Conainer"} backVisible={true} /> */}

            {
                imageUri ?
                    <View style={{ flex: 1 }} >
                        <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
                        <View style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                            <TouchableOpacity style={{ marginRight: "17%" }} onPress={() => setImageUri("")}>
                                <MaterialCommunityIcons name="camera-retake" size={50} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: "17%" }} onPress={() => { props.navigation.navigate("SignatureScreen", "Reached") }}>
                                <AntDesign name="rightcircle" size={50} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <CameraView flashMode='auto' ref={(ref) => setCamera(ref)} style={styles.camera} type={type}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ position: "absolute", top: 10, left: 10 }}>
                                <AntDesign name="arrowleft" size={45} color="#fff" />
                            </TouchableOpacity>
                            <View style={{ position: "absolute", bottom: 30, display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                {/* <TouchableOpacity style={{ marginRight: "7%" }} onPress={toggleCameraType}>
                                    <Ionicons name="camera-reverse-outline" size={30} color="#fff" />
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={takePicture}>
                                    <Image source={require("../../../Image/capture.png")} style={{ height: 80, width: 80, 
                                        // marginHorizontal: "15%" 
                                        }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CameraView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: "center",
        justifyContent: "center"

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: -30
    },
});
