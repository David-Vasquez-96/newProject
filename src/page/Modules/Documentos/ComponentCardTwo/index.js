import React from 'react';
import {useStyles} from './style';
import { Card, Typography } from '@material-ui/core';

const ComponentCard=(props)=> {
    const classes = useStyles(props)();
    return (
        <Card className={classes.containerCard} onClick={props?.handleClick}>
            <div className={classes.containerData}>
                <Typography className={classes.cardTotal}>{props?.total}</Typography>
                <img className={classes.mobileIcon} src={props?.image || 'data:image/png;base64,' } />  
            </div>
            <div className={classes.containerButtons}>
                <Typography className={classes.cardTitle}>{props?.title}</Typography>
            </div>
        </Card>
    )
}
export default (ComponentCard);