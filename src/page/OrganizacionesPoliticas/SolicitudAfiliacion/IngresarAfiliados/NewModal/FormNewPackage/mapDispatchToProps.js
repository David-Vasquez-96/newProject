import { actionNames } from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SOLICITUD_AFILIACION_SET_AFILIADO: (nuevoAfiliado) =>
        dispatch({
            "type": actionNames.SOLICITUD_AFILIACION_SET_AFILIADO,
            "state": { "nuevoAfiliado": nuevoAfiliado }
        }),
});
export default mapDispatchToProps;