import React from 'react';
import {useStyles} from './style';
// import {connect } from "react-redux";
// import mapStateToProps from './mapStateToProps';
// import mapDispatchToProps from './mapDispatchToProps';
import { Redirect } from 'react-router-dom';
import IconElement from 'component/IconElement/index'; 
// import Footer from 'pages/Home/Footer2';
import Avatar from '@material-ui/core/Avatar';
// import Title from 'components/TitleWithIcon';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

 const  Login= (props)=> {
    const classes = useStyles(props);
    let url  ="/assets/paginaEnMantenimiento.svg";
    if (props.authenticated)
        return <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location, authenticated:props.authenticated }
                    }}/>; 
    else
        return (
            <div style={{backgroundColor: "#EDEDED" }}>
                {/* <Title title="Página en Mantenimiento" icon={"/assets/SkyIcon.svg"}/> */}
                <div className={classes.img}>
                <IconElement/>
                </div>
                <h1 className={classes.titleLeft}> Página en Mantenimiento </h1>                
                <img className={classes.img} alt="complex" src={url} />
            </div>
        ) 
}
export default (Login);