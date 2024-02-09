import React, {  useState } from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { AccountCircle, Group, LocationOn, Phone, DynamicFeed, Mail, TextFormat, Update} from "@material-ui/icons";
import { useStyles } from "./styles";

export default function InformacionDeLaOrganizacion(props) {
	const classes = useStyles();
	const [datos, setDatos] = useState([
		{id:1, title: 'Nombre de la Organización Política:', content: props.datos?.name, icon: <Group /> },
		{id:2, title: 'Siglas:', content: props.datos?.siglas, icon:  <TextFormat />},
		{id:3, title: 'Departamento:', content: props.datos?.departamento, icon: <LocationOn /> },
		{id:4, title: 'Municipio:', content: props.datos?.municipio , icon: <LocationOn /> },
		{id:5, title: 'Dirección:', content: props.datos?.direccion , icon: <LocationOn /> },
		{id:6, title: 'Teléfono:', content: props.datos?.telefono , icon: <Phone /> },
		{id:7, title: 'Correo Electrónico:', content: props.datos?.email , icon:  <Mail /> },
		{id:8, title: 'Nombre del Representante Legal:', content: props.datos?.representanteLegal , icon: <AccountCircle /> },
		{id:9, title: 'Fase:', content: props.datos?.fase, icon: <DynamicFeed /> },
		{id:10, title: 'Estado:', content: props.datos?.estado , icon: <Update /> },				
	]);


	return (
		<Container maxWidth="lg" className={classes.contenedorPrincipal}>
			<div className={classes.ContainerImageLogo}>
				<img className={classes.ImageLogo} src={`data:image/jpeg;base64,${props.datos?.base64}`} alt="Logotipo"/>
			</div>
			<Grid container spacing={1} className={classes.grid}>
				{datos.map((label, index) => {
					return (
						<>
							<Grid item lg={6} md={6} sm={6} xs={12} >
								<Paper className={classes.paper} elevation={0}>
									{label.icon}
									<Typography className={classes.contentTitle}>{label.title}</Typography>
								</Paper>
							</Grid>
							<Grid item lg={6} md={6} sm={6} xs={12} wrap="nowrap">
								<Paper className={classes.paperContent} elevation={0}>
									<Typography className={classes.content}>{label.content}</Typography>
								</Paper>
							</Grid>
						</>
					)
				})}
			</Grid>
		</Container>
	)
}