const mapStateToProps = state => 
     ({
        step: state.signUp.step,
        tokenRecaptcha: state.signUp.tokenRecaptcha,
        RecaptchaStatus: state.signUp.RecaptchaStatus
    });

export default mapStateToProps;
