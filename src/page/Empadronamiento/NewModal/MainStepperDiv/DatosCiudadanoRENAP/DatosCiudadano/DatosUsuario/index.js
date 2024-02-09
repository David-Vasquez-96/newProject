import React, { useState, useEffect } from "react";
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core/";
import { useStyles } from "./style";
import { functions } from "constant/index";
//REDUX
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import {
  AccountCircle,
  Email,
  Filter1,
  Today,
  LocationOn,
  Call,
  Wc,
  Person,
} from "@material-ui/icons";

function DatosCiudadano(props) {
  const classes = useStyles();
  const [datosCiudadanoTable, setdatosCiudadanoTable] = useState({
    nombreCompleto: "",
    sexo: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    lugarResidenciaRenap: "",
    direccionResidenciaElectoral: "",
    telefono: "",
    email: "",
  });
  const splitDate = (date) => {
    if (date !== null) {
      var arr1 = date.split("-");
      if (arr1[2] !== undefined) {
        var arr2 = arr1[2].split("T");
        var finalDate = arr2[0] + "/" + arr1[1] + "/" + arr1[0];
      }
      return finalDate;
    }
  };
  let elements = [];
  useEffect(() => {
    if (JSON.stringify(props.datosCiudadanoTable) !== "{}") {
      var lugarNacimientoDepartamento = "",
        lugarNacimientoMunicipio = "",
        primerNombre = "",
        segundoNombre = "",
        primerApellido = "",
        segundoApellido = "",
        tercerApellido = "",
        apellidoCasada = "",
        profesionName = "",
        direccionDeResidencia = "",
        noDeCasa = "",
        zonaDeResidencia = "",
        sexo = "";

      if (props.datosCiudadanoTable.descripcionOcupacion === null)
        profesionName = "";
      else profesionName = props.datosCiudadanoTable.descripcionOcupacion;
      //Lugar de nacimiento
      if (props.datosCiudadanoTable.departamentoNacimiento === null)
        lugarNacimientoDepartamento = "";
      else
        lugarNacimientoDepartamento =
          props.datosCiudadanoTable.departamentoNacimiento.name;
      if (props.datosCiudadanoTable.municipioNacimiento === null)
        lugarNacimientoMunicipio = "";
      else
        lugarNacimientoMunicipio =
          props.datosCiudadanoTable.municipioNacimiento.name;

      // Nombre completo del ciudadano
      if (props.datosCiudadanoTable.primerNombre === null) primerNombre = "";
      else primerNombre = props.datosCiudadanoTable.primerNombre;

      if (props.datosCiudadanoTable.segundoNombre === null) segundoNombre = "";
      else segundoNombre = props.datosCiudadanoTable.segundoNombre;

      if (props.datosCiudadanoTable.primerApellido === null)
        primerApellido = "";
      else primerApellido = props.datosCiudadanoTable.primerApellido;

      if (props.datosCiudadanoTable.segundoApellido === null)
        segundoApellido = "";
      else segundoApellido = props.datosCiudadanoTable.segundoApellido;

      if (props.datosCiudadanoTable.tercerApellido === null)
        tercerApellido = "";
      else tercerApellido = props.datosCiudadanoTable.tercerApellido;

      if (
        props.datosCiudadanoTable.apellidoCasada === null ||
        props.datosCiudadanoTable.apellidoCasada === ""
      )
        apellidoCasada = "";
      else apellidoCasada = "DE " + props.datosCiudadanoTable.apellidoCasada;

      //Sexo
      if (props.datosCiudadanoTable.genero === 1) {
        sexo = "Masculino";
      } else if (props.datosCiudadanoTable.genero === 2) {
        sexo = "Femenino";
      } else if (props.datosCiudadanoTable.genero === 0) {
        sexo = "Femenino";
      }

      if (props.datosCiudadanoTable.direccionElectoral === null)
        direccionDeResidencia = "";
      else direccionDeResidencia = props.datosCiudadanoTable.direccionElectoral;
      if (props.datosCiudadanoTable.nroCasaElectoral === null) noDeCasa = "";
      else noDeCasa = props.datosCiudadanoTable.nroCasaElectoral;
      if (props.datosCiudadanoTable.nroZonaElectoral === null)
        zonaDeResidencia = "";
      else zonaDeResidencia = props.datosCiudadanoTable.nroZonaElectoral;

      let direccionResidenciaElectoral = "";
      if (direccionDeResidencia !== "") {
        direccionResidenciaElectoral =
          direccionResidenciaElectoral + direccionDeResidencia;
      }
      if (noDeCasa !== "") {
        direccionResidenciaElectoral =
          direccionResidenciaElectoral + ", NO. CASA/LOTE " + noDeCasa;
      }
      if (zonaDeResidencia !== "") {
        direccionResidenciaElectoral =
          direccionResidenciaElectoral + ", ZONA " + zonaDeResidencia;
      }
      if (
        props.datosCiudadanoTable.departamentoEmpadronamientoId != 25 &&
        props.datosCiudadanoTable.departamentoEmpadronamientoId !== null &&
        props.datosCiudadanoTable.departamentoEmpadronamientoId !== ""
      ) {
        if (direccionResidenciaElectoral.length !== 0) {
          direccionResidenciaElectoral = direccionResidenciaElectoral + ", ";
        }
        if (props.datosCiudadanoTable.municipioEmpadronamientoName !== "") {
          direccionResidenciaElectoral =
            direccionResidenciaElectoral +
            props.datosCiudadanoTable.municipioEmpadronamientoName;
        }
        if (direccionResidenciaElectoral.length !== 0) {
          direccionResidenciaElectoral = direccionResidenciaElectoral + ", ";
        }
        if (props.datosCiudadanoTable.departamentoEmpadronamientoName !== "") {
          direccionResidenciaElectoral =
            direccionResidenciaElectoral +
            props.datosCiudadanoTable.departamentoEmpadronamientoName;
        }
        if (direccionDeResidencia.length === 0) {
          if (direccionResidenciaElectoral.length !== 0) {
            direccionResidenciaElectoral = direccionResidenciaElectoral + ". ";
          }
          direccionResidenciaElectoral =
            direccionResidenciaElectoral + "Debe completar dirección.";
        }
      }

      if (
        direccionResidenciaElectoral.length === 0 &&
        props.datosCiudadanoTable.nroBoleta === ""
      ) {
        direccionResidenciaElectoral =
          "No está empadronado. Debe completar su información con una solicitud de empadronamiento.";
      }

      if (
        direccionResidenciaElectoral.length === 0 &&
        !props.datosCiudadanoTable.nroBoleta === ""
      ) {
        direccionResidenciaElectoral =
          "Debe completar su información con una solicitud de empadronamiento.";
      }

      let lugarNacimiento = "";
      if (lugarNacimientoDepartamento !== "") {
        lugarNacimiento += lugarNacimientoDepartamento;
      }
      if (
        lugarNacimientoDepartamento !== "" &&
        lugarNacimientoMunicipio !== ""
      ) {
        lugarNacimiento += ", " + lugarNacimientoMunicipio;
      }

      setdatosCiudadanoTable({
        nombreCompleto:
          primerNombre +
          " " +
          segundoNombre +
          " " +
          primerApellido +
          " " +
          segundoApellido +
          " " +
          tercerApellido +
          " " +
          apellidoCasada,
        sexo: sexo,
        profesion: profesionName,
        fechaNacimiento: props.datosCiudadanoTable.fechaNacimiento,
        lugarNacimiento: lugarNacimiento,
        direccionResidenciaElectoral: direccionResidenciaElectoral,
        telefono: props.datosCiudadanoTable.telefono,
        email: props.datosCiudadanoTable.email,
      });
    }
  }, [props.datosCiudadanoTable]);

  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      className={classes.datosContainer}
    >
      <Grid item xs={12}>
        <div className={classes.centerTitle}>
          <Divider />{" "}
          <strong className={classes.dividerTitle}>DATOS DEL CIUDADANO</strong>{" "}
          <Divider />
        </div>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Nombre completo: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <AccountCircle />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.nombreCompleto}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText className={classes.rootListItemText} primary="Sexo: " />
          <ListItemIcon className={classes.colorIcon}>
            <Wc />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.sexo}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Fecha de Nacimiento: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <Today />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={splitDate(datosCiudadanoTable.fechaNacimiento)}
          // primary={splitDate(datosCiudadanoTable.fechaNacimiento)}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Lugar de Nacimiento: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <LocationOn />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.lugarNacimiento}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Teléfono: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <Call />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.telefono}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Dirección de Residencia Electoral: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <LocationOn />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          direction="column"
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.direccionResidenciaElectoral}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Correo electrónico: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <Email />
          </ListItemIcon>
        </ListItem>
      </Grid>

      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.email}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Profesión: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <Person />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.profesion}
        />
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatosCiudadano);
