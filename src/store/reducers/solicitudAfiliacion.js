const initialState = {
    listaAfiliados: { data: [] }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SOLICITUD_AFILIACION_SET_AFILIADO":
            var newStateList = Object.assign({}, state);
            newStateList.listaAfiliados.data = [...state.listaAfiliados.data, action.state.nuevoAfiliado];
            return newStateList;
        case "SOLICITUD_AFILIACION_DELETE_AFILIADO":
            var newStateList = Object.assign({}, state);
            newStateList.listaAfiliados.data = action.state.nuevoAfiliado;
            return newStateList;
        case "SOLICITUD_AFILIACION_CLEAR_ALL":
            var newStateList = Object.assign({}, state);
            newStateList.listaAfiliados.data = [];
            return newStateList;
        case "SOLICITUD_AFILIACION_SAVE_AFILIADO":
            var newStateList = Object.assign({}, state);
            newStateList.listaAfiliados.data = action.state.nuevoAfiliado;
            return newStateList;
        default:
            return state;
    }
}

export default reducer;