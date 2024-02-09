import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStyles } from "./style";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function ComboBox(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        {props.defaultValue === "" ? (
          <Autocomplete
            key={props.autoCompleteKey}
            disabled={props.disabled}
            className={classes.formControl}
            options={props.list}
            noOptionsText={"No encontrado"}
            getOptionLabel={(option) => option.name}
            id={props.name}
            onChange={(event, newValue) => {
              let newValueId = null;
              let newValueName = null;
              if (newValue != null) {
                newValueId = newValue.id;
                newValueName = newValue.name;
              }
              var event = {
                target: {
                  value: newValueId,
                  name: newValueName,
                  elementName: props.name,
                },
              };
              props.handleChange(event);
            }}
            renderOption={(option) => (
              <React.Fragment>{option.name}</React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.autoCompleteTextField}
                label={props.label}
                margin="normal"
                value={props.value}
              />
            )}
          />
        ) : (
          <Autocomplete
            key={props.autoCompleteKey}
            disabled={props.disabled}
            className={classes.formControl}
            options={props.list}
            noOptionsText={"No encontrado"}
            defaultValue={props.list[props.defaultValue]}
            getOptionLabel={(option) => option.name}
            id={props.name}
            onChange={(event, newValue) => {
              let newValueId = null;
              let newValueName = null;
              if (newValue != null) {
                newValueId = newValue.id;
                newValueName = newValue.name;
              }
              var event = {
                target: {
                  value: newValueId,
                  name: newValueName,
                  elementName: props.name,
                },
              };
              props.handleChange(event);
            }}
            renderOption={(option) => (
              <React.Fragment>{option.name}</React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.autoCompleteTextField}
                label={props.label}
                margin="normal"
                value={props.value}
              />
            )}
          />
        )}

        {props.isError ? (
          <FormHelperText className="Mui-error" id="component-error-text">
            {props.errorMessages}
          </FormHelperText>
        ) : null}
      </FormControl>
    </React.Fragment>
  );
}
