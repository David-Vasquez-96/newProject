import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader} from '@material-ui/core';
import { Description, ExitToApp, People } from '@material-ui/icons';

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
    const [menuList] = useState([
        {title: 'Categorias', icon: <Description />, to: '/'},
        {title: 'Usuarios', icon: <People />, to: '/'},
        {title: 'Documentos', icon: <Description />, to: '/'},
    ])
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
                        <ListItem button>
                            <ListItemIcon>{label.icon} </ListItemIcon>
                            <ListItemText primary={label.title} />
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