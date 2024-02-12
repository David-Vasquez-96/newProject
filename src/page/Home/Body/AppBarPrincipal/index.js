import React, {useState} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import UserAccount from 'page/Security/Login/FormElements/UserAccount';
import { useHistory } from "react-router-dom";
import { AppBar, Button, Icon, IconButton, ListItemIcon, MenuItem, MenuList, Popover, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, ArrowBack, AssignmentInd, Menu, Input } from '@material-ui/icons';
import {useStyles} from './style';
import { publicMenu } from 'constant/index';


const AppBarComponent=(props)=> {
    const classes = useStyles(props);
    var authenticated = props.authenticated;
    let history = useHistory();

    //menu desplegable
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const openMenu = Boolean(anchorEl);
    const id = openMenu ? 'simple-popover' : undefined;    
    const onLogout = () => {
        let userAccount = new UserAccount();
        userAccount.logout();
        props.LOGOUT();
        props.SET_MENU(publicMenu);
        handleCloseMenu()
        history.push("/login", {})
    }
    return (
        <div className={classes.root}>            
            {
                props.authenticated ? (
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar className={classes.toolbar} variant="dense">
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"> <Menu /></IconButton>
                            <Typography variant="h6" className={classes.appTitle}>New Project</Typography>
                                 <div>                
                                     {/* <Button className={classes.button} color="inherit"  to='/' component={Link}><span className={classes.title_text}>Menú Principal</span></Button>  */}
                                     <Button className={classes.button} color="inherit" aria-describedby={id} onClick={handleClickMenu}>
                                             <Icon className={classes.icon}><AccountCircle/></Icon>
                                     </Button>
                                        <Popover
                                            id={id}
                                            open={openMenu}
                                            anchorEl={anchorEl}
                                            onClose={handleCloseMenu}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <div className={classes.rootMenu}>
                                                <div className={classes.containerInformation}>
                                                    <Typography className={classes.typographyInformation}>{props.currentUser?.email}</Typography>
                                                    <AccountCircle style={{color:'#20568D', fontSize: 70}}/>
                                                    <Typography className={classes.typographyInformation}>¡Hola, {props.currentUser?.name}!</Typography>
                                                </div>
                                                <div className={classes.paper}>
                                                    <MenuList>
                                                        {/* <MenuItem onClick={FuncionIrAMiPerfil} className={classes.menuItem}> */}
                                                        <MenuItem>
                                                            <ListItemIcon> <AssignmentInd fontSize="medium" style={{color:'#20568D'}}/></ListItemIcon>
                                                            <Typography variant="inherit">Ver mi Perfil</Typography>
                                                        </MenuItem>
                                                        <MenuItem onClick={onLogout}>
                                                            <ListItemIcon> <Input fontSize="medium" style={{color:'#20568D'}}/></ListItemIcon>
                                                            <Typography variant="inherit">Cerrar Sesión</Typography>
                                                        </MenuItem>
                                                    </MenuList>
                                                </div>
                                            </div>
                                        </Popover>
                                 </div>
                        </Toolbar>
                  </AppBar>
                ):''
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(AppBarComponent);