import React from "react";
import { useStyles } from "./style";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export default function ComboBox(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{props.label}</FormLabel>
        <FormGroup>
          {props.list.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    size="small"
                    checked={option.checked}
                    onChange={(event, newValue) => {
                      var event = {
                        target: {
                          checked: event.target.checked,
                          name: event.target.name,
                          elementName: props.name,
                        },
                      };
                      props.handleChange(event);
                    }}
                    name={option.id}
                  />
                }
                label={option.label}
              />
            );
          })}
        </FormGroup>
        {props.isError ? (
          <FormHelperText className="Mui-error">
            {props.errorMessages}
          </FormHelperText>
        ) : (
          <React.Fragment />
        )}
      </FormControl>
    </React.Fragment>
  );
}
