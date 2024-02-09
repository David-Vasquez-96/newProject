const mapStateToProps = state => 
     ({
        menu: state.security.menu,        
        item_group_index:state.menu.item_group_index
    });

export default mapStateToProps;
