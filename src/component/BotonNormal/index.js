import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Cancel, CheckCircleOutline, NavigateNext, NavigateBefore, Description, Search} from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',		
	},
	bottonNormal: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow:'0 3px 5px 2px rgba(119, 241, 255)',
		color: 'white',
		height: 37,
		padding: '0 30px',	
	},
	bottonNormalCancelar: {
		background: 'linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)',
		border: 0,
		borderRadius: 3,
		boxShadow:'0 3px 5px 2px rgba(255, 122, 122)',
		color: 'white',
		height: 37,
		padding: '0 30px',	
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},	
	buttonProgress: {
		color: 'black',
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},	
	leftIcon: {
        marginRight: theme.spacing(1),
    },  
}));

export default function BotonNormal(props) {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			{props.botonAceptar ?
				<div className={classes.wrapper}>
					<Button 
						disableElevation 
						disabled={props.disabled} 
						className={classes.bottonNormal} 
						startIcon={props.icon} 
						onClick={props.function}
					><CheckCircleOutline className={classes.leftIcon} />
						{props.title} 
					</Button> 
					{props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}			
				</div>			
			:""}
			{
			props.botonNormal ?
				<div className={classes.wrapper}>
					<Button 
						disableElevation 
						disabled={props.disabled} 
						className={classes.bottonNormal} 
						startIcon={props.icon} 
						onClick={props.function}
					><Cancel className={classes.leftIcon} />
						{props.title}
					</Button>
				</div>			
			: "" }
			{
			props.botonSiguiente ?
				<div className={classes.wrapper}>
					<Button 
						disableElevation 
						disabled={props.disabled} 
						className={classes.bottonNormal} 
						startIcon={props.icon} 
						onClick={props.function}
					><NavigateNext className={classes.leftIcon} />
						{props.title}
					</Button>
				</div>			
			: "" }
			{
			props.botonAnterior ?
				<div className={classes.wrapper}>
					<Button 
						disableElevation 
						disabled={props.disabled} 
						className={classes.bottonNormal} 
						startIcon={props.icon} 
						onClick={props.function}
					><NavigateBefore className={classes.leftIcon} />
						{props.title}
					</Button>
				</div>			
			:""}
			{
			props.botonNormalCancelar ?
				<div className={classes.wrapper}>
					<Button 
						disableElevation 
						disabled={props.disabled} 
						className={classes.bottonNormalCancelar} 
						startIcon={props.icon} 
						onClick={props.function}
					><Cancel className={classes.leftIcon} />
						{props.title}
					</Button>
					{props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}			
				</div>	
			: ""		
			}			
			{
			props.botonRechazarDocumento ?
				<div className={classes.wrapper}>
					<Button 
						disableElevation 
						disabled={props.disabled} 
						className={classes.bottonNormalCancelar} 
						startIcon={props.icon} 
						onClick={props.function}
					><Description className={classes.leftIcon} />
						{props.title}
					</Button>
					{props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}			
				</div>	
			: ""		
			}			
			{
			props.botonPersonalizado ?
				<div className={classes.wrapper}>
					<Button 
						disableElevation 
						disabled={props.disabled} 
						className={classes.bottonNormal} 
						startIcon={props.icon} 
						onClick={props.function}
					>
						{/* <Search className={classes.leftIcon} /> */}
						{props.title}
					</Button>
					{props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}			
				</div>	
			: ""		
			}			
	  </div>		
	) 
}
