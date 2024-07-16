import { View, Text, Modal, ActivityIndicator, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/reducer';

export default function Loader() {

    const dispatch = useDispatch();

    const loading = useSelector((store) => store.common.loading)

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
            onRequestClose={() => {
                dispatch(setLoading(false))
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* <ActivityIndicator size={'large'} /> */}
                    <Image source={require("../Image/truck.gif")} />
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
    }
});