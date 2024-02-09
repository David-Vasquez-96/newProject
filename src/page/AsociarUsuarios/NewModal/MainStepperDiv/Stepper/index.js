import React from "react";
import { StepLabel, Button, Stepper, Step } from "@material-ui/core/";
import SaveData from "../SaveData";
import Finished from "../Finished";
import ConsultaUsuario from "../ConsultaUsuario";
import PermissionForICO from "../PermissionForICO";
import PermissionForAfiliacion from "../PermissionForAfiliacion";
import { useStyles } from "./style";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const StepperForm = (props) => {
  const classes = useStyles();
  const steps = [
    "Ingreso de datos del usuario",
    "Habilitar permisos",
    "Finalizado",
  ];

  const getStepContent = (step) => {
    // console.log("step:", step);
    switch (step) {
      case 0:
        return <ConsultaUsuario {...props} />;
      case 1:
        return (
          <div className={classes.upload}>
            <PermissionForICO {...props} />
            <PermissionForAfiliacion {...props} />
            <SaveData {...props} />
          </div>
        );
      case 2:
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
