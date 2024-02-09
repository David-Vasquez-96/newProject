import React from 'react';
import { Button } from '@material-ui/core/';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#008AFA',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1E88E5',
        }
    },
    icon: {
        marginRight: theme.spacing(1),
    }
}));

export default function ButtonBack(props) {
    const classes = useStyles();

    return (
        <Button disabled={props.disabled} className={classes.button} label={props.tooltip} onClick={props.onClick} variant="contained">
            <Icon className={classes.icon} >{props.icon}</Icon>
            {props.tooltip}
        </Button>
    )
}
