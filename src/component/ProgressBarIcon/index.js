import React from 'react';
import {useStyles} from './style';
import { Icon,  Typography } from '@material-ui/core/';

export default function ProgressBar(props) {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <Icon className={classes.icon} ></Icon>                    
            <Typography variant="subtitle1" gutterBottom className={classes.text}>
                {props.marginLeftPercent+"%"}
            </Typography>
      </div>
    );
  }