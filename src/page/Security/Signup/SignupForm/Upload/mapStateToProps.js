const mapStateToProps = state => 
    ({
        data: state.signUp.data,
        files: state.signUp.files,
        step: state.signUp.step,
        tokenRecaptcha: state.signUp.tokenRecaptcha,
    });
export default mapStateToProps;
