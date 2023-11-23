import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './reducer';
import authenticationReducer from 'main/authentication/sign-in/reducer';
import masterReducer from "main/Master/reducer";
import tradingpartnerReducer from 'main/TradingPartner/reducer';
import connectivityReducer from 'main/Connectivity/reducer';

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    common: commonReducer,
    master: masterReducer,
    tradingpartner: tradingpartnerReducer,
    connectivity: connectivityReducer
  },
})