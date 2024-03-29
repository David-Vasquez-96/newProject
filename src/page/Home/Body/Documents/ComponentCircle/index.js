import React from 'react';
import {useStyles} from './style';
import { Card, Typography } from '@material-ui/core';

const ComponentCircle=(props)=> {
    const classes = useStyles(props)();

    return (
        <div className={classes.listDocumentsSecondary}>                            
            <Card className={classes.cardPrincipal} elevation={14}>
                {
                    (props.image) ? (
                        <img className={classes.mobileIcon} src={ props.image || 'data:image/png;base64,'} />
                    ): ('')
                }
            </Card>
            <div className={classes.containerTitle}>                                
                <Typography className={classes.cardTitle}>{ props.title}</Typography>
            </div>
        </div>
    )
}
export default (ComponentCircle);