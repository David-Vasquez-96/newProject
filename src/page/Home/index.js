import React, { Component } from 'react';
import LoadingIndicator  from 'common/LoadingIndicator';
import { Redirect } from 'react-router-dom'
import Body from './Body/index';
import Menu from './Menu';
import Footer from './Footer2';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  loading: false, 
                        authenticated: props.authenticated,
                        location: this.props.location
                    }
    }
  
    componentDidMount() { this.setState({loading: false }); }
    
    render() {
        if (!this.state.authenticated){ 
            return <Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location, authenticated: this.state.authenticated }
                }}/>;
            }

        if (this.state.loading) return (<LoadingIndicator></LoadingIndicator>)
        else return (<Body/>)
    }
}
export default Home;