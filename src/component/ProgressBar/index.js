import React from 'react';
import {useStyles, BorderLinearProgress} from './style';
 
export default function ProgressBar(props) {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <BorderLinearProgress   className={classes.margin}
                                    variant="determinate"
                                    color="secondary"
                                    value={props.value}/>
      </div>
    );
  }