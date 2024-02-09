import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, AppBar, Toolbar, Typography, ButtonBase} from '@material-ui/core'
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root:{
        width: '100%',
        textAlign: 'center',
    },
    h1:{
        textAlign: 'center',
        color: '#000',
        fontFamily: 'none',
        margin: 0,
       '@media (max-width:2000px)':{ // web
            fontSize: '1.6rem',
        },
       '@media (max-width:1000px)':{ // web
            fontSize: '1.5rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '1.2rem',
        },
       '@media (max-width:415px)':{ //mobile
            fontSize: '1rem',
            marginRight: '10%',
        }
    },
	image: {
		width: 70,
		height: 70,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},    
    AppBar : {
        paddingTop: '4px',
        background: 'white',
        color:'#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',          
    },       
}));

export default function Title(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} className={classes.AppBar}>
                <Toolbar variant="dense" className={classes.AppBar}>
                <Grid container direction="row" justify="center" alignItems="center" >
                    <Grid item xs={12} >
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={props.icon} />
                        </ButtonBase>
                        <h1 className={classes.h1} variant="h5" color="initial">{props.title}</h1>   
                    </Grid>                    
                </Grid>                    
                </Toolbar>
            </AppBar> 
            <Divider />
        </div>
    );
}