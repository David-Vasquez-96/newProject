import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    // carpetas
    documentsList: [
        {idCarpeta: 1, backgroundColor: {r:'238', g:'75', b:'154', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Auditoría Interna', total: 109},
        {idCarpeta: 2, backgroundColor: {r:'146', g:'31', b:'143', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Capital Humano', total: 98},
        {idCarpeta: 3, backgroundColor: {r:'243', g:'101', b:'14', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Desarrollo', total: 86},
        {idCarpeta: 4, backgroundColor: {r:'54', g:'182', b:'111', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Desarrollo Social', total: 77},
        {idCarpeta: 5, backgroundColor: {r:'253', g:'189', b:'0', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Innovación y Analítica', total: 101},     
    ],
    tiposDeUSuario: [
        {backgroundColor: {r:'238', g:'75', b:'154', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Operador', total: '3,299'},
        {backgroundColor: {r:'146', g:'31', b:'143', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Administradores', total: '40'},
        {backgroundColor: {r:'243', g:'101', b:'14', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Auditoría', total: '3'},
        {backgroundColor: {r:'54', g:'182', b:'111', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Creación de usuarios', total: '5'},
        {backgroundColor: {r:'253', g:'189', b:'0', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Total', total: '3,347'},
    ],
    newDocument: {idCarpeta: 0, backgroundColor: '', image: '', title: '', total: 0},
    // subcarpetas
    subDocumentsList: [
        {idCarpeta: 1, idSubCarpeta: 1, backgroundColor: {r:'238', g:'75', b:'154', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Analítica', total: 42},
        {idCarpeta: 1, idSubCarpeta: 2, backgroundColor: {r:'146', g:'31', b:'143', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Calidad y Mejora Continua', total: 39},
        {idCarpeta: 2, idSubCarpeta: 1, backgroundColor: {r:'243', g:'101', b:'14', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Innovación', total: 28},
        {idCarpeta: 3, idSubCarpeta: 1, backgroundColor: {r:'54', g:'182', b:'111', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Proyectos', total: 5},
        {idCarpeta: 3, idSubCarpeta: 2, backgroundColor: {r:'253', g:'189', b:'0', a:'100'}, image: 'assets/PerfilUsuario.png', title: 'Operaciones', total: 10},     
    ],
    newSubDocument: {idCarpeta: 0, idSubCarpeta:0, backgroundColor: '', image: '', title: '', total: 0},
    folderData: {},
    // archivos
    filesList:[
        {idCarpeta: 0, idSubCarpeta: 0, idCategoria: 0, idArchivo:0, formato: '.pdf', type: 1,  nombreArchivo: 'Documentos', version: 'V.5', usuario: 'MDHERRERAV', publicacion: '30/06/2023', },
        {idCarpeta: 0, idSubCarpeta: 0, idCategoria: 0, idArchivo:0, formato: '.xlsx', type: 2, nombreArchivo: 'Archivos', version: 'V.10', usuario: 'JRAMIREZ', publicacion: '12/06/2023', },
        {idCarpeta: 0, idSubCarpeta: 0, idCategoria: 0, idArchivo:0, formato: '.docx', type: 3, nombreArchivo: 'Tecnicas de estudio', version: 'V.8', usuario: 'PPEREZ', publicacion: '11/06/2023', },
        {idCarpeta: 0, idSubCarpeta: 0, idCategoria: 0, idArchivo:0, formato: '.png', type: 4, nombreArchivo: 'Procesos', version: 'V.2', usuario: 'CMVASQUEZ', publicacion: '18/05/2023', },
        {idCarpeta: 0, idSubCarpeta: 0, idCategoria: 0, idArchivo:0, formato: '.mp4', type: 5, nombreArchivo: 'Lineamientos', version: 'V.5', usuario: 'JJMORALES', publicacion: '01/05/2023', },
    ],
    datosDeDocumento: {},
    saveNewFile: {idCarpeta: 0, idSubCarpeta: 0, idCategoria: 0, idArchivo:0, formato: '', type: 0,  nombreArchivo: '', version: '', usuario: '', publicacion: '', },
};

export const documentosSlide = createSlice({
    name: 'documentos',
    initialState,
    reducers: {
        //carpetas
        listDocuments: (state, action) => {
            state.documentsList = action.payload;
        },
        saveDataNewDocument: (state, action) => {
            if (action?.payload?.title || action?.payload?.title==='') state.newDocument.title = action?.payload?.title;            
            if (action?.payload?.backgroundColor || action?.payload?.backgroundColor==='') state.newDocument.backgroundColor = action?.payload?.backgroundColor;
            if (action?.payload?.image || action?.payload?.image==='') state.newDocument.image = action?.payload?.image;
            if (action?.payload?.total || action?.payload?.total==='' || action?.payload?.total=== 0) state.newDocument.total = action?.payload?.total;
        },
        saveFolderData: (state, action) => {
            var newState = Object.assign({}, state);
            newState.folderData = action.payload
            return newState;
        },
        //subcarpetas
        listSubDocuments: (state, action) => {
            state.subDocumentsList = action.payload;
        },
        saveDataNewSubDocument: (state, action) => {
            if (action?.payload?.title || action?.payload?.title==='') state.newSubDocument.title = action?.payload?.title;            
            if (action?.payload?.backgroundColor || action?.payload?.backgroundColor==='') state.newSubDocument.backgroundColor = action?.payload?.backgroundColor;
            if (action?.payload?.image || action?.payload?.image==='') state.newSubDocument.image = action?.payload?.image;
            if (action?.payload?.total || action?.payload?.total==='' || action?.payload?.total=== 0) state.newSubDocument.total = action?.payload?.total;
        },
        //archivos
        setFolderInformation: (state, action) => {
            var newState = Object.assign({}, state);
            newState.datosDeDocumento = action.payload
            return newState;
        },
        saveDataNewFile: (state, action) => {
            if (action?.payload?.title || action?.payload?.title==='') state.saveNewFile.formato = action?.payload?.formato;
        },        
    }
});

export const { listDocuments, saveDataNewDocument, saveFolderData, listSubDocuments, saveDataNewSubDocument, setFolderInformation } = documentosSlide.actions;
export default documentosSlide.reducer;