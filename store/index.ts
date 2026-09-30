import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui.slice";
import authReducer from "./features/auth/authSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
          ui: uiReducer,
          auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];