import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    categoryList: [
        {borderColor: {r:'238', g:'75', b:'154', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Instructivos'},
        {borderColor: {r:'146', g:'31', b:'143', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Politicas'},
        {borderColor: {r:'243', g:'101', b:'14', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Procedimientos'},
        {borderColor: {r:'54', g:'182', b:'111', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Manuales'},
        {borderColor: {r:'253', g:'189', b:'0', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Matrices'},
        // {borderColor: {r:'253', g:'189', b:'0', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Matrices'},
        // {borderColor: {r:'253', g:'189', b:'0', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Matrices'},
        // {borderColor: '#EE4B9A', icon: 'assets/PerfilUsuario.png', title: 'Planes'},
        // {borderColor: '#921F8F', icon: 'assets/PerfilUsuario.png', title: 'Documentos Especiales'},
        // {borderColor: '#F3650E', icon: 'assets/PerfilUsuario.png', title: 'Formatos'},
        // {borderColor: '#36B66F', icon: 'assets/PerfilUsuario.png', title: 'Comunicados'},
        // {borderColor: '#FDBD00', icon: 'assets/PerfilUsuario.png', title: 'Auditoría'},        
    ],
    processList: [
        {backgroundColor: {r:'243', g:'101', b:'14', a:'100'}, icon: 'assets/subir.svg', title: 'Instructivos 1'},
        {backgroundColor: {r:'253', g:'189', b:'0', a:'100'}, icon: 'assets/subir.svg', title: 'Políticas 1'},
        {backgroundColor: {r:'146', g:'31', b:'143', a:'100'}, icon: 'assets/subir.svg', title: 'Procedimientos 1'},
        {backgroundColor: {r:'238', g:'75', b:'154', a:'100'}, icon: 'assets/subir.svg', title: 'Manuales 1'},
        {backgroundColor: {r:'54', g:'182', b:'111', a:'100'}, icon: 'assets/subir.svg', title: 'Matrices 1'},
        // {backgroundColor:'#EE4B9A', icon: 'assets/subir.svg', title: 'Planes'},
        // {backgroundColor:'#921F8F', icon: 'assets/subir.svg', title: 'Documentos Especiales'},
        // {backgroundColor:'#F3650E', icon: 'assets/subir.svg', title: 'Formatos'},
        // {backgroundColor:'#36B66F', icon: 'assets/subir.svg', title: 'Comunicados'},
        // {backgroundColor:'#FDBD00', icon: 'assets/subir.svg', title: 'Auditoría'},
    ],
    newCategory: {borderColor: '', icon: '', title: ''},
};

export const categoriaSlide = createSlice({
    name: 'categoria',
    initialState,
    reducers: {
        listCategory: (state, action) => {
            state.categoryList = action.payload;
        },
        saveDataNewCategory: (state, action) => {
            if (action?.payload?.title || action?.payload?.title==='') state.newCategory.title = action?.payload?.title;            
            if (action?.payload?.borderColor || action?.payload?.borderColor==='') state.newCategory.borderColor = action?.payload?.borderColor;
            if (action?.payload?.icon || action?.payload?.icon==='') state.newCategory.icon = action?.payload?.icon;
        },
    }
});

export const { listCategory, saveDataNewCategory } = categoriaSlide.actions;
export default categoriaSlide.reducer;