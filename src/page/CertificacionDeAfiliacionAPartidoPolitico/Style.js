import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    containerPrincipal: {
        margin: '37px 0px',
        // height: '100%',
        position: "relative",
        width: "100%",
        overflow: "auto",
        paddingLeft:0,
        paddingRight:0,
        backgroundColor: '#EDEDED',
    },
    aceptado: {
        color: 'green',
        border: '1px solid green'
    },
    iconAceptado: {
        color: 'green',
    },
    enProceso: {
        color: '#1F558F',
        border: '1px solid #1F558F'
    },
    iconEnProceso: {
        color: '#1F558F',
    },
    rechazado: {
        color: 'red',
        border: '1px solid red'
    },
    iconRechazado: {
        color: 'red',
    },
}));
