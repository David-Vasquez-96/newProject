import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse} from '@material-ui/core';
import { Description, ExpandLess, ExpandMore, People } from '@material-ui/icons';
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
    const [open, setOpen] = React.useState({});

    const handleClick = (index) => {
        setOpen({ ...open, [index]: !open[index],});
    };

    const FuncionGuardarMenu = () => {
        dispatch(setMenu([]))
        const menu = [
            {title: 'Módulo de Categorias', icon: <Description />, to: '/categorias'},
            {title: 'Módulo de Procesos', icon: <Description />, to: '/procesos'},
            {title: 'Módulo de Usuarios', icon: <People />, to: '/usuarios'},
            {title: 'Módulo de Menús', icon: <People />, to: '/usuarios'},
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
                {/* {
                    menuList.map((label, index)=>(                        
                        <ListItem button to={label?.to} component={Link} key={index}>
                            <ListItemIcon>{label?.icon} </ListItemIcon>
                            <ListItemText primary={label?.title} />
                        </ListItem>
                    ))
                } */}
                {
                    [0, 1, 2].map((index) => (
                        <React.Fragment key={index}>
                            <ListItem button onClick={() => handleClick(index)}>
                                <ListItemText primary={`Nested List Group ${index + 1}`} />
                                {open[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Item 1" />
                                    </ListItem>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText primary="Item 2" />
                                    </ListItem>
                                </List>
                            </Collapse>
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
                // onClose={props.FuncionCerrarOpenMenu}
                // onOpen={(props.menuDirection, true)}
            >        
                {list(props.menuDirection)}
            </SwipeableDrawer>
        </React.Fragment>
    </div>
);
}