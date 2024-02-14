import React from 'react';
import { useStyles } from "./style";
import {Grid, Typography, Paper} from '@material-ui/core/';

let newData = []
function ListItemPersonalized(props) {
    const classes = useStyles();
    newData = props.data;
    
    return (
        <Grid container wrap="wrap" className={classes.colorComponente}>
            {
                newData.map((label, index) => (
                    <Grid item xs={12} className={classes.grid} wrap="wrap">
                        <Paper className={classes.paper} elevation={2}>
                            <Grid className={classes.gridItem} item xs={12} sm container direction="row" justifyContent="flex-start" alignItems="center">
                                <div className={classes.icon}>
                                    {props.icon}
                                </div>
                                <Typography variant="subtitle1" className={classes.TypographyTitle}>
                                    {label.title}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.TypographyBody}>
                                    {label.description}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>                                                
                ))
            }
        </Grid>
    );
}
export default ListItemPersonalized;