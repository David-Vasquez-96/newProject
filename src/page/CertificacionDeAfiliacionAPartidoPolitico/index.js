import React, { useState, useEffect } from "react";
import ApiServices from "service/ApiServices";
import Title from "component/TitleWithIcon";
import Table from "component/Table";
import { functions } from "constant/index";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import { Icon, Button, Chip } from "@material-ui/core/";
import { Description, HighlightOff, Timer, RestorePage } from "@material-ui/icons";
import Footer from "page/Home/Footer2";
import { showMessagePersonalizedPosition } from 'service/SweetAlert';
import DialogLoadingMessage from 'component/LoadingMessage/index'
import { useStyles } from "./Style";
import ComponentAccessDenied from '../Autorizacion'
import ComponenteModal from 'page/ModalConstanciasCertificaciones'

function CertificacionDeAfiliacionAPartidoPolitico (props) {
	const classes = useStyles();
	const titleModal = 'Nueva solicitud'
	const subTitleModal = 'Certificación de afiliación a partidos políticos'
	const contentModal = 'Para generar una nueva solicitud de certificación de afiliación a partidos políticos debe dar clic en el botón "ENVIAR SOLICITUD"'
	const [modalCreateCertification, setModalCreateCertification] = useState(false)
	const [data, setData] = useState([])
	const header = [
		{ title: "No.", field: "id", cellStyle: { width: "100px" } },
		{ title: "DPI", field: "cui" },
		{ title: "Nombre", field: "nombre" },
		{ title: "Fecha de solicitud", field: "fechaSolicitud",render: (rowData) => functions.splitDate(rowData.fechaSolicitud),},
		{title: "Fecha de resolución", field: "fechaResolucion",
			render: (rowData) => (
			<div style={{ minWidth: "200px" }}>
				{rowData.esRechazado === false && rowData.esVerificado === true ? (
					<p>{functions.splitDate(rowData.fechaResolucion)}</p>
				) : ("")}
			</div>),
		},
        { title: "Estado", field: "estado", 
			render: (rowData) => (
				<div style={{ minWidth: "200px" }}>
					{rowData.esVerificado === true && rowData.esRechazado === false ? (
						<Chip className={classes.aceptado} icon={<Description className={classes.iconAceptado}/>} label="Solicitud Aceptada" clickable variant="outlined"/>
					) : rowData.esVerificado === true && rowData.esRechazado === true ? (
						<Chip className={classes.rechazado} icon={<HighlightOff className={classes.iconRechazado}/>} label="Solicitud Rechazada" clickable variant="outlined"/>
					) : (
						<Chip className={classes.enProceso} icon={<Timer className={classes.iconEnProceso}/>} label="Solicitud En proceso" clickable variant="outlined"/>
					)}
				</div>),
        },
        { title: "Observación", field: "observacion", render: (rowData) => <p>{rowData.observacion}</p>},
        { title: "Archivo", field: "archivo",
			render: (rowData) => (
				<div style={{ minWidth: "200px" }}>
					{rowData.esVerificado === true && rowData.esRechazado === false ? (
							<Button								
								variant="outlined"
								size="small"
								color="primary"
								endIcon={<Icon>get_app</Icon>}
								onClick={()=>DescargarCertificación(rowData.id)}
							>Descargar</Button>
					) : ( "")}
				</div>
			),
        },
	]
	const [authorized, setAuthorized] = useState({show: true, title: '',});
	const controller = "certificacionDeAfiliacionAPartidoPolitico";
	const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
	const [openModal, setOpenModal] = useState ({open:false, title: '', content: ''})

	const downloadPdfV2 = async (base64, name) => {
		const response = await fetch('data:application/pdf;base64,'+base64);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = name;
		a.click();
		URL.revokeObjectURL(url);
	};

	const DescargarCertificación = async (idRegister) =>{
		setLoadingMessage({loading: true, title: 'Descargando certificación de afiliación a partidos políticos ...'})
		
		try {
			let response = await ApiServices[controller].openFile(idRegister);

			if (response.error) showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
			else  {
				// functions.downloadPDFFromStringBase64(response.data.base64,"Certificación de afiliación a partidos políticos.pdf");
				downloadPdfV2(response.data.base64, 'Certificación de afiliación a partidos políticos.pdf')
			}
		} catch (exception) {
			showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
		}
		setLoadingMessage({loading: false, title: ''})		
	}
	
	const FuncionObtenerListadoDeCertificacionesDeAfiliados = async () => {
		setLoadingMessage({loading: true, title: 'Cargando certificaciones de afiliación a partidos políticos ...'})
		
		try {
			const hasPermission = await ApiServices.userSecurity.hasPermission(controller,"list");
			if (hasPermission.error) {
				setAuthorized({show: false, title: 'Acceso No Autorizado'})
			} else {
				ApiServices[controller].orderCriteria.clear();
				ApiServices[controller].orderCriteria.addDesc("fechaSolicitud");
				ApiServices[controller].orderCriteria.addDesc("id");
				let response = await ApiServices[controller].listRegisterCriteria();

				if (response.error !== null) showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
				else if (response.data !== "") setData(response.data);

				props.CERTIFICACIONDEAFILIACIONAPARTIDOPOLITICO_SET_DATA(data);
				setAuthorized({show: true, title: 'Acceso Autorizado'})
			}
		} catch (exception) {
			showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
		}
		setLoadingMessage({loading: false, title: ''})
	}

	const FuncionSolcitarUnaNuevaCertificacion = async () =>{
		setLoadingMessage({loading: true, title: 'Solicitando nueva certificación de afiliación a partidos políticos ...'})
		
		try {
			let response = await ApiServices.certificacionDeAfiliacionAPartidoPolitico.createRegister({});

			if (response.error) showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
			else  {
				FuncionObtenerListadoDeCertificacionesDeAfiliados()
				FuncionCerrarModalParaNuevaCertificacion()
				showMessagePersonalizedPosition('success', '¡Bien!', 'Certificación de afiliación a partidos políticos solicitada correctamente', 'center')
			}
		} catch (exception) {
			showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
		}
		setLoadingMessage({loading: false, title: ''})	
	}

	const FuncionAbrirModalParaNuevaCertificacion = () =>{
		setOpenModal({open: true, title: titleModal, content: contentModal})
	}
	const FuncionCerrarModalParaNuevaCertificacion = () =>{
		setOpenModal({open: false, title: '', content: ''})
	}

    const DropDownButtonList = [
        {
            customTitleButtonTable:"Solicitar Nueva certificación",
            customIconButtonTable:<Description/>,
            customFunctionTable: FuncionAbrirModalParaNuevaCertificacion,
        },
        {
            customTitleButtonTable:"Actualizar Tabla",
            customIconButtonTable:<RestorePage/>,
            customFunctionTable: FuncionObtenerListadoDeCertificacionesDeAfiliados,
        }                        
    ] 
	useEffect(()=>{
		FuncionObtenerListadoDeCertificacionesDeAfiliados()
	}, [])

	return (
		<div className={classes.containerPrincipal}>
			<DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
			<ComponenteModal
				open={openModal.open}
				title={openModal.title}
				subTitleModal={subTitleModal}
				content={openModal.content}
				handleClose={FuncionCerrarModalParaNuevaCertificacion}
				generarSolicitud = {FuncionSolcitarUnaNuevaCertificacion} 
			/>
			<Title title="Certificación de afiliación a partidos políticos" icon={"/menu/Certificado.png"}/> <br/>
			{
				(authorized.show) ? 
					<Table
						title={"Listado de solicitudes"}
						header={header}
						data={data}
						refreshList={FuncionObtenerListadoDeCertificacionesDeAfiliados}
						isMenuDesplegable={true}
						arrayMenuDesplegable={DropDownButtonList}
					/>
				: <ComponentAccessDenied />
			}
			<br /><br /><br /><br /><br />
			<Footer />
		</div>
	)
}export default connect(mapStateToProps, mapDispatchToProps)(CertificacionDeAfiliacionAPartidoPolitico);