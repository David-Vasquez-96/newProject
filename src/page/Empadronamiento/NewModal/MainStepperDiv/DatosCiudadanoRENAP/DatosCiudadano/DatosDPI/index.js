import React, { useState, useEffect } from "react";
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core/";
import { useStyles } from "./style";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import { Filter1, Today, LocationOn } from "@material-ui/icons";

function DatosCiudadano(props) {
  const classes = useStyles();
  const [datosCiudadanoTable, setDatosCiudadanoTable] = useState({
    cui: 0,
    fechaEmisionDpi: "",
    serieDpi: 0,
  });
  const splitDate = (date) => {
    if (date !== undefined) {
      var arr1 = date.split("-");
      if (arr1[2] !== undefined) {
        var arr2 = arr1[2].split("T");
        var finalDate = arr2[0] + "/" + arr1[1] + "/" + arr1[0];
      }
      return finalDate;
    }
  };
  useEffect(() => {
    if (JSON.stringify(props.datosCiudadanoTable) !== "{}") {
      setDatosCiudadanoTable({
        cui: props.datosCiudadanoTable.cui,
        fechaEmisionDpi: props.datosCiudadanoTable.fechaEmisionDpi,
        serieDpi: props.datosCiudadanoTable.serieDpi,
      });
    }
  }, [props.datosCiudadanoTable]);
  return (
    <Grid
      container
      // justifyContent = "flex-start"
      alignContent="center"
      alignItems="center"
      // className={classes.datosContainer}
    >
      <Grid item xs={12}>
        <div className={classes.centerTitle}>
          <Divider />{" "}
          <strong className={classes.dividerTitle}>
            DATOS DEL DOCUMENTO PERSONAL DE IDENTIFICACIÓN
          </strong>{" "}
          <Divider />
        </div>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="CUI del DPI: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <LocationOn />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={datosCiudadanoTable.cui}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="Fecha de emisión del DPI: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <Today />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText2}
          primary={splitDate(datosCiudadanoTable.fechaEmisionDpi)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItem className={classes.rootListItem}>
          <ListItemText
            className={classes.rootListItemText}
            primary="No. de serie del DPI: "
          />
          <ListItemIcon className={classes.colorIcon}>
            <Filter1 />
          </ListItemIcon>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={3}>
        <ListItemText
          className={classes.rootListItemText3}
          primary={datosCiudadanoTable.serieDpi}
        />
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatosCiudadano);
