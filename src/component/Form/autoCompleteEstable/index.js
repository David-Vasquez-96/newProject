import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useStyles} from './style';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FormControl, Grid, IconButton, InputAdornment, Tooltip } from '@material-ui/core';
import {Block, Edit} from '@material-ui/icons';

export default function ComboBoxAutoComplete(props) {
	const classes = useStyles();
    
	return (
        <FormControl className={(props.style) ? props.style : classes.grid}  key={props.name}>
            <Autocomplete
                key={props.name}
                value={props.value}
                id={props.name}
                name={props.name}
                onChange={(event, newValue) => {
                    if(newValue) {
                        props.handleChange({ target: {value: newValue?.id, name: props.name, text: newValue?.name} });
                    } else {
                        props.handleChange({target: {value:'', name: props.name, text:''}});
                    }
                }}
                disabled={props.disabled}
                options={props.list || []}
                noOptionsText="No encontrado"
                getOptionLabel={(option) => {
                    return option ? option.name : option
                }}
                defaultValue={ (option) => {
                    return option ? option.name || option : ''
                }}
                getOptionSelected={ () => true}
                renderInput={(params) =>
                    <TextField
                        error={props.isError}
                        onFocus={() =>  {
                            if(props?.focus?.ejecutar){                            
                                props.focus.function()
                            }
                        }}
                        id={props.name}
                        variant={props.variant}
                        name={props.name}
                        {...params} label={`${props.label}`}  className={classes.textField}
                        InputProps={{
                            ...params.InputProps,
                                startAdornment: ( <InputAdornment position="start">{props.icon}</InputAdornment>)
                        }}
                    />
                }

            />
            {
                props.isError ? ( <FormHelperText className={classes.textError} id="component-error-text">{props.errorMessages}</FormHelperText>) 
                : null
            }
        </FormControl>
	);
}

ComboBoxAutoComplete.defaultProps = {
    showSelectAutoComplete: true
}