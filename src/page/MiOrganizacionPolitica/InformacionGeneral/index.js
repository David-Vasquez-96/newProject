import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import ApiServices from "service/ApiServices";
import ComponentAccessDenied from 'page/Autorizacion'
import ComponenteInformacion from './Informacion'
import ComponenteMensajeNoTieneAsignadoPP from './MensajeNoTieneAsignadoPP'
import DialogLoadingMessage from 'component/LoadingMessage/index'

//components
import MenuMiOrganizacionPolitica from '../MenuMiOrganizacionPolitica'
import { showMessagePersonalizedPosition } from "service/SweetAlert";

export default function InformacionGeneral() {
	const classes = useStyles();
	const [datos, setDatos] = useState();
	const [authorized, setAuthorized] = useState({show: true, title: ''});
	const [loadingMessage, setLoadingMessage] = useState({loading:true, title:''});
	
	const listInformacion = async () => {
		setLoadingMessage({loading: true, title: 'Cargando información ...'})
		try {
			const hasPermission = await ApiServices.userSecurity.hasPermission("informacionGeneralMiOrganizacionPolitica","list");
			if (hasPermission.error) {
				setAuthorized({show: false, title: 'Acceso No Autorizado'})
			} else {
				const response = await ApiServices.informacionGeneralMiOrganizacion.list();
				if (response.error !== null) showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error[0]?.message, 'center')
				else if (response.data !== "") 
					setDatos(response.data);
				setAuthorized({show: true, title: 'Acceso Autorizado'})
			}
		} catch (exception) {
			showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
		}
		setLoadingMessage({loading: false, title: ''})
	};

	useEffect(() => {
		listInformacion();
	}, []);

	return (
		<div>
			<DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
			{
				(!loadingMessage.loading) && (					
					(authorized.show) ? (
						(datos) ? (
							<ComponenteInformacion datos={datos} />
							): (
							<ComponenteMensajeNoTieneAsignadoPP />
						)
					)
					: <ComponentAccessDenied />
				)
			}
		</div>
	);
}