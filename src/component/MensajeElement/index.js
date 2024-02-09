import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    alert: {
        top: "45%",
        "&>.MuiSnackbar-anchorOriginBottomCenter": {
            left: "50%",
            right: "auto",
            bottom: 24,
            transform: "translateX(-50%)",
            top: "-4%",
        }
    }
}));

function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
}

export default function ResponseElement(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar className={classes.alert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={props.open} autoHideDuration={props.hideDuration ? props.hideDuration : 3000} onClose={props.handClose}>
                <Alert variant="filled" severity={props.type}>{props.content}</Alert>
            </Snackbar>
        </div>
    );
}

