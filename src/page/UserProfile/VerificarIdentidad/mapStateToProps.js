const mapStateToProps = state => 
     ({
        data: state.certificacionDeGoceDeSusDerechosPoliticos.data,
        currentUser: state.security.currentUser
    });

export default mapStateToProps;
