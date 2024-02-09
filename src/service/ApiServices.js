import ApiGenericServicesData from "service/ApiGenericServicesData";
import UserSecurity from "service/UserSecurity";
import User from "service/User";
import SolicitudUsuario from "service/SolicitudUsuario";
import Company from "service/Company";
import CertificacionDeAfiliacionAPartidoPolitico from "service/CertificacionDeAfiliacionAPartidoPolitico";
import CertificacionDeGoceDeSusDerechosPoliticos from "service/CertificacionDeGoceDeSusDerechosPoliticos";
import ConstanciaDeInscripcionComoDirectivo from "service/ConstanciaDeInscripcionComoDirectivo";
import ValidarCertificacion from "service/ValidarCertificacion";
import ValidarDocumentsGeo from "service/ValidarDocumentsGeo";
import UserChangePasswordRequest from "service/ChangedPassword";
import InformacionGeneralMiOrganizacion from "service/informacionGeneralMiOrganizacion";
import ConstanciaCandidatoEleccionPopular from "service/ConstanciaCandidatoEleccionPopular";
import ConstanciaDirectivoMandatarioOrganizacionPolitica from "service/ConstanciaDirectivoMandatarioOrganizacionPolitica";
import ConstanciaAfiliacionAPartidosPoliticos from "service/ConstanciaAfiliacionAPartidosPoliticos";
import ConsultaExistenciaEnPortalWebExterno from "service/ConsultaExistenciaEnPortalWebExterno";
import SolicitudHojasAfiliacion from "service/SolicitudHojasAfiliacion";
import SolicitudHojasAdhesion from "service/SolicitudHojasAdhesion";
import SolicitudesAfiliacion from "./SolicitudesAfiliacion";
import DetalleHojaAfiliacionAdhesion from './DetalleHojaAfiliacionAdhesion';
import PaquetesDeAfiliacionYAdhesion from "./PaquetesDeAfiliacionYAdhesion";
import AfiliacionesDocumentos from "./ValidarDocumentosAfiliacion";

class ApiServices {
    constructor() {
        this.user = new User();
        this.paises = new ApiGenericServicesData("paises");
        this.company = new Company();
        this.ciudades = new ApiGenericServicesData("ciudades");
        this.municipio = new ApiGenericServicesData("municipio");
        this.municipios = new ApiGenericServicesData("municipios"); //catalogo TSE
        this.comunidades = new ApiGenericServicesData("comunidades");
        this.userSecurity = new UserSecurity();
        this.departamento = new ApiGenericServicesData("departamento");
        this.departamentos = new ApiGenericServicesData("departamentos"); //catalogo TSE
        this.ocupacionesGeo = new ApiGenericServicesData("ocupacionesGeo");
        this.estadosDePaises = new ApiGenericServicesData("estadosDePaises");
        this.solicitudUsuario = new SolicitudUsuario();
        this.constanciaDeInscripcionComoDirectivo = new ConstanciaDeInscripcionComoDirectivo();
        this.certificacionDeAfiliacionAPartidoPolitico = new CertificacionDeAfiliacionAPartidoPolitico();
        this.certificacionDeGoceDeSusDerechosPoliticos = new CertificacionDeGoceDeSusDerechosPoliticos();
        //GEO
        this.paisesGeo = new ApiGenericServicesData("paisesGeo");
        this.municipiosGeo = new ApiGenericServicesData("municipiosGeo");
        this.comunidadesGeo = new ApiGenericServicesData("comunidadesGeo");
        this.empadronamiento = new ApiGenericServicesData("empadronamiento");
        this.catalogoTimezone = new ApiGenericServicesData("catalogoTimezone");
        this.departamentosGeo = new ApiGenericServicesData("departamentosGeo");
        this.estadosDePaisesGeo = new ApiGenericServicesData("estadosDePaisesGeo");
        this.asambleas = new ApiGenericServicesData("asambleas");
        this.validarDocumentsGeo = new ValidarDocumentsGeo(); //validamos QR GEO
        this.validarCertificacion = new ValidarCertificacion(); //validamos QR
        this.solicitudHojasAdhesion = new SolicitudHojasAdhesion();
        this.ciudadesDelExtranjeroGeo = new ApiGenericServicesData("ciudadesDelExtranjeroGeo");
        this.solicitudHojasAfiliacion = new SolicitudHojasAfiliacion();
        this.userChangePasswordRequest = new UserChangePasswordRequest();
        this.solicitudesDeEmpadronamientoGeo = new ApiGenericServicesData("solicitudesDeEmpadronamientoGeo");
        this.informacionGeneralMiOrganizacion = new InformacionGeneralMiOrganizacion();
        this.generarSolicitudDeEmpadronamiento = new ApiGenericServicesData("generarSolicitudDeEmpadronamiento");
        this.citasEmpadronamientoActualizacion = new ApiGenericServicesData("citaEmpadronamientoOActualizacion");
        this.constanciaCandidatoEleccionPopular = new ConstanciaCandidatoEleccionPopular();
        this.consultaExistenciaEnPortalWebExterno = new ConsultaExistenciaEnPortalWebExterno();
        this.constanciaAfiliacionAPartidosPoliticos = new ConstanciaAfiliacionAPartidosPoliticos();
        this.consultarRegistrosDeEmpadramientoYRenap = new ApiGenericServicesData("consultarRegistrosDeEmpadramientoYRenap");
        this.constanciaDirectivoMandatarioOrganizacionPolitica = new ConstanciaDirectivoMandatarioOrganizacionPolitica();
        //Solicitudes de Afiliacion y Adhesion
        this.hojasAfiliacionYAdhesion = new SolicitudesAfiliacion();
        this.detalleHojaAfiliacionAdhesion = new DetalleHojaAfiliacionAdhesion();
        this.paquetesDeAfiliacionYAdhesion = new PaquetesDeAfiliacionYAdhesion();
        this.afiliacionesDocumentos = new AfiliacionesDocumentos();
    }
}

export default new ApiServices();
