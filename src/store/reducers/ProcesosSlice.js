import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    processList: [
        {backgroundColor: {r:'243', g:'101', b:'14', a:'100'}, image: 'assets/subir.svg', title: 'Instructivos 1'},
        {backgroundColor: {r:'253', g:'189', b:'0', a:'100'}, image: 'assets/subir.svg', title: 'Políticas 1'},
        {backgroundColor: {r:'146', g:'31', b:'143', a:'100'}, image: 'assets/subir.svg', title: 'Procedimientos 1'},
        {backgroundColor: {r:'238', g:'75', b:'154', a:'100'}, image: 'assets/subir.svg', title: 'Manuales 1'},
        {backgroundColor: {r:'54', g:'182', b:'111', a:'100'}, image: 'assets/subir.svg', title: 'Matrices 1'},
        // {backgroundColor:'#EE4B9A', icon: 'assets/subir.svg', title: 'Planes'},
        // {backgroundColor:'#921F8F', icon: 'assets/subir.svg', title: 'Documentos Especiales'},
        // {backgroundColor:'#F3650E', icon: 'assets/subir.svg', title: 'Formatos'},
        // {backgroundColor:'#36B66F', icon: 'assets/subir.svg', title: 'Comunicados'},
        // {backgroundColor:'#FDBD00', icon: 'assets/subir.svg', title: 'Auditoría'},
    ],
    newProcess: {backgroundColor: '', image: '', title: ''},
};

export const procesosSlice = createSlice({
    name: 'proceso',
    initialState,
    reducers: {
        updateProcessList: (state, action) => {
            state.processList = action.payload;
        },
        saveNewProcessData: (state, action) => {
            if (action?.payload?.title || action?.payload?.title==='') state.newProcess.title = action?.payload?.title;            
            if (action?.payload?.backgroundColor || action?.payload?.backgroundColor==='') state.newProcess.backgroundColor = action?.payload?.backgroundColor;
            if (action?.payload?.image || action?.payload?.image==='') state.newProcess.image = action?.payload?.image;
        },
    }
});

export const { updateProcessList, saveNewProcessData } = procesosSlice.actions;
export default procesosSlice.reducer;