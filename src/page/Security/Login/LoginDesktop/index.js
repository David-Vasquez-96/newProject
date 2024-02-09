import React from "react";
import IconElement from "component/IconElement/index";
import FormTemplate from "../FormElements/";
import { useStyles } from "./style";
import { Button, Card, Divider, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Descripcion from '../FormElements/Dialog'

const LoginDesktop = (props) => {
    const classes = useStyles(props);
    let history = useHistory();
    const recuperarContraseña = () => {
        history.push("/cambiarContraseña/obtenerCorreoExterno",{});
    }
    const registro = () => {
        history.push("/signup",{});
    }    
    return (
        <Card className={classes.container} elevation={3}>
            <Grid container alignContent="center" >
            {/* <Grid container alignContent="center" style={{height: '100%'}}> */}
                <Grid item xs={12} sm container className={classes.gridItemForm}>
                    <Grid item xs container direction="column" className={classes.gridItemFormContainer}>
                        <Grid item xs>
                            <div className={classes.loginBox}>
                                <div >
                                    <IconElement />
                                </div>
                                <div className={classes.subTitleForm}>Portal Web TSE</div>
                                <div className={classes.subTitleForm}> ¡Bienvenido! </div>
                                <FormTemplate/>
                                <Button onClick={recuperarContraseña} color="primary">¿Has olvidado tu contraseña?</Button>
                                <div className={classes.containerDivider}>
                                    <Divider variant="middle" className={classes.divider}/>O<Divider variant="middle" className={classes.divider}/>
                                </div>
                                <span className={classes.mobileSpan}>¿No cuentas con un usuario?</span>

                                <Button onClick={registro} color="primary">Regístrate desde aquí</Button>
                            </div>   
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm container className={classes.gridItemDescripcion}>
                    <Grid item xs container direction="column" spacing={2} className={classes.gridItemDescripcionContainer}>
                        <Grid item xs>
                            <div className={classes.image}>
                                <img className={classes.img} alt="complex" src={"/assets/systemprincipal.svg"} />
                            </div>
                            <Descripcion/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};
export default LoginDesktop;