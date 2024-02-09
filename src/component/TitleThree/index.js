import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    h1:{
        // textAlign: 'center',
        color: '#000',
        fontFamily: 'sans-serif',
        paddingLeft:5,
        paddingRight: 5,
       '@media (max-width:2000px)':{ // web
            fontSize: '1.5rem',
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

    centrarTexto: {
        paddingTop:'5px',
        textAlign: 'center',
        backgroundColor: '#ffffff',
    }
}));

export default function Title(props) {
    const classes = useStyles();
    return (
        <div className={classes.centrarTexto}>
            <h1 className={classes.h1}>
                {props.title}
            </h1>
            <Divider />
        </div>
    );
}