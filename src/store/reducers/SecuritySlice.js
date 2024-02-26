import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from 'lodash';

const initialState = { 
    authenticated: false, 
    currentUser: null, 
    menu: [], 
    formGroup: [
        // {idGrupo: 0, grupoFormulario: 'Módulo de Administrador', iconoGrupo: 'security', form:[], type: 1},
        {idGrupo: 1, grupoFormulario: 'Módulo de Categorias', iconoGrupo: 'description', form:[], type: 1},
        {idGrupo: 2, grupoFormulario: 'Módulo de Procesos', iconoGrupo: 'description', form:[], type: 1},
        {idGrupo: 3, grupoFormulario: 'Módulo de Seguridad', iconoGrupo: 'security', form:[], type: 1,},        
        {idGrupo: 4, grupoFormulario: 'Módulo de Documentos', iconoGrupo: 'description', form:[], type: 2, ruta: '/moduloDocumentos'},        
    ], 
    forms: [
        {
            idGrupo: 1, grupoFormulario: 'Módulo de Categorias', idForm: 1, nombreFormulario: 'Categorias', iconoFormulario: 'description', 
            ruta: '/categorias', type: 2, create: false, read: false, update: false, delete: false,
        },
        {
            idGrupo: 2, grupoFormulario: 'Módulo de Procesos', idForm: 1, nombreFormulario: 'Procesos', iconoFormulario: 'description', 
            ruta: '/procesos', type: 2, create: false, read: false, update: false, delete: false,
        },
        {
            idGrupo: 3, grupoFormulario: 'Módulo de Seguridad', idForm: 1, nombreFormulario: 'Roles', iconoFormulario: 'desktop_windows', 
            ruta: '/roles', type: 2, create: false, read: true, update: false, delete: false,
        },
        {
            idGrupo: 3, grupoFormulario: 'Módulo de Seguridad', idForm: 2,nombreFormulario: 'Usuarios', iconoFormulario: 'people', 
            ruta: '/usuarios', type: 2, create: false, read: false, update: false, delete: false,
        },
    ] 
};

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
        setForms: (state, action) => {
            state.forms = action.payload;
        },
        setFormGroup: (state, action) => {
            state.formGroup = action.payload;
        },
        logout: (state, action) => {
           return initialState;
        }
    }
});

export const { setCurrentUser, setMenu, setFormGroup, setForms, logout } = securitySlice.actions;
export default securitySlice.reducer;