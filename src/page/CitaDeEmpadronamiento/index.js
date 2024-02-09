import React from "react";
import Title from "component/TitleWithIcon";
import Footer from "page/Home/Footer2";
import { connect } from "react-redux";
import { useStyles } from "./style";
import LinearStepper from "./MainStepperDiv/Stepper";
import MainStepperDiv from "./MainStepperDiv";
import LoadingSpinner from "component/LoadingSpinner";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const CitaDeEmpadronamiento = (props) => {
    const classes = useStyles(props);
    const [loadingStepperSpinner, setloadingStepperSpinner]=React.useState(false);
    
    const clearFiles = () => {props.CITA_EMPADRONAMIENTO_SET_STEP(0)};
    // this.state.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(
    //   this.state.dataUsuarioPorAsociarVacia
    // );
    return (
        <div>
            <div className={classes.signupContainer}>
                <Title title="Formulario para solicitud de cita de Empadronamiento o Actualización de Datos" icon={"/assets/CreacionUsuario.png"}/>
                <div className={classes.signupBox}>
                    <LinearStepper setloadingStepperSpinner={setloadingStepperSpinner} handleClose = {clearFiles} {...props}/>
                    {/* <MainStepperDiv setloadingStepperSpinner={setloadingStepperSpinner} handleClose = {clearFiles} {...props}   /> */}
                    <LoadingSpinner open={loadingStepperSpinner}></LoadingSpinner> 
                </div>
            </div>
            <br/><br/><br/>
            <Footer />
        </div>
    );
    };

export default connect(mapStateToProps, mapDispatchToProps)(CitaDeEmpadronamiento);
