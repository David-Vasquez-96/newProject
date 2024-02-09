const mapStateToProps = state => 
     ({
        currentUser: state.security.currentUser
    });

export default mapStateToProps;
