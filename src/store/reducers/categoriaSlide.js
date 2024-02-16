import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    categoryList: [
        {order: 1, borderColor: '#F3650E', icon: 'assets/PerfilUsuario.png', title: 'Instructivos', titleColor: '#034DA1'},
        {order: 1, borderColor: '#36B66F', icon: 'assets/PerfilUsuario.png', title: 'Políticas', titleColor: '#034DA1'},
        {order: 1, borderColor: '#FDBD00', icon: 'assets/PerfilUsuario.png', title: 'Procedimientos', titleColor: '#034DA1'},
        {order: 1, borderColor: '#0080CB', icon: 'assets/PerfilUsuario.png', title: 'Manuales', titleColor: '#034DA1'},
        {order: 1, borderColor: '#921F8F', icon: 'assets/PerfilUsuario.png', title: 'Matrices', titleColor: '#034DA1'},
        // {order: 1, borderColor: '#EE4B9A', icon: 'assets/PerfilUsuario.png', title: 'Planes', titleColor: '#034DA1'},
        // {order: 1, borderColor: '#921F8F', icon: 'assets/PerfilUsuario.png', title: 'Documentos Especiales', titleColor: '#034DA1'},
        // {order: 1, borderColor: '#F3650E', icon: 'assets/PerfilUsuario.png', title: 'Formatos', titleColor: '#034DA1'},
        // {order: 1, borderColor: '#36B66F', icon: 'assets/PerfilUsuario.png', title: 'Comunicados', titleColor: '#034DA1'},
        // {order: 1, borderColor: '#FDBD00', icon: 'assets/PerfilUsuario.png', title: 'Auditoría', titleColor: '#034DA1'},        
    ],
    processList: [
        {order: 1, backgroundColor:'#F3650E', icon: 'assets/subir.svg', title: 'Instructivos', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#36B66F', icon: 'assets/subir.svg', title: 'Políticas', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#FDBD00', icon: 'assets/subir.svg', title: 'Procedimientos', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#0080CB', icon: 'assets/subir.svg', title: 'Manuales', titleColor: '#034DA1'},
        {order: 1, backgroundColor:'#921F8F', icon: 'assets/subir.svg', title: 'Matrices', titleColor: '#034DA1'},
        // {order: 1, backgroundColor:'#EE4B9A', icon: 'assets/subir.svg', title: 'Planes', titleColor: '#034DA1'},
        // {order: 1, backgroundColor:'#921F8F', icon: 'assets/subir.svg', title: 'Documentos Especiales', titleColor: '#034DA1'},
        // {order: 1, backgroundColor:'#F3650E', icon: 'assets/subir.svg', title: 'Formatos', titleColor: '#034DA1'},
        // {order: 1, backgroundColor:'#36B66F', icon: 'assets/subir.svg', title: 'Comunicados', titleColor: '#034DA1'},
        // {order: 1, backgroundColor:'#FDBD00', icon: 'assets/subir.svg', title: 'Auditoría', titleColor: '#034DA1'},
    ],
    newCategory: {title: '', borderColor: '', icon: '',},
    data:'5' 
};

export const categoriaSlide = createSlice({
    name: 'categoria',
    initialState,
    reducers: {
        listCategory: (state, action) => {
            state.listCategory = action.payload;
        },
        saveDataNewCategory: (state, action) => {
            if (action?.payload?.title || action?.payload?.title==='') state.newCategory.title = action?.payload?.title;            
            if (action?.payload?.borderColor) state.newCategory.borderColor = action?.payload?.borderColor;
            if (action?.payload?.icon) state.newCategory.icon = action?.payload?.icon;
        },
    }
});

export const { saveDataNewCategory } = categoriaSlide.actions;
export default categoriaSlide.reducer;