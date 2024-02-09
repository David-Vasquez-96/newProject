import React from "react";
import Title from 'component/TitleWithIcon';

//components
import MenuMiOrganizacionPolitica from './MenuMiOrganizacionPolitica'
import { useStyles } from "./style";
import Footer from "page/Home/Footer2";

export default function InformacionGeneral() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Title title="Mi Organización Política" icon={"/menu/miOrganizacionPolitica.png"}/>
			<MenuMiOrganizacionPolitica />
			<Footer />
		</div>
	);
}
