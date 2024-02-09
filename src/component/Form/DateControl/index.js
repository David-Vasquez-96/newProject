import "date-fns";
import React from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/es";
import { useStyles } from "./style";
import FormHelperText from "@material-ui/core/FormHelperText";


export default function FormControlDate(props) {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl} >
            <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
                <KeyboardDatePicker
                    error={props.isError}
                    invalidDateMessage={props.isError ? null:"Ingrese un formato válido"}
                    maxDateMessage="La fecha no debe ser posterior a la fecha máxima"
                    minDateMessage="La fecha no debe ser anterior a la fecha mínima"
                    // className={classes.formControl}
                    maxDate={props.maxDate}
                    variant="inline"
                    inputVariant={props.inputVariant}
                    format="dd/MM/yyyy"
                    // margin="normal"
                    id={props.name}
                    name={props.name}
                    key={props.name}
                    label={props.label}
                    value={props.value}
                    disabled={props.disabled}
                    onChange={(date) => {
                        props.handleChange({ target: { name: props.name, value: date } });
                    }}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                    }}
                />
            </MuiPickersUtilsProvider>
            {props.isError ? (
                <FormHelperText className="Mui-error" id="component-error-text">
                    {props.errorMessages}
                </FormHelperText>
            ) : null}
        </FormControl>
    );
}
