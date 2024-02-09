const initialState = {
  step: 0,

  dataUsuarioPorAsociar: {
    cui: "",
    name: "",
    email: "",
  },
  dataUsuarioPorAsociarVacia: {
    cui: "",
    name: "",
    email: "",
  },
  permisoICO: false,
  tipoPermisoICO: "",
  departamentoICO: "",
  municipioICO: "",
  permisoAfiliacion: false,
};

const asociarUsuarios = (state = initialState, action) => {
  switch (action.type) {
    case "ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR":
      var DataState = Object.assign({}, state);
      let newDataUsuarioPorAsociar = {
        cui: action.state.dataUsuarioPorAsociar.cui,
        name: action.state.dataUsuarioPorAsociar.name,
        email: action.state.dataUsuarioPorAsociar.email.toUpperCase(),
      };
      DataState.dataUsuarioPorAsociar = newDataUsuarioPorAsociar;

      return DataState;

    case "ASOCIAR_USUARIOS_SET_STEP":
      var StepState = Object.assign({}, state);
      StepState.step = action.state.step;
      return StepState;

    case "ASOCIAR_USUARIOS_SET_PERMISO_ICO":
      //console.log("ASOCIAR_USUARIOS_SET_PERMISO_ICO");
      var PermisoICOState = Object.assign({}, state);
      let newState = PermisoICOState;
      newState.permisoICO = action.state.permisoICO;
      //PermisoICOState.permisoICO = action.state.permisoICO;
      PermisoICOState = newState;
      return PermisoICOState;

    case "ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO":
      //console.log("ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO");
      var TipoPermisoICOState = Object.assign({}, state);
      TipoPermisoICOState.tipoPermisoICO = action.state.tipoPermisoICO;
      return TipoPermisoICOState;

    case "ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO":
      //console.log("ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO");
      var DepartamentoICOState = Object.assign({}, state);
      DepartamentoICOState.departamentoICO = action.state.departamentoICO;
      return DepartamentoICOState;

    case "ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO":
      //console.log("ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO");
      var MunicipioICOState = Object.assign({}, state);
      MunicipioICOState.municipioICO = action.state.municipioICO;
      return MunicipioICOState;

    case "ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION":
      var PermisoAfiliacionState = Object.assign({}, state);
      PermisoAfiliacionState.permisoAfiliacion = action.state.permisoAfiliacion;
      return PermisoAfiliacionState;

    default:
      return state;
  }
};

export default asociarUsuarios;
