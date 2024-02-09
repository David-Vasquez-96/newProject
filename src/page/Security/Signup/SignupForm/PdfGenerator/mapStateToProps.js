const mapStateToProps = state => 
    ({
        data: state.signUp.data,
        step: state.signUp.step
    });
export default mapStateToProps;
