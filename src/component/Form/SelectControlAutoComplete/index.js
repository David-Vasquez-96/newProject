import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStyles } from "./style";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";


export default function ComboBox(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
        <FormControl className={classes.formControl}>
            {props.value === "" || props.value === 0 ? (
                <React.Fragment>
                    <Autocomplete
                    // id="controllable-states-demo"
                    className={classes.formControl}
                    id={props.name}
                    name={props.name}
                    onChange={(event, newValue) => {
                        if (newValue !== null) {
                        var event = {
                            target: { value: newValue.id, name: props.name },
                        };
                        props.handleChange(event);
                        } else {
                        var event = {
                            target: { value: "", name: "" },
                        };
                        props.handleChange(event);
                        }
                    }}
                    disabled={props.disabled}
                    options={props.list}
                    noOptionsText="No encontrado"
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                        id={props.name}
                        name={props.name}
                        value={props.value}
                        variant={props.variant}
                        {...params}
                        label={props.label}
                        className={classes.textField}
                        />
                    )}
                    />
                    {props.isError ? (
                    <FormHelperText className="Mui-error" id="component-error-text">
                        {props.errorMessages}
                    </FormHelperText>
                    ) : null}
                </React.Fragment>
                ) : props.list.length > 0 ? (
                    <React.Fragment>
                        <Autocomplete
                        // id="controllable-states-demo"
                        className={classes.formControl}
                        id={props.name}
                        name={props.name}
                        onChange={(event, newValue) => {
                            if (newValue !== null) {
                            var event = {
                                target: { value: newValue.id, name: props.name },
                            };
                            props.handleChange(event);
                            }
                        }}
                        disabled={props.disabled}
                        options={props.list}
                        noOptionsText="No encontrado"
                        getOptionLabel={(option) => option.name}
                        defaultValue={props.list[props.position]}
                        renderInput={(params) => (
                            <TextField
                            id={props.name}
                            name={props.name}
                            value={props.value}
                            variant={props.variant}
                            {...params}
                            label={props.label}
                            className={classes.textField}
                            />
                        )}
                        />
                        {props.isError ? (
                        <FormHelperText className="Mui-error" id="component-error-text">
                            {props.errorMessages}
                        </FormHelperText>
                        ) : null}
                    </React.Fragment>
                ) : (
                ""
            )}
        </FormControl>
        </React.Fragment>
    );
}
