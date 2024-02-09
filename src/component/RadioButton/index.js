import React from "react";
import {
  FormControlLabel,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@material-ui/core/";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { stylesRadio } from "./styles";

export default function FormControlInputRadio(props) {
  const classes = stylesRadio();

  return (
    <FormControl className={classes.formControl} component="fieldset">
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup
        key={props.elementKey}
        name={props.idelement}
        value={props.value}
        // value = "1"
        // defaultValue= {props.options[1]}
        // defaultValue= {["1"]}
        onChange={props.handleChangeRadio}
        className={classes.radioGroup}
      >
        {props.options?.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            disabled={props.disabled}
            value={value}
            control={<Radio />}
            label={label}
            className={classes.elementGroup}
          />
        ))}
      </RadioGroup>
      {props.isError ? (
        <FormHelperText className="Mui-error" id="component-error-text">
          {props.errorMessages}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
