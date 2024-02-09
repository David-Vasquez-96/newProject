import React from "react";
import { Container, Grid, } from "@material-ui/core";
import { useStyles } from "./styles";

export default function MensajeNoTieneAsignadoPP() {
	const classes = useStyles();
	return (
		<Container maxWidth="lg" className={classes.contenedorPrincipal}>
			<Grid container spacing={1} className={classes.grid}>
				<Grid item md={12} container direction="row" justifyContent="center" alignItems="center">
					<img className={classes.Image}
						src={'assets/OP.svg'}
						alt="Logotipo"
					/>
				</Grid>
			</Grid>
		</Container>
	)
}