import React from 'react';
import { ButtonBase, CircularProgress, Container, Dialog, Grid } from '@material-ui/core';
import { useStyles } from "./styles";
import LogoAnimation from "./logoAnimation";

export default function SimpleBackdrop(props) {
  const classes = useStyles();

  return (
	<Dialog open={props.open} id="dialogContainer" fullWidth={true} maxWidth={"sm"} className={classes.dialog}>
		<Container direction="row" justify="center" alignItems="center" className={classes.colorComponente}>
			{
				props.icon && (
					<Grid className={classes.rootContainer} direction="row" justifyContent="center" alignItems="center">
						<Grid item xs={12} >
							<ButtonBase className={classes.imageEnviado}>
								<img className={classes.imgEnviado} alt="complex" src={props.icon} />
							</ButtonBase>
						</Grid>
						<Grid item xs={12} >
							<div className={classes.title}> {props.title ? props.title : 'Cargando ...'}</div>
						</Grid>
					</Grid>
				)
			}
			{
				!props.icon && (
					<Grid className={classes.rootContainer} item xs={12} > 
						{/* <LogoAnimation/> */}
						<CircularProgress />
						<div className={classes.title}> {props.title ? props.title : 'Cargando ...'}</div>
					</Grid>
				)
			}
		</Container>      
		<div className={classes.lineaDegradadaBottom}></div>
	</Dialog>
  );
}