import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse, Icon} from '@material-ui/core';
import { Description, DesktopWindows, Dns, ExpandLess, ExpandMore, FormatListNumbered, ListAlt, People, Security } from '@material-ui/icons';
import {Link } from 'react-router-dom';
import {useStyles} from './style';

// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';
import { setMenu, setForms } from 'store/reducers/SecuritySlice';

export default function SwipeableTemporaryDrawer(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const menuList = useSelector( state => state.security.menu); 
    const formGroup = JSON.parse(JSON.stringify(useSelector( state => state.security.formGroup)));
    const forms = JSON.parse(JSON.stringify(useSelector( state => state.security.forms)));
    const [open, setOpen] = React.useState({});

    const handleClick = (index) => {
        setOpen({ ...open, [index]: !open[index],});
    };

    const FuncionGuardarMenu = () => {
        dispatch(setMenu([]))
        const grupoDeFormularios = formGroup;
        const formularios = forms;
        for (let index = 0; index < grupoDeFormularios.length; index++) {
            const current = formularios?.filter( ({idGrupo}) => Number(idGrupo) === Number(grupoDeFormularios[index].idGrupo));
            if(current?.length > 0) 
                grupoDeFormularios[index].form = current
            else
                grupoDeFormularios[index].form = []
        }
        dispatch(setMenu(grupoDeFormularios))
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
                                        <ListItemIcon className={classes.ListItemIconTitle}><Icon>{label?.iconoGrupo}</Icon></ListItemIcon>
                                        {/* <ListItemIcon className={classes.ListItemIconTitle}>{label?.iconoGrupo} </ListItemIcon> */}
                                        {/* <img className={classes.mobileIcon} src={ label?.imageGrupo} /> */}
                                        <ListItemText className={classes.listItemTextTitle} primary={label?.grupoFormulario} />
                                        {open[index] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                                label.form.map((forms, index) => (
                                                    <ListItem button to={forms?.ruta} component={Link} key={index} className={classes.nested}>
                                                        <ListItemIcon><Icon>{forms?.iconoFormulario}</Icon></ListItemIcon>
                                                        {/* <ListItemIcon>{forms?.iconoFormulario} </ListItemIcon> */}
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
                                        <ListItemIcon className={classes.ListItemIconTitle}><Icon>{label?.iconoGrupo}</Icon></ListItemIcon>
                                        {/* <ListItemIcon className={classes.ListItemIconTitle}>{label?.iconoGrupo} </ListItemIcon> */}
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