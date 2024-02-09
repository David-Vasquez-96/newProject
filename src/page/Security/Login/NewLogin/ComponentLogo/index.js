import React from "react";
import { useStyles } from "./style";

const ComponentLogo = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.containerLogo}>
                <img alt="LOGO DEL TSE" src="assets/userLogin2.svg" className={classes.mobileIcon} />
        </div>
    );
};
export default ComponentLogo;