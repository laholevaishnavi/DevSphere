import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
import requestReducer from './requestSlice';

const appStore = configureStore(
  {
    reducer:{
      user:userReducer,
      feed:feedReducer,
      request :requestReducer,
      connection : connectionReducer,
    }

  }
);
export default appStore;