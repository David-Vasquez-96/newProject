import { createSlice } from "@reduxjs/toolkit";

const initialState = { authenticated: false, currentUser: null, menu: [] };

export const securitySlice = createSlice({
    name: 'security',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            state.authenticated = (action.payload === null || action.payload === undefined) ? false : true;
        },
        setMenu: (state, action) => {
            state.menu = action.payload;
        },
        logout: (state, action) => {
           return initialState;
        }
    }
});

export const { setCurrentUser, setMenu, logout } = securitySlice.actions;
export default securitySlice.reducer;