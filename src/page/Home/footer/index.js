import React, { Fragment } from "react";
import { AppBar, CssBaseline, Toolbar, Button, Grid } from "@material-ui/core/";
import { CheckBoxOutlineBlank, MailOutline, Phone } from "@material-ui/icons";
import { useStyles } from "./style";
import AsistenciaTecnica from "../AsistenciaTecnica";
import Media from "react-media";

export default function Footer() {
    const classes = useStyles(),
    Logo = "/assets/WhiteIcon.svg";

  return (
      <div className={classes.appBar}>
          <Grid>
            <Grid item xs={12} className={classes.contenedorTSETitle}>
              <img className={classes.img} src={Logo} alt="TSE logo" />
              Tribunal Supremo Electoral. Guatemala, C.A.
            </Grid>
            <Grid item xs={12} className={classes.contenedorSoporte}>
              <div className={classes.contenedor}>
                <MailOutline className={classes.icon} />
                <Media
                  queries={{
                    small: "(max-width: 639px)",
                    large: "(min-width: 640px)",
                  }}
                >
                  {(matches) => (
                    <Fragment>
                      {matches.small && (
                        <p className={classes.footerText}>
                          soporteportalweb@tse.org.gt
                        </p>
                      )}
                      {matches.large && (
                        <p className={classes.footerText}>
                          Correo: soporteportalweb@tse.org.gt
                        </p>
                      )}
                    </Fragment>
                  )}
                </Media>
              </div>
              <div className={classes.contenedorTelefono}>
                <Phone className={classes.icon} />
                <Media
                  queries={{
                    small: "(max-width: 639px)",
                    large: "(min-width: 640px)",
                  }}
                >
                  {(matches) => (
                    <Fragment>
                      {matches.small && (
                        <p className={classes.footerText}>
                          2236-5000. Ext: 10437 - 10441
                        </p>
                      )}
                      {matches.large && (
                        <p className={classes.footerText}>
                          Teléfono: 2236-5000. Ext: 10437 - 10441
                        </p>
                      )}
                    </Fragment>
                  )}
                </Media>
              </div>
            </Grid>
          </Grid>
      </div>
  );
}