import React, { Fragment } from "react";
import { AppBar, CssBaseline, Toolbar, Button, Grid } from "@material-ui/core/";
import { CheckBoxOutlineBlank, MailOutline, Phone } from "@material-ui/icons";
import { useStyles } from "./style";
import Media from "react-media";

export default function Footer() {
  const classes = useStyles();
  const fbLogo = "/assets/fb-logo.png",
    TwLogo = "/assets/twitter.svg",
    YtLogo = "/assets/youtube.svg",
    Logo = "/assets/WhiteIcon.svg";

  const [open, setOpen] = React.useState(false);
  const AbrirModal = () => {
    setOpen(true);
  };

  const CerrarModal = () => {
    setOpen(false);
  };
  return (
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense">
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
          {/* <img className={classes.imgTwo} src={fbLogo} alt="facebook Qmi Teaches"/>
                <img className={classes.imgTwo} src={YtLogo} alt="youtube"/>
            <img className={classes.imgTwo} src={TwLogo} alt="twitter"/>   */}
        </Toolbar>
      </AppBar>
  );
}
