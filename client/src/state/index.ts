import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./api";
import { configureStore } from '@reduxjs/toolkit';

export interface initialStateType {
    isDarkMode: boolean;
    isSidebarCollapsed: boolean;
    user: User | null;
}

export const initialState: initialStateType = {
    isDarkMode: false,
    isSidebarCollapsed: false,
    user: null,
};


export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
          },
          logout(state) {
            state.user = null;
          },
    },
});

export const { setIsDarkMode, setIsSidebarCollapsed, setUser, logout } = globalSlice.actions;
export default globalSlice.reducer; 