import React from "react";
import {
  FormHelperText,
  FormControl,
  MenuItem,
  TextField,
} from "@material-ui/core/";
import { useStyles } from "./style";

export default function FormControlInput(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <TextField
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        disabled={props.disabled}
        select
        label={props.label}
        disabled={props.disabled}
        className={classes.textField}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {props.list.map((option, index) => (
          <MenuItem key={index} value={option.id} data-index={index}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      {props.isError ? (
        <FormHelperText className="Mui-error" id="component-error-text">
          {props.errorMessages}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
