import React from 'react';
import { Slide, Grid, Container, Typography } from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
/********** COMPONENTS **********/
import FormNewPackage from './FormNewPackage';
import Title from 'component/Title';
/********** STYLES **********/
import { useStyles } from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    /********** VARIABLES **********/
    const classes = useStyles();

    /********** FUNCTIONS **********/
    /*  El método cierra el modal con los metodos recibidos desde los props y actualiza la tabla con el metodo "validateFoil" */
    const closeModal = () => { props.handleClose(); props.updateState(); }

    /********** RENDER **********/
    return (
        <div>
            <Dialog open={props.open} maxWidth={"lg"} fullWidth={true} TransitionComponent={Transition} keepMounted onClose={closeModal}
                aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <Title title="Agregar nuevo registro de afiliación" />
                <React.Fragment>
                    <div className={classes.signupContainer}>
                        <div className={classes.signupBox}>
                            <React.Fragment>
                                <div className={classes.root}>
                                    <br />
                                    <Container className={classes.colorComponente}>
                                        <Grid container>
                                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.formTitle}>
                                                <Typography component="span" variant="body1" color="textPrimary">
                                                    <strong>Ingrese los datos del afiliado.</strong>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.inputContainer}>
                                                <FormNewPackage handleClose={closeModal} updateState={props.updateState} correlativo={props.correlativo}
                                                    updateData={props.updateData} />
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <div className={classes.lineaDegradadaBottom}></div>
                                    </Container>
                                    <br />
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </React.Fragment>
            </Dialog>
        </div>
    );
}