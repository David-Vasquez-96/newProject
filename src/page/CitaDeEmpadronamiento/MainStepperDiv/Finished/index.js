import React from "react";
import { Card, CardActions, CardContent, Icon, Typography, Button } from "@material-ui/core";
// import { ListAlt } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import AlertElementSimple from 'component/AlertElementSimple';

const Finished = (props) => {
    let history = useHistory();
    const classes = useStyles();

    // const NewRequest = () => {props.clearFiles()};

    const close = () => {
        props.handleClose();
        history.push("/", {});
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <AlertElementSimple success openModal={props.open}/>
                <Typography variant="h5" gutterBottom>¡Cita de Empadronamiento programada exitosamente!</Typography>
                <Typography variant="body1" gutterBottom>
                    La cita se ha programado exitosamente. Pronto, el personal del TSE
                    le estará contactando por medio de mensajería de texto o llamada vía WhatsApp.
                </Typography>
            {/* <Button variant="contained" color="primary" onClick={NewRequest} 
                    startIcon={<ListAlt />} size="medium"
                >
                    Nueva Cita de Empadronamiento
                </Button> */}
                <Button className={classes.button} color="secondary"
                    variant="contained" onClick={close}
                >
                    <Icon className={classes.icon}> cancel </Icon>
                    Cerrar
                </Button>
            </CardContent>

            <CardActions className={classes.InstitutionTitle}>
                <Typography variant="subtitle2">
                    Tribunal Supremo Electoral, Guatemala
                </Typography>
            </CardActions>
        </Card>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Finished);
