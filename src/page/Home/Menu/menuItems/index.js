import React from "react";
import {Icon ,CardContainer, ListItem, ListItemIcon}  from "@material-ui/core";
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";

const MenuItems = () => {
    const classes = useStyles();
    let history = useHistory();
   
    return (
        <CardContainer className={classes.cardContent}>
            {(props.menu!==null && props.menu[props.item_group_index]!==undefined) ? 
                props.menu[props.item_group_index].form.map((item,index)=>{
                return (
                    <ListItem className={classes.jaja} key={index} button onClick={()=>{
                        history.push(item.path,{});
                    }}>
                        <ListItemIcon className={classes.listIcon}>
                            <Icon className={classes.icon}>{item.icon}</Icon>
                        </ListItemIcon>
                        <p className={classes.listButton} >{item.name}</p>
                    </ListItem>
                )
            }) :"vacio"}
        </CardContainer>               
    ); 
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
