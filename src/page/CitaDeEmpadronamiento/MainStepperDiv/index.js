import React from "react";
import { useStyles } from "./style";
import LinearStepper from "./Stepper";

const MainStepperDiv = (props) => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <div className={classes.signupContainer}>
        {/* <div className={classes.signupBox}> */}
          <LinearStepper {...props} />
        {/* </div> */}
      </div>
    </React.Fragment>
  );
};
export default MainStepperDiv;
