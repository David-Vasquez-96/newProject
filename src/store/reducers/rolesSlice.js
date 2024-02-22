import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    rolesList: [   
        {id: 1, name: 'ADMINISTRADOR'},
    ],
};

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRolesList: (state, action) => {
            state.rolesList = action.payload;
        },
    }
});

export const { setRolesList } = rolesSlice.actions;
export default rolesSlice.reducer;