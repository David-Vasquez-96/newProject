import React from "react";
import { Input, InputLabel } from "@material-ui/core/";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useStyles } from "./style";

export default function FormControlInput(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} style={props.margin ? { margin: props.margin } : { margin: '0px' }}>
      <InputLabel htmlFor="component-error" className={classes.InputLabel}>
        {props.label}
      </InputLabel>
      <Input
        error={props.isError}
        autoComplete="off"
        key={props.name}
        id={props.name}
        name={props.name}
        value={props.value}
        inputProps={{ maxLength: props.maxLength }}
        onChange={props.handleChange}
        onKeyPress={props.keyPress}
        disabled={props.disabled}
        aria-describedby="component-error-text"
      />
      {props.isError ? (
        <FormHelperText className="Mui-error" id="component-error-text">
          {props.errorMessages}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
