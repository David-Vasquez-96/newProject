import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    userList: [
        // {codigo: 123456, nombreCompleto: 'CARLOS HUMBERTO HERRERA RUIZ', usuario: 'CHHERRERAR', email: 'CHHERRERAR@GMAIL.COM', contraseña: 'Claridad0204#', rolUsuario: {id: 1, name: 'ADMINISTRADOR'}, empresa: {id: 1, name: 'Project X'}},
    ],
};

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
    }
});

export const { setUserList } = usuarioSlice.actions;
export default usuarioSlice.reducer;