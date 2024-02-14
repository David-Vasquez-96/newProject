import React from 'react';
import {FormControlLabel, FormHelperText, FormControl, FormLabel} from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {stylesRadio} from './styles'

export default function FormControlInputRadio(props) {
    const classes = stylesRadio();

    return (
        <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup
                name={props.idelement}
                value={props.value}
                onChange={props.handleChangeRadio} className={classes.radioGroup}
            >
                {props.options?.map( ({value, label}) => (
                    <FormControlLabel
                        key={value}
                        value={value}
                        control={<Radio />}
                        label={label}
                        className={classes.elementGroup}
                    />
                ))
                }
            </RadioGroup>
            {(props.isError) ? <FormHelperText className="Mui-error" id="component-error-text">{props.errorMessages}</FormHelperText> : null }
        </FormControl>
    )
}