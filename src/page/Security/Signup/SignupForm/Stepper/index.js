import React from 'react';
import {StepLabel, Button, Typography, Stepper, Step} from "@material-ui/core/";
import SignupForm from 'page/Security/Signup/SignupForm';
import UploadDocs from '../Upload';
import PdfGenerator from 'page/Security/Signup/SignupForm/PdfGenerator';
import Recapcha from 'page/Security/Signup/SignupForm/Recapcha';
import SaveData from 'page/Security/Signup/SignupForm/SaveData';
import UserRequestMessageSent from 'page/Security/Signup/SignupForm/UserRequestMessageSent'

import {useStyles} from './style';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import { RECATPCHA_KEY } from 'constant';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { WithGoogleRecaptcha } from '../recaptchaV3';

const StepperForm=(props)=> {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [ "Datos Personales", 
                    "Términos y Condiciones", 
                    "Subir Archivos",
                    "Finalizado"];

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <SignupForm/>;
            case 1:
                return <PdfGenerator/>;
            case 2:
                return (
                    <GoogleReCaptchaProvider reCaptchaKey={RECATPCHA_KEY}>
                        <WithGoogleRecaptcha />
                    </GoogleReCaptchaProvider>
                )
            case 3:
                return <UserRequestMessageSent />;
            default:
                return "Unknown step";
        }
    }

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper className={classes.stepperCard} activeStep={props.step}>
                {steps.map((label, index) => {
                    return(
                        <Step   key={index}  >
                            <StepLabel classes={{label: classes.stepLabel}} >
                                {label}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <div>
                {props.step === steps.length ? (
                    <div>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(props.step)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StepperForm);