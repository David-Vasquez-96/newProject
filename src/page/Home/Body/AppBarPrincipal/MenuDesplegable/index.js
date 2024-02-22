import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse} from '@material-ui/core';
import { Description, DesktopWindows, Dns, ExpandLess, ExpandMore, FormatListNumbered, ListAlt, People, Security } from '@material-ui/icons';
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
            {nombreGrupo: 'Módulo de Categorias', iconoGrupo: <Description />, to: '/categorias', type: 2, forms:[]},
            {nombreGrupo: 'Módulo de Procesos', iconoGrupo: <Description />, type: 1, forms:[
                {nombreFormulario: 'Procesos', iconoFormulario: <Description />, to: '/procesos', type: 2, },
            ]},
            {nombreGrupo: 'Módulo de Seguridad', iconoGrupo: <Security />, type: 1, forms: [
                {nombreFormulario: 'Roles', iconoFormulario: <DesktopWindows />, to: '/roles', type: 2},
                {nombreFormulario: 'Usuarios', iconoFormulario: <People />, to: '/usuarios', type: 2},
                // {nombreFormulario: 'Grupo de formularios', iconoFormulario: <Dns />, to: '/grupoFormularios', type: 2},
                // {nombreFormulario: 'Formularios', iconoFormulario: <FormatListNumbered />, to: '/usuarios', type: 2},
            ]},
            // {nombreGrupo: 'Módulo de Categorias', imageGrupo: 'assets/PerfilUsuario.png', to: '/categorias', type: 2, forms:[]},
            // {nombreGrupo: 'Módulo de Procesos', imageGrupo: 'assets/PerfilUsuario.png', type: 1, forms:[
            //     {nombreFormulario: 'Procesos', imageFormulario: 'assets/Instrucciones.png', to: '/procesos', type: 2, },
            // ]},
            // {nombreGrupo: 'Módulo de Seguridad', imageGrupo: 'assets/PerfilUsuario.png', type: 1, forms: [
            //     {nombreFormulario: 'Sistemas', imageFormulario: 'assets/Instrucciones.png', to: '/usuarios', type: 2},
            //     {nombreFormulario: 'Usuarios', imageFormulario: 'assets/Instrucciones.png', to: '/usuarios', type: 2},
            //     {nombreFormulario: 'Grupo de formularios', imageFormulario: 'assets/Instrucciones.png', to: '/grupoFormularios', type: 2},
            //     {nombreFormulario: 'Formularios', imageFormulario: 'assets/Instrucciones.png', to: '/usuarios', type: 2},
            // ]},
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
                                    <ListItem className={classes.listItemTitle} button onClick={() => handleClick(index)}>
                                        <ListItemIcon className={classes.ListItemIconTitle}>{label?.iconoGrupo} </ListItemIcon>
                                        {/* <img className={classes.mobileIcon} src={ label?.imageGrupo} /> */}
                                        <ListItemText className={classes.listItemTextTitle} primary={label?.nombreGrupo} />
                                        {open[index] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                label.forms.map((forms, index) => (
                                                    <ListItem button to={forms?.to} component={Link} key={index} className={classes.nested}>
                                                        <ListItemIcon>{forms?.iconoFormulario} </ListItemIcon>
                                                        {/* <img className={classes.mobileIcon} src={ forms?.imageFormulario} /> */}
                                                        <ListItemText primary={forms?.nombreFormulario} />
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Collapse>
                                    </>
                                ) : (
                                    <ListItem className={classes.listItemTitle} button to={label?.to} component={Link} key={index}>
                                        <ListItemIcon className={classes.ListItemIconTitle}>{label?.iconoGrupo} </ListItemIcon>
                                        {/* <img className={classes.mobileIcon} src={ label?.imageGrupo} /> */}
                                        <ListItemText className={classes.listItemTextTitle} primary={label?.nombreGrupo} />
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