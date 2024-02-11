import React, { useState } from 'react';
import {useStyles} from './style';
import { Description } from '@material-ui/icons';
import { Card, Typography } from '@material-ui/core';

const ComponentCircle=(props)=> {
    const classes = useStyles(props)();

    return (
        <div className={classes.listDocumentsSecondary}>                            
            <Card className={classes.cardPrincipal} elevation={14}>
                <img className={classes.mobileIcon} src={props.label?.icon} />
            </Card>
            <div className={classes.containerTitle}>                                
                <Typography className={classes.cardTitle}>{props.label?.title}</Typography>
            </div>
        </div>
    )
}
export default (ComponentCircle);