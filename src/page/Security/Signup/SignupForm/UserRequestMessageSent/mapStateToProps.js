const mapStateToProps = state => 
     ({         
         step: state.signUp.step,
         data: state.signUp.data,
    });

export default mapStateToProps;
