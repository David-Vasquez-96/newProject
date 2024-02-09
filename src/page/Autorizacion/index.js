import React from "react";
import { useStyles } from "./Style";

const ComponenteAccesoDenegado = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.containerLogo}>
                <img alt="LOGO DEL TSE" src="/assets/accessDenied.svg" className={classes.mobileIcon} />
        </div>
    );
};
export default ComponenteAccesoDenegado;