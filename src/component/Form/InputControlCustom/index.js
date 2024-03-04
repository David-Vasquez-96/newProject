import React, { useState } from 'react';
import {IconButton, FormHelperText, FormControl, Input, InputLabel, MuiThemeProvider, Tooltip} from '@material-ui/core';
import {Block, Edit} from '@material-ui/icons';
import { createMuiTheme } from "@material-ui/core/styles";
import {useStyles} from './style';

export default function FormControlPassword(props) {
    const classes = useStyles();
    const [self, setSelf] = useState(props.this);

    const [values, setValues] = React.useState({
        valor: '',
        activarCampo: props.disabled,
      });

    
    const handleClickShowPassword = (event) => {
        setValues({ ...values, activarCampo: !values.activarCampo });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const theme = createMuiTheme({
      overrides: {
        MuiTooltip: {
          tooltip: {
            fontSize: "1rem",
            color: "white",
            backgroundColor: "#205690",
            borderRadius: 10,
            padding: '1rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'center'
          }
        }
      }
    });
    return (
        <FormControl className={classes.formControl} >
            <InputLabel htmlFor="component-error">{props.label}</InputLabel>
            <Input 
                type={props.type || 'text'}
                error={props.isError} 
                key={props.name}
                id={props.name}
                name={props.name}
                autoComplete={props.autoComplete ? "" : "none"}
                value={props.value || ""}
                // onChange={props.handleChange}
                onChange={(event) => {
                  props.handleChange(event, self);
                }}                
                keypress={props.keyPress}
                aria-describedby="component-error-text"
                disabled={values.activarCampo}

                endAdornment={
                    <MuiThemeProvider theme={theme}>
                      <Tooltip title={values.activarCampo ? "Editar" : "Bloquear"}>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          >
                            {values.activarCampo ? <Edit /> : <Block />}
                        </IconButton>
                      </Tooltip>
                    </MuiThemeProvider>                                          
                  }
            />
          {
            props.isError ? ( <FormHelperText className={classes.textError} id="component-error-text">{props.errorMessages}</FormHelperText>) 
            : null
            // <FormHelperText className={classes.textSuccess} id="component-success-text">{props.errorMessages}</FormHelperText>
          }
        </FormControl>  
    )
}