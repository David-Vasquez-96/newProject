import React from 'react';
import {useStyles} from './style';
import LinearStepper from './SignupForm/Stepper/';
// import Footer from 'page/Home/Footer2';
import Footer from 'page/Home/footer';
import Title from 'component/TitleWithIcon';

const SignUp = (props) => {
    const classes = useStyles(props);
    return (
        <div >
            <div className={classes.signupContainer}>    
                <Title title="Formulario para solicitud de creación de usuario" icon={"/assets/CreacionUsuario.png"}/>
                <LinearStepper/>
                {/* <Footer />  */}
            </div>
            {/* <Footer />  */}
        </div>
    ) 
}
export default SignUp;