import { configureStore } from "@reduxjs/toolkit";
import menuSlice from './reducers/menuSlice'
import securitySlice from './reducers/SecuritySlice'
import categoriaSlide from './reducers/categoriaSlide'
import procesosSlice from './reducers/ProcesosSlice'

export default configureStore ({
    reducer: {
        menu: menuSlice,
        security: securitySlice,
        categoria: categoriaSlide,
        proceso: procesosSlice,
    }
})