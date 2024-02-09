import React from "react";
import { useStyles } from "./style";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import DatosDPI from "./DatosDPI";
import DatosUsuario from "./DatosUsuario";

function DatosCiudadano(props) {
  const classes = useStyles();
  return (
    <div>
      <DatosDPI />
      <DatosUsuario />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DatosCiudadano);
