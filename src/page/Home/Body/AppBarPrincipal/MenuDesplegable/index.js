import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader} from '@material-ui/core';
import { Description, People } from '@material-ui/icons';
import {Link } from 'react-router-dom';
// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';
import { setMenu } from 'store/reducers/SecuritySlice';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const menuList = useSelector( state => state.security.menu); 

    const FuncionGuardarMenu = () => {
        dispatch(setMenu([]))
        const menu = [
            {title: 'Categorias', icon: <Description />, to: '/categorias'},
            {title: 'Procesos', icon: <Description />, to: '/procesos'},
            {title: 'Usuarios', icon: <People />, to: '/usuarios'},
        ]
        dispatch(setMenu(menu))
    }

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={props.FuncionCerrarOpenMenu}
            onKeyDown={props.FuncionCerrarOpenMenu}
        >
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">Menú</ListSubheader>
                }            
            >
                <Divider />
                {
                    menuList.map((label, index)=>(                        
                        <ListItem button to={label?.to} component={Link} key={index}>
                            <ListItemIcon>{label?.icon} </ListItemIcon>
                            <ListItemText primary={label?.title} />
                        </ListItem>
                    ))
                }
                {/* <Divider /> */}
                {/* <ListItem button onClick={props.onLogout}>
                    <ListItemIcon> <ExitToApp /></ListItemIcon>
                    <ListItemText primary="Cerrar sesión" />
                </ListItem> */}
            </List>
        </div>
    );

    useEffect(()=>{
        FuncionGuardarMenu()
    },[])
return (
    <div>
        <React.Fragment key={'left'}>
            <SwipeableDrawer
                anchor={props.menuDirection}
                open={props.openMenu}
                onClose={props.FuncionCerrarOpenMenu}
                // onOpen={props.toggleDrawer(props.menuDirection, true)}
            >        
                {list(props.menuDirection)}
            </SwipeableDrawer>
        </React.Fragment>
    </div>
);
}