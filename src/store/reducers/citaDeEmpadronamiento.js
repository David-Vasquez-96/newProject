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
  // datosCiudadanoTable:{},
  datosCiudadanoTable: {
    alfabetismo: 3,
    centroVotacion: null,
    codPuestoEmpadronamiento: null,
    complementoSolicitudesEmpadronamiento: {
      depSolicitud: null,
      departamentoSolicitud: null,
      email: "mortegalemus@gmail.com",
      fechaAsientoNacimiento: null,
      fechaNacionalizacion: null,
      idSolicitud: 257,
      munSolicitud: null,
      municipioSolicitud: null,
      nroBoleta: null,
      nroFolioNacimiento: null,
      nroLibroNacimiento: null,
      nroPartidaNacimiento: null,
      nrolote: null,
      observaciones: null,
      primerApeMadre: "ROCA",
      primerApePadre: "GONZALEZ",
      primerNomMadre: "ARLIN",
      primerNomPadre: "WALTER",
      profesionName: null,
      profesionOficio: null,
      puestoSolicitud: null,
      segundoApeMadre: "JUAREZ",
      segundoApePadre: "ARGUETA",
      segundoNomMadre: "ROXANA",
      segundoNomPadre: "POMPILIO",
      telefono: "+716 7200512",
    },
    comuResidencia: null,
    comunidadResidencia: null,
    control: 3,
    datosDpiSolicitudEmpadronamiento: {
      complementoDpiSolicitud: {
        cui: "2995243960101",
        departamentoElectoral: { id: 1, name: "GUATEMALA" },
        departamentoResidenciaElectoral: 1,
        descripcionOcupacion: "INGENIERO",
        direccionElectoral: "14 CA TIKAL III",
        direccionRenap: "14 CA TIKAL III 32-75 ZONA 7",
        idOcupacion: 14,
        mismaResidenciaElectoral: null,
        munResidenciaElectoral: "1",
        municipioElectoral: {
          id: { id: 1, departamentoId: 1 },
          name: "GUATEMALA",
        },
        nroCasaElectoral: "32-75",
        nroZonaElectoral: 7,
      },
      cui: "2995243960101",
      depCedulaRef: 10,
      depNacimientoDpi: 9,
      depVecindad: 10,
      departamentoNacimiento: {
        id: 9,
        name: "QUETZALTENANGO",
      },
      departamentoVecindad: {
        id: 10,
        name: "SUCHITEPÉQUEZ",
      },
      departamentocedula: {
        id: 10,
        name: "SUCHITEPÉQUEZ",
      },
      fechaAdientoNacDpi: "2002-08-29T06:00:00.000+0000",
      fechaCreacion: "2021-04-16T18:42:53.000+0000",
      fechaEmisionDpi: "2020-08-04T06:00:00.000+0000",
      munCedulaRef: 14,
      munNacimientoDpi: 4,
      munVecindad: 14,
      municipioCedula: {
        id: {
          departamentoId: 10,
          id: 14,
        },
        name: "PATULUL",
      },
      municipioNacimieno: {
        id: { id: 4, departamentoId: 9 },
        name: "SAN CARLOS SIJA",
      },
      municipioVecindad: {
        id: { id: 14, departamentoId: 10 },
        name: "PATULUL",
      },
      nroFolioNacimientoDpi: "195",
      nroLibroNacimientoDpi: "93",
      nroPartidaNacimeintoDpi: "195",
      nroboleta: null,
      numFolioCedulaRef: null,
      numLibroCedulaRef: null,
      numeroSolicitud: 257,
      ordenCedulaRef: null,
      registroCedulaRef: null,
      serieDpi: "29474390",
      usuarioCreador: null,
    },
    datosSolicitudEmpadronamiento: {},
    depEmpadronamiento: null,
    depNacimiento: 7,
    depResidencia: null,
    departamentoEmpadronamiento: null,
    departamentoResidencia: null,
    direccion: null,
    fechaCreacion: "2021-05-24T16:11:45.000+0000",
    fechaInscripcion: null,
    fechaNacimiento: "2002-01-02T06:00:00.000+0000",
    fechaProceso: null,
    fechaUltimaDireccion: null,
    genero: 0,
    idProceso: null,
    idSolicitud: 550,
    munEmpadronamiento: null,
    munNacimiento: 1,
    munResidencia: null,
    municipioEmpadronamiento: null,
    municipioResidencia: null,
    noVidente: 0,
    nombreCompleto: "MAYRA ANDREA FABIOLA, PECHER CUC",
    nroboleta: null,
    numeroCasa: null,
    numeroZona: null,
    primerApellido: "PECHER",
    primerNombre: "MAYRA",
    puestoEmpadronamiento: null,
    segundoApellido: "CUC",
    segundoNombre: "ANDREA FABIOLA",
    status: null,
    tableData: { id: 62 },
    tercerApellido: null,
    usuarioCreador: null,
  },
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
  citaEnProceso: {
    idCita: "",
    cuiCiudadano: "",
    idSolicitud: "",
    cleanRegisterOnExit: false,
  },
  citaEnProcesoVacia: {
    idCita: "",
    cuiCiudadano: "",
    idSolicitud: "",
    cleanRegisterOnExit: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CITA_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA":
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
    case "CITA_EMPADRONAMIENTO_SET_STEP":
      var solicitudEmpadronamientoStepState = Object.assign({}, state);
      solicitudEmpadronamientoStepState.step = action.state.step;
      return solicitudEmpadronamientoStepState;
    case "CITA_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE":
      var solicitudEmpadronamientoDatosCiudadanoTableState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosCiudadanoTableState.datosCiudadanoTable =
        action.state.datosCiudadanoTable;
      return solicitudEmpadronamientoDatosCiudadanoTableState;
    case "CITA_EMPADRONAMIENTO_SET_DATOS_RESIDENCIA":
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
    case "CITA_EMPADRONAMIENTO_SET_ARRAY_LISTADO":
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
    case "CITA_EMPADRONAMIENTO_SET_DATOS_SOLICITUD_RENAP":
      var solicitudEmpadronamientoDatosSolicitudRenapState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosSolicitudRenapState.datosSolicitudRenap =
        action.state.datosSolicitudRenap;
      return solicitudEmpadronamientoDatosSolicitudRenapState;
    case "CITA_EMPADRONAMIENTO_SET_DATOS_IDENTIDAD":
      var solicitudEmpadronamientoDatosIdentidadState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosIdentidadState.datosIdentidad =
        action.state.datosIdentidad;
      return solicitudEmpadronamientoDatosIdentidadState;
    case "CITA_EMPADRONAMIENTO_SET_ES_RECHAZADO_O_EMPADRONADO":
      var solicitudEmpadronamientoEsRechazadoOEmpadronadoState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoEsRechazadoOEmpadronadoState.esRechazadoOEmpadronado =
        action.state.esRechazadoOEmpadronado;
      return solicitudEmpadronamientoEsRechazadoOEmpadronadoState;
    case "CITA_EMPADRONAMIENTO_SET_RECHAZAR_SOLICITUD":
      var solicitudEmpadronamientoRechazarSolicitudState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoRechazarSolicitudState.rechazarSolicitud =
        action.state.rechazarSolicitud;
      return solicitudEmpadronamientoRechazarSolicitudState;
    case "CITA_EMPADRONAMIENTO_SET_CUI_DPI":
      var solicitudEmpadronamientoCuiDpiState = Object.assign({}, state);
      solicitudEmpadronamientoCuiDpiState.cuiDPI = action.state.cuiDPI;
      return solicitudEmpadronamientoCuiDpiState;
    case "CITA_EMPADRONAMIENTO_SET_ESTA_EMPADRONADO":
      var solicitudEmpadronamientoEstaEmpadronadoState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoEstaEmpadronadoState.estaEmpadronado =
        action.state.estaEmpadronado;
      return solicitudEmpadronamientoEstaEmpadronadoState;
    case "CITA_EMPADRONAMIENTO_SET_ESTA_FALLECIDO":
      var solicitudEmpadronamientoEstaFallecidoState = Object.assign({}, state);
      solicitudEmpadronamientoEstaFallecidoState.estaFallecido =
        action.state.estaFallecido;
      return solicitudEmpadronamientoEstaFallecidoState;
    case "CITA_EMPADRONAMIENTO_SET_EVENTO_RENAP":
      var solicitudEmpadronamientoEventoRenapState = Object.assign({}, state);
      solicitudEmpadronamientoEventoRenapState.eventoRENAP =
        action.state.eventoRENAP;
      return solicitudEmpadronamientoEventoRenapState;
    case "CITA_EMPADRONAMIENTO_SET_DATOS_EMPADRONADOR":
      var solicitudEmpadronamientoDatosEmpadronadorState = Object.assign(
        {},
        state
      );
      solicitudEmpadronamientoDatosEmpadronadorState.datosEmpadronador =
        action.state.datosEmpadronador;
      return solicitudEmpadronamientoDatosEmpadronadorState;
    case "CITA_EMPADRONAMIENTO_SET_CITA_EN_PROCESO":
      var citaEmpadronamientoCitaEnProcesoState = Object.assign({}, state);
      citaEmpadronamientoCitaEnProcesoState.citaEnProceso =
        action.state.citaEnProceso;
      return citaEmpadronamientoCitaEnProcesoState;
    default:
      return state;
  }
};

export default reducer;
