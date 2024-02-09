import React from 'react';
import {useStyles} from './style';
import {ListItem, Container, Grid, List, Chip, ListItemText, Divider} from '@material-ui/core';
//REDUX
import { connect } from 'react-redux';
import mapStateToProps from './mapStateToProps';

const ListElement = (props) => {
    
    const classes = useStyles();
    //console.log("props.data en ListElement:", props.data);

    return (
        <div>      
            <Container>          
                <Grid className={classes.colorComponente}>
                    <Grid item xs={12}>
                        <div className={classes.gridList} > 
                            <List className={classes.rootLista} dense>
                                <ListItem>                            
                                    <ListItemText className={classes.colorIcon} primary="CUI del DPI: " />
                                    <Chip className={classes.colorChip} label={props.dataUsuarioPorAsociar.cui} />                             
                                </ListItem>
                                <ListItem>
                                    <ListItemText className={classes.colorIcon} primary="Nombres: " />
                                    <Chip className={classes.colorChip} label={props.dataUsuarioPorAsociar.name} />   
                                </ListItem>
                                <ListItem>
                                <ListItemText className={classes.colorIcon} primary="Email" />
                                    <Chip className={classes.colorChip} label={props.dataUsuarioPorAsociar.email} />
                                </ListItem> 
                               {/*  <ListItem>
                                    <ListItemText className={classes.colorIcon} primary="Afiliación: " />
                                    <Chip className={classes.colorChip} label={props.data.afiliacion} /> 
                                </ListItem>
                                <ListItem>
                                    <ListItemText className={classes.colorIcon} primary="Partido: " />
                                    <Chip className={classes.colorChip} label={props.data.partido} />             
                                </ListItem> */}
                            </List>
                        </div>
                    </Grid>
                </Grid>                
            </Container>           
            <Divider variant="middle"/>       
        </div>
    );
}

export default connect(mapStateToProps) (ListElement)