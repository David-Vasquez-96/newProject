import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    categoryList: [
        // {id: 1, borderColor: {r:'238', g:'75', b:'154', a:'100'}, icon: 'assets/PerfilUsuario.png', name: 'Instructivos'},
        // {id: 2, borderColor: {r:'146', g:'31', b:'143', a:'100'}, icon: 'assets/PerfilUsuario.png', name: 'Politicas'},
        // {id: 3, borderColor: {r:'243', g:'101', b:'14', a:'100'}, icon: 'assets/PerfilUsuario.png', name: 'Procedimientos'},
        // {id: 4, borderColor: {r:'54', g:'182', b:'111', a:'100'}, icon: 'assets/PerfilUsuario.png', name: 'Manuales'},
        // {id: 5, borderColor: {r:'253', g:'189', b:'0', a:'100'}, icon: 'assets/PerfilUsuario.png', name: 'Matrices'},
        // {borderColor: {r:'253', g:'189', b:'0', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Matrices'},
        // {borderColor: {r:'253', g:'189', b:'0', a:'100'}, icon: 'assets/PerfilUsuario.png', title: 'Matrices'},
        // {borderColor: '#EE4B9A', icon: 'assets/PerfilUsuario.png', title: 'Planes'},
        // {borderColor: '#921F8F', icon: 'assets/PerfilUsuario.png', title: 'Documentos Especiales'},
        // {borderColor: '#F3650E', icon: 'assets/PerfilUsuario.png', title: 'Formatos'},
        // {borderColor: '#36B66F', icon: 'assets/PerfilUsuario.png', title: 'Comunicados'},
        // {borderColor: '#FDBD00', icon: 'assets/PerfilUsuario.png', title: 'Auditoría'},        
    ],
    newCategory: {id: 0, borderColor: '', icon: '', name: ''},
};

export const categoriaSlide = createSlice({
    name: 'categoria',
    initialState,
    reducers: {
        listCategory: (state, action) => {
            state.categoryList = action.payload;
        },
        saveDataNewCategory: (state, action) => {
            if (action?.payload?.id || action?.payload?.id==='') state.newCategory.id = action?.payload?.id;
            if (action?.payload?.name || action?.payload?.name==='') state.newCategory.name = action?.payload?.name;
            if (action?.payload?.borderColor || action?.payload?.borderColor==='') state.newCategory.borderColor = action?.payload?.borderColor;
            if (action?.payload?.icon || action?.payload?.icon==='') state.newCategory.icon = action?.payload?.icon;
        },
    }
});

export const { listCategory, saveDataNewCategory } = categoriaSlide.actions;
export default categoriaSlide.reducer;