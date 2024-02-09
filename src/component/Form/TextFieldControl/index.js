import React, { useState } from "react";
import { TextField } from "@material-ui/core/";
import { useStyles } from "./style";

export default function FormControlTextField(props) {
  const classes = useStyles();
  const [self, setSelf] = useState(props.this);
  return (
    <div className={classes.root}>
          <TextField  style={props.size ? { width: props.size } : {width: 350}}
            type={props.type || 'text'}
            variant="outlined"
            error={props.isError}
            key={props.name}
            label={props.label}
            id={props.name}
            name={props.name}
            value={props.value || ""}
            autoFocus={(props.autoFocus) ? props.autoFocus: ''}
            helperText={(props.isError) ? props.errorMessages : ''}
            onChange={(event) => {
              props.handleChange(event, self);
            }}
            onKeyPress={
              props.keyPress
            }
            disabled={props.disabled}
            aria-describedby="component-error-text"
          />
    </ div>
  );
}