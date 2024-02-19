import React, { Component, useEffect, useState } from "react";
import { publicMenu } from "constant/index";
import Alert from "react-s-alert";
// import LoadingIndicator from "common/LoadingIndicator"; //Ya no estamos usando este spinner.
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Template from "component/Template";
import UserAccount from "page/Security/Login/FormElements/UserAccount";
import LoadingSpinner from "component/LoadingSpinner";
import { Redirect } from "react-router-dom";
/**** REDUX ****/
import { useDispatch } from 'react-redux';
import { setMenu, setCurrentUser } from 'store/reducers/SecuritySlice';

export default function App(props) {
	/**** VARIABLES ****/
	const [loading, setLoading] = useState(false);
	const [authenticated, setAuthenticated] = useState(false),
	dispatch = useDispatch();

	/**** FUNCTIONS ****/
	const checkAutorization  = async () => {    
		let userAccount = new UserAccount();
		setLoading(true);
		try {
		await userAccount.setCurrentUser();
		await userAccount.setMenu();
		if(userAccount.getIsError()){
			Alert.error(userAccount.getErrorMessage());
			setLoading(false);
		}else{
			dispatch(setMenu(userAccount.getMenu()));
			dispatch(setCurrentUser(userAccount.getCurrentUser()));    
			setAuthenticated(userAccount.getIsAuthenticated())
			setLoading(false);
		}
		} catch (error) {
		dispatch(setMenu([]));
		setLoading(false);
		}
	}

	useEffect(() => {
		checkAutorization();    
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/**** RENDER ****/
	if (loading) return <LoadingSpinner open={loading}></LoadingSpinner>;

	if (authenticated)
		return (
			<Redirect
				to={{
				pathname: "/",
				state: {
					from: props.location,
					authenticated: authenticated,
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