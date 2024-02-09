import React, { Component } from "react";
import { publicMenu } from "constant/index";
import Alert from "react-s-alert";
// import LoadingIndicator from "common/LoadingIndicator"; //Ya no estamos usando este spinner.
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Template from "component/Template";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import UserAccount from "page/Security/Login/FormElements/UserAccount";
import LoadingSpinner from "component/LoadingSpinner";
import { Redirect } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: false,
      userAccount: new UserAccount(),
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      await this.state.userAccount.setCurrentUser();
      await this.state.userAccount.setMenu();
      if (this.state.userAccount.getIsError()) {
        Alert.error(this.state.userAccount.getErrorMessage());
        this.setState({ loading: false });
      } else {
        this.props.SET_MENU(this.state.userAccount.getMenu());
        this.props.SET_CURRENT_USER(this.state.userAccount.getCurrentUser());
        this.setState({
          authenticated: this.state.userAccount.getIsAuthenticated,
          loading: false,
        });
      }
    } catch (error) {
      this.props.SET_MENU(publicMenu);
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading)
      return <LoadingSpinner open={this.state.loading}></LoadingSpinner>;

    if (this.state.authenticated)
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              from: this.props.location,
              authenticated: this.state.authenticated,
            },
          }}
        />
      );

    return (
      <>
        <Template></Template>
        <Alert
          stack={{ limit: 1 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
