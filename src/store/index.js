import { configureStore } from "@reduxjs/toolkit";
import categoriaSlide from './reducers/categoriaSlide'
import menuSlice from './reducers/menuSlice'
import securitySlice from './reducers/SecuritySlice'

export default configureStore ({
    reducer: {
        categoria: categoriaSlide,
        menu: menuSlice,
        security: securitySlice
    }
})