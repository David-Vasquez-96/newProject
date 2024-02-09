const initialState = {
  step: 0,
  data: {
    direccion: "",
    nocasalote: "",
    zona: "",
    departamento: "",
    municipio: "",
    comunidad: "",
    profesion: "",
  },
  datosResidencia: {
    nombreDepartamento: "",
    nombreMunicipio: "",
    nombreComunidad: "",
    cenVotacion: "",
    nombreOcupaciones: "",
    position1: "",
    position2: "",
    position3: "",
    position4: "",
  },
  solicitudesEmpadronamiento: [],
  /*   datosCiudadanoTable: {
    cui: "2995243960101",
    fechaEmisionDpi: "2020-08-04T06:00:00.000+0000",
    serieDpi: "29474390",
    fechaNacimiento: "2002-01-02T06:00:00.000+0000",
    genero: 1,
    departamentoNacimiento: {
      id: 9,
      name: "QUETZALTENANGO",
    },
    municipioNacimiento: {
      id: { id: 4, departamentoId: 9 },
      name: "SAN CARLOS SIJA",
    },
    primerNombre: "MAYRA",
    segundoNombre: "ANDREA FABIOLA",
    primerApellido: "PECHER",
    segundoApellido: "CUC",
    tercerApellido: "",
    direccionElectoral: "14 CA TIKAL III",
    nroCasaElectoral: "32-75",
    nroZonaElectoral: 7,
    telefono: "+716 7200512",
    email: "mortegalemus@gmail.com",
    descripcionOcupacion: "INGENIERO",
  }, */
  datosCiudadanoTable: {
    cui: "",
    fechaEmisionDpi: "",
    serieDpi: "",
    fechaNacimiento: "",
    genero: "",
    departamentoNacimiento: {
      id: "",
      name: "",
    },
    municipioNacimiento: {
      id: { id: "", departamentoId: "" },
      name: "",
    },
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tercerApellido: "",
    apellidoCasada: "",
    direccionElectoral: "",
    nroCasaElectoral: "",
    nroZonaElectoral: "",
    telefono: "",
    email: "",
    descripcionOcupacion: "",
    fechaUltimaDirección: "",
    departamentoEmpadronamientoId: "",
    municipioEmpadronamientoId: "",
  },
  datosCiudadanoTableDefault: {
    cui: "",
    fechaEmisionDpi: "",
    serieDpi: "",
    fechaNacimiento: "",
    departamentoNacimiento: {
      id: "",
      name: "",
    },
    municipioNacimiento: {
      id: { id: "", departamentoId: "" },
      name: "",
    },
    genero: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tercerApellido: "",
    apellidoCasada: "",
    direccionElectoral: "",
    nroCasaElectoral: "",
    nroZonaElectoral: "",
    telefono: "",
    email: "",
    descripcionOcupacion: "",
    descripcionOcupacionId: "",
    fechaUltimaDirección: "",
    departamentoEmpadronamientoId: "",
    departamentoEmpadronamientoName: "",
    municipioEmpadronamientoId: "",
    municipioEmpadronamientoName: "",
    paisEmpadronamientoId: "",
    estadoEmpadronamientoId: "",
    ciudadEmpadronamientoId: "",
  },
  dontAllowChange: false,
  ArrayListado: {
    ArrayDepartamento: [],
    ArrayMunicipio: [],
    ArrayComunidad: [],
    ArrayOcupaciones: [],
  },
  datosSolicitudRenap: "",
  datosIdentidad: [],
  esRechazadoOEmpadronado: false,
  rechazarSolicitud: false,
  cuiDPI: "",
  estaEmpadronado: false,
  estaFallecido: false,
  eventoRENAP: false,
  datosEmpadronador: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SOLICITUD_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA":
      var solicitudEmpadronamientoDataState = Object.assign({}, state);
      solicitudEmpadronamientoDataState.data.direccion =
        action.state.data.direccion.value;
      solicitudEmpadronamientoDataState.data.nocasalote =
        action.state.data.nocasalote.value;
      solicitudEmpadronamientoDataState.data.zona =
        action.state.data.zona.value;
      solicitudEmpadronamientoDataState.data.departamento =
        action.state.data.departamento.value;
      solicitudEmpadronamientoDataState.data.municipio =
        action.state.data.municipio.value;
      solicitudEmpadronamientoDataState.data.comunidad =
        action.state.data.comunidad.value;
      solicitudEmpadronamientoDataState.data.profesion =
        action.state.data.profesion.value;
      return solicitudEmpadronamientoDataState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_STEP":
      var solicitudEmpadronamientoStepState = Object.assign({}, state);
      solicitudEmpadronamientoStepState.step = action.state.step;
      return solicitudEmpadronamientoStepState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE":
      var solicitudEmpadronamientoDatosCiudadanoTableState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosCiudadanoTableState.datosCiudadanoTable =
        action.state.datosCiudadanoTable;
      return solicitudEmpadronamientoDatosCiudadanoTableState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES":
      var solicitudEmpadronamientoSolicitudesState = Object.assign({}, state);
      solicitudEmpadronamientoSolicitudesState.solicitudesEmpadronamiento =
        action.state.solicitudesEmpadronamiento;
      return solicitudEmpadronamientoSolicitudesState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_DATOS_RESIDENCIA":
      var solicitudEmpadronamientoDatosResidenciaState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.nombreDepartamento =
        action.state.datosResidencia.nombreDepartamento;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.nombreMunicipio =
        action.state.datosResidencia.nombreMunicipio;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.nombreComunidad =
        action.state.datosResidencia.nombreComunidad;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.cenVotacion =
        action.state.datosResidencia.cenVotacion;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.nombreOcupaciones =
        action.state.datosResidencia.nombreOcupaciones;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.position1 =
        action.state.datosResidencia.position1;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.position2 =
        action.state.datosResidencia.position2;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.position3 =
        action.state.datosResidencia.position3;
      solicitudEmpadronamientoDatosResidenciaState.datosResidencia.position4 =
        action.state.datosResidencia.position4;
      return solicitudEmpadronamientoDatosResidenciaState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_ARRAY_LISTADO":
      var solicitudEmpadronamientoArrayListadoState = Object.assign({}, state);
      solicitudEmpadronamientoArrayListadoState.ArrayListado.ArrayDepartamento =
        action.state.ArrayListado.ArrayDepartamento;
      solicitudEmpadronamientoArrayListadoState.ArrayListado.ArrayMunicipio =
        action.state.ArrayListado.ArrayMunicipio;
      solicitudEmpadronamientoArrayListadoState.ArrayListado.ArrayComunidad =
        action.state.ArrayListado.ArrayComunidad;
      solicitudEmpadronamientoArrayListadoState.ArrayListado.ArrayOcupaciones =
        action.state.ArrayListado.ArrayOcupaciones;
      return solicitudEmpadronamientoArrayListadoState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_DATOS_SOLICITUD_RENAP":
      var solicitudEmpadronamientoDatosSolicitudRenapState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosSolicitudRenapState.datosSolicitudRenap =
        action.state.datosSolicitudRenap;
      return solicitudEmpadronamientoDatosSolicitudRenapState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_DATOS_IDENTIDAD":
      var solicitudEmpadronamientoDatosIdentidadState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosIdentidadState.datosIdentidad =
        action.state.datosIdentidad;
      return solicitudEmpadronamientoDatosIdentidadState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_ES_RECHAZADO_O_EMPADRONADO":
      var solicitudEmpadronamientoEsRechazadoOEmpadronadoState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoEsRechazadoOEmpadronadoState.esRechazadoOEmpadronado =
        action.state.esRechazadoOEmpadronado;
      return solicitudEmpadronamientoEsRechazadoOEmpadronadoState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_RECHAZAR_SOLICITUD":
      var solicitudEmpadronamientoRechazarSolicitudState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoRechazarSolicitudState.rechazarSolicitud =
        action.state.rechazarSolicitud;
      return solicitudEmpadronamientoRechazarSolicitudState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_CUI_DPI":
      var solicitudEmpadronamientoCuiDpiState = Object.assign({}, state);
      solicitudEmpadronamientoCuiDpiState.cuiDPI = action.state.cuiDPI;
      return solicitudEmpadronamientoCuiDpiState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_ESTA_EMPADRONADO":
      var solicitudEmpadronamientoEstaEmpadronadoState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoEstaEmpadronadoState.estaEmpadronado =
        action.state.estaEmpadronado;
      return solicitudEmpadronamientoEstaEmpadronadoState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_ESTA_FALLECIDO":
      var solicitudEmpadronamientoEstaFallecidoState = Object.assign({}, state);
      solicitudEmpadronamientoEstaFallecidoState.estaFallecido =
        action.state.estaFallecido;
      return solicitudEmpadronamientoEstaFallecidoState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_EVENTO_RENAP":
      var solicitudEmpadronamientoEventoRenapState = Object.assign({}, state);
      solicitudEmpadronamientoEventoRenapState.eventoRENAP =
        action.state.eventoRENAP;
      return solicitudEmpadronamientoEventoRenapState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_DATOS_EMPADRONADOR":
      var solicitudEmpadronamientoDatosEmpadronadorState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosEmpadronadorState.datosEmpadronador =
        action.state.datosEmpadronador;
      return solicitudEmpadronamientoDatosEmpadronadorState;
    case "SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE":
      let solicitudEmpadronamientoDontAllowChangeState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDontAllowChangeState.dontAllowChange =
        action.state.dontAllowChange;
      return solicitudEmpadronamientoDontAllowChangeState;
    default:
      return state;
  }
};

export default reducer;
