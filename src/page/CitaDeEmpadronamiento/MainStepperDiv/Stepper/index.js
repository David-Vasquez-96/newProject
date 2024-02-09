import React from "react";
import Finished from "../Finished";
import { connect } from "react-redux";
import { useStyles } from "./style";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import CrearCitaEmpadronamiento from "../CrearCitaEmpadronamiento";
import { StepLabel, Button, Stepper, Step, Typography } from "@material-ui/core/";
import TextoDescriptivoCitas from "../TextoDescriptivo";

const StepperForm = (props) => {
    const classes = useStyles();
    const steps = ["Información de Cita", "Finalizado"];

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <CrearCitaEmpadronamiento {...props} />;
            case 1:
                return (
                    <div>
                        <Finished {...props} />
                    </div>
                );
            default:
                return "Unknown step";
        }
    };

    const handleReset = () => {
        //setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepperCard} activeStep={props.step}>
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
           <TextoDescriptivoCitas/>
            <div>
                {props.step === steps.length ? (
                    <div>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>{getStepContent(props.step)}</div>
                )}
            </div>
        </div>
    );
    };

    export default connect(mapStateToProps, mapDispatchToProps)(StepperForm);
