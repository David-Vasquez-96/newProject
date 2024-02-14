import React from 'react';
import { Checkbox, TextField, FormControl, FormHelperText } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons';
import {useStyles} from './styles';

export default function FormControlSelectAutoCompleteCheckbox (props){
    const classes = useStyles();

    return(
        <FormControl className={classes.formControl} >
            <Autocomplete multiple
                id={props.name}
                name={props.name}
                key={props.name}
                options={props.options}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                    if(newValue) {
                        props.handleChange(props.name, newValue);
                    } else {
                        props.handleChange([]);
                    }
                }}
                // onChange={(event, newValue) => {
                //     if(newValue) {
                //         props.handleChange({ target: {value: newValue?.id, name: props.name, text: newValue?.name, data: newValue} });
                //     } else {
                //         props.handleChange({target: {value:'', name: props.name, text:''}});
                //     }
                // }}                
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                        checkedIcon={<CheckBox fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        variant="standard" 
                        label={props.label} 
                        placeholder={props.placeholder} 
                        onFocus={() =>  {
                            if(props?.focus?.ejecutar){                            
                                props.focus.function()
                            }
                        }}                        
                    />
                )}
            />
            {(props.isError) ? <FormHelperText className="Mui-error" id="component-error-text">{props.errorMessages}</FormHelperText> : null }
        </FormControl>  
    )
}                                    