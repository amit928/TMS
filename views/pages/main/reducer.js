import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_DATA } from '../../lib/Constants'

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        shipmentList: DEFAULT_DATA,
        shipmentDetails: {},
        pickupDetails: {},
        shipmentStageDetails: {}
    },
    reducers: {
        setShipmentList: (state, action) => {
            state.shipmentList = action.payload
        },
        setShipmentDetails: (state, action) => {
            state.shipmentDetails = action.payload
        },
        setShipmentStageDetails: (state, action) => {
            state.shipmentStageDetails = action.payload
        },
        setPickupDetails: (state, action) => {
            state.pickupDetails = action.payload
        },
    },
})

export const { setShipmentList, setShipmentDetails, setPickupDetails, setShipmentStageDetails } = mainSlice.actions

export default mainSlice.reducer
