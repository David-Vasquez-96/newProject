import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse} from '@material-ui/core';
import { Description, Dns, ExpandLess, ExpandMore, FormatListNumbered, ListAlt, People } from '@material-ui/icons';
import {Link } from 'react-router-dom';
import {useStyles} from './style';

// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';
import { setMenu } from 'store/reducers/SecuritySlice';

export default function SwipeableTemporaryDrawer(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const menuList = useSelector( state => state.security.menu); 
    const [open, setOpen] = React.useState({});

    const handleClick = (index) => {
        setOpen({ ...open, [index]: !open[index],});
    };

    const FuncionGuardarMenu = () => {
        dispatch(setMenu([]))
        const menu = [
            {title: 'Módulo de Categorias', icon: <Description />, to: '/categorias', type: 2, forms:[
                {title: 'Categorias', icon: <Description />, to: '/categorias', type: 2, forms:[]},
            ]},
            {title: 'Módulo de Procesos', icon: <Description />, to: '/procesos', type: 1, forms:[
                {title: 'Procesos', icon: <Description />, to: '/procesos', type: 2, },
            ]},
            {title: 'Módulo de Usuarios', icon: <People />, to: '/usuarios', type: 1, forms:[
                {title: 'Usuarios', icon: <People />, to: '/usuarios', type: 2},
            ]},
            {title: 'Módulo de Menús', icon: <ListAlt />, to: '/usuarios', type: 1, forms: [
                {title: 'Grupo de formularios', icon: <Dns />, to: '/usuarios', type: 2},
                {title: 'Formularios', icon: <FormatListNumbered />, to: '/usuarios', type: 2},
            ]},
        ]
        dispatch(setMenu(menu))
    }

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            // onClick={props.FuncionCerrarOpenMenu}
            onKeyDown={props.FuncionCerrarOpenMenu}
        >
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">Menú Principal</ListSubheader>
                }            
            >
                <Divider />
                {
                    menuList.map((label, index) => (
                        <React.Fragment key={index}>
                            {
                                (label?.type === 1) ? (                                    
                                <>
                                    <ListItem button onClick={() => handleClick(index)}>
                                        <ListItemIcon>{label?.icon} </ListItemIcon>
                                        <ListItemText primary={label?.title} />
                                        {open[index] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                label.forms.map((forms, index) => (
                                                    <ListItem button to={forms?.to} component={Link} key={index} className={classes.nested}>
                                                        <ListItemIcon>{forms?.icon} </ListItemIcon>
                                                        <ListItemText primary={forms?.title} />
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Collapse>
                                    </>
                                ) : (
                                    <ListItem button to={label?.to} component={Link} key={index}>
                                        <ListItemIcon>{label?.icon} </ListItemIcon>
                                        <ListItemText primary={label?.title} />
                                    </ListItem>                                    
                                )
                            }
                        </React.Fragment>
                    ))
                }
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
                onOpen={(props.menuDirection, true)}
            >        
                {list(props.menuDirection)}
            </SwipeableDrawer>
        </React.Fragment>
    </div>
);
}