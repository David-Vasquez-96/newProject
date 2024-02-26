import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    documentsList: [
        {backgroundColor: {r:'238', g:'75', b:'154', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Auditoría Interna', total: 109},
        {backgroundColor: {r:'146', g:'31', b:'143', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Capital Humano', total: 98},
        {backgroundColor: {r:'243', g:'101', b:'14', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Desarrollo', total: 86},
        {backgroundColor: {r:'54', g:'182', b:'111', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Desarrollo Social', total: 77},
        {backgroundColor: {r:'253', g:'189', b:'0', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Innovación y Analítica', total: 101},     
    ],
    tiposDeUSuario: [
        {backgroundColor: {r:'238', g:'75', b:'154', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Operador', total: '3,299'},
        {backgroundColor: {r:'146', g:'31', b:'143', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Administradores', total: '40'},
        {backgroundColor: {r:'243', g:'101', b:'14', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Auditoría', total: '3'},
        {backgroundColor: {r:'54', g:'182', b:'111', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Creación de usuarios', total: '5'},
        {backgroundColor: {r:'253', g:'189', b:'0', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Total', total: '3,347'},
    ],
    newDocument: {backgroundColor: '', image: '', title: '', total: 0},
};

export const documentosSlide = createSlice({
    name: 'documentos',
    initialState,
    reducers: {
        listDocuments: (state, action) => {
            state.documentsList = action.payload;
        },
        saveDataNewDocument: (state, action) => {
            if (action?.payload?.title || action?.payload?.title==='') state.newDocument.title = action?.payload?.title;            
            if (action?.payload?.backgroundColor || action?.payload?.backgroundColor==='') state.newDocument.backgroundColor = action?.payload?.backgroundColor;
            if (action?.payload?.image || action?.payload?.image==='') state.newDocument.image = action?.payload?.image;
            if (action?.payload?.total || action?.payload?.total==='' || action?.payload?.total=== 0) state.newDocument.total = action?.payload?.total;
        },
    }
});

export const { listDocuments, saveDataNewDocument } = documentosSlide.actions;
export default documentosSlide.reducer;