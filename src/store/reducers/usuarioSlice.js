import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    userList: [
        {codigo: 123456, nombreCompleto: 'Mario David Herrera Vásquez', usuario: 'mdherrerav', email: 'mdherrerav@gmail.com', contraseña: 'Claridad0204#', rolUsuario: {id: 1, name: 'ADMINISTRADOR'}, empresa: {id: 1, name: 'Project X'}},
    ]
};

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        // saveDataNewUser: (state, action) => {
        //     if (action?.payload?.title || action?.payload?.title==='') state.newUser.title = action?.payload?.title;            
        //     if (action?.payload?.borderColor || action?.payload?.borderColor==='') state.newUser.borderColor = action?.payload?.borderColor;
        //     if (action?.payload?.icon || action?.payload?.icon==='') state.newUser.icon = action?.payload?.icon;
        // },
    }
});

export const { setUserList, saveDataNewUser } = usuarioSlice.actions;
export default usuarioSlice.reducer;