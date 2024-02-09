import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root:{
        paddingLeft: '2%',
        marginTop: 10,
        paddingRight:'2%',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        ["@media (maxWidth : 768px)"] :{
            fontSize: '1.3rem',
        },
       '@media (max-width:415px)':{ //mobile
            fontSize: '1.2rem',
            marginTop: '4%',
            marginLeft: '6%',
            marginRight: '6%',
            opacity: 0.6,
        }
    },
}));

export default function Title(props) {
    const classes = useStyles();
    return (
        <div>
            <Typography className={classes.root} variant={props.variant} align={props.align} 
                        display={props.display} gutterBottom>{props.title}</Typography>
             
        </div>
    );
}