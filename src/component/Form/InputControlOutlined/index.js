import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { InputAdornment, InputLabel, OutlinedInput } from "@material-ui/core/";
import { useStyles } from "./style";

export default function FormControlInputOutlined(props) {
    const classes = useStyles(props)();
    const [self, setSelf] = useState(props.this);

    return (
        <FormControl variant="outlined" className={(props.style) ? props.style : classes.formControl}>
        {/* <FormControl variant="outlined" className={classes.formControl} style={ props.minWidth ? { width: props.minWidth} : {minWidth: 350}}> */}
            <InputLabel htmlFor="component-outlined" className={classes.InputLabel}>
                {props.label}
            </InputLabel>
            <OutlinedInput
                error={props.isError}
                autoComplete="off"
                type={props.type || 'text'}
                key={props.name}
                defaultValue={props.label}
                label={props.label}
                id="component-outlined"
                name={props.name}
                value={props.value}
                inputProps={{ maxLength: props.maxLength }}
                // onChange={props.handleChange}
                onChange={(event) => {
                    props.handleChange(event, self);
                }}                                    
                onKeyPress={props.keyPress}
                disabled={props.disabled}
                placeholder={ props.placeholder || ""}
                startAdornment={
                    props.icon && (<InputAdornment position="start" className={classes.inputAdornment}>{props.icon}</InputAdornment>)
                }
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
