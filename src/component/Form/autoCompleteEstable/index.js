import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useStyles} from './style';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Grid, IconButton, InputAdornment, Tooltip } from '@material-ui/core';
import {Block, Edit} from '@material-ui/icons';

export default function ComboBoxAutoComplete(props) {
	const classes = useStyles();
    const [values, setValues] = React.useState({
        valor: '',
        active: props.disabled,
      });

    
    const handleClickShowPassword = () => {
        setValues({ ...values, active: !values.active });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };	    
	return (
		<Fragment  key={props.name}>
			{props?.showSelectAutoComplete && (
                <Grid className={classes.grid}  key={props.name}>
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
                        disabled={values.active}
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
                            props.modified ?
                                <>
                                    <Grid container alignItems="flex-end">
                                        <Grid item xs={10} >                        
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
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <InputAdornment position="start" className={classes.icon}>
                                                <Tooltip title={values.active ? "editar" : 'Bloquear'}>
                                                <IconButton 
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    >
                                                    {values.active ? <Edit /> : <Block />}
                                                </IconButton>
                                                </Tooltip>
                                            </InputAdornment>							
                                        </Grid>									
                                    </Grid>						
                                </> 
                                : 
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
                </Grid>
		    )}
		</Fragment>
	);
}

ComboBoxAutoComplete.defaultProps = {
    showSelectAutoComplete: true
}