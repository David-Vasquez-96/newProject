import React, { useRef, useState, state, useEffect } from "react";
import { useStyles } from "./style";
import {
  Grid,
  CssBaseline,
  Paper,
  Typography,
  Switch,
} from "@material-ui/core";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import "./styles.css";
//import ResponseElement from "components/ResponseElement";
import ResponseElement from "component/MensajeElement";

const PermissionComponent = (props) => {
  const classes = useStyles(),
    [open, setOpen] = React.useState(false),
    [mensaje, setMensaje] = React.useState({
      tipoError: "success",
      tipoMensaje: "",
    });
    
  const [switchState, setSwitchState] = React.useState({
    checkedAfiliacion: false,
  });

  const handClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChangeSwitch = (event) => {
    setSwitchState({ ...state, [event.target.name]: event.target.checked });
    //console.log("event.target.checked:", event.target.checked);
    props.ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION(event.target.checked)
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Grid container spacing={2}>
          <Grid  className={classes.afiliacionGrid} item xs={8} sm container>
            <Grid item xs>
              <Grid item xs>
                <Typography  className={classes.afiliacionText} gutterBottom variant="subtitle1">
                  Servicios de Afiliación
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Switch
              checked={switchState.checkedAfiliacion}
              onChange={handleChangeSwitch}
              color="primary"
              name="checkedAfiliacion"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Grid>
        </Grid>
      </Paper>
      <ResponseElement
        type={mensaje.tipoError}
        content={mensaje.tipoMensaje}
        open={open}
        handClose={handClose}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionComponent);
