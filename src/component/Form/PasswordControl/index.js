import React from 'react';
import {Input, OutlinedInput, InputLabel, InputAdornment, IconButton} from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useStyles} from './style';
import {VisibilityOff, Visibility, Lock} from '@material-ui/icons';

export default function FormControlPassword(props) {
    const classes = useStyles(props)();

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
        {
            props.variant === "outlined" ? (
                <FormControl className={(props.style) ? props.style : classes.formControl} variant="outlined" >
                {/* <FormControl className={classes.formControl} variant="outlined" style={ props.minWidth ? { width: props.minWidth} : {minWidth: 350}}> */}
                    <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
                    <OutlinedInput
                        error={props.isError}
                        type={values.showPassword ? 'text' : 'password'}
                        key={props.name}
                        id="outlined-adornment-password"
                        name={props.name}
                        value={values.value}
                        onChange={props.handleChange}
                        keyPress={props.keyPress}
                        placeholder={ props.placeholder || ""}
                        startAdornment={<InputAdornment className={classes.inputAdornment} position="start"><Lock/></InputAdornment>}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility/> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={100}
                    />
                    {(props.isError) ? <FormHelperText className="Mui-error" id="component-error-text">{props.errorMessages}</FormHelperText> : null }
                </FormControl>
            ):(
                <FormControl className={classes.formControl} >
                    <InputLabel htmlFor="component-error">{props.label}</InputLabel>
                    <Input 
                        error={props.isError} 
                        type={values.showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        key={props.name}
                        id={props.name}
                        name={props.name}
                        value={props.value}
                        onChange={props.handleChange}
                        keypress={props.keyPress}
                        aria-describedby="component-error-text"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {(props.isError) ? <FormHelperText className="Mui-error" id="component-error-text">{props.errorMessages}</FormHelperText> : null }
                </FormControl>
            )
        }
        </>
    )
}