import React, {useState} from 'react'
import {Button, FormControl, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core'
import {NavigateNext, NavigateBefore} from '@material-ui/icons';
import PdfInstructions from 'page/Security/Signup/SignupForm/PdfInstructions';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import {useStyles} from './style';
import Title from 'component/TitleWithIcon';


 const PdfGenerator=(props) =>{
    const classes = useStyles(),
        [checked, setChecked] = useState(false),
        handleChange = (event) => {
            setChecked(event.target.checked);
        };

    const nextStep=()=>{props.SIGNUP_SET_STEP(props.step+1);    };
    const backStep=()=>{ props.SIGNUP_SET_STEP(props.step-1);   };

    return (
        <div>
            {/* <Title title="Términos y Condiciones" icon={"/assets/Instrucciones.png"}/> */}
            <div style={{textAlign: 'justify'}}>
                <PdfInstructions/>
            </div>
            <div className={classes.container}>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                control={<Checkbox color="primary" onChange={handleChange} checked={checked} />}
                                label="He leído y Acepto los Términos y Condiciones para la creación de usuario y uso de los servicios del TSE."
                                labelPlacement="right"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>               
                    <Button className={classes.buttonMargin} variant="outlined" color="secondary" onClick={backStep} endIcon={<NavigateBefore />}>Regresar</Button>                
                    <Button disabled={!checked}  variant="outlined" color="primary" onClick={nextStep} endIcon={<NavigateNext />}>Siguiente</Button>
                </Grid>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (PdfGenerator);