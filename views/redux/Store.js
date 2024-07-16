import { configureStore } from '@reduxjs/toolkit'
import commonReducer from '../redux/reducer';
import mainReducer from '../pages/main/reducer';

export default configureStore({
    reducer: {
        common: commonReducer,
        main: mainReducer
    },
})
