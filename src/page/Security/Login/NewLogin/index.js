import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useStyles } from "./style";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import ComponentForm from './ComponentForm'

const ComponentNewLogin = (props) => {
    const classes = useStyles();

    if (props.authenticated)
        return (
            <Redirect
                to={{
                    pathname: "/",
                    state: { from: props.location, authenticated: props.authenticated },
                }}
            />
        );
    else
        return (
            <ComponentForm />
        );
};
export default connect(mapStateToProps, mapDispatchToProps)(ComponentNewLogin);