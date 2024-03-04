import React from 'react';
import {useStyles} from './style';

const Header=(props)=> {
    const classes = useStyles(props);
    return (
        <div className={classes.headerPrincipal}>
            <img className={classes.waveImage} alt="complex" src={"/assets/wave.svg"} />
            <img className={classes.img} alt="complex" src={"/assets/userComputer.png"} />
            <div className={classes.containerText}>                
                <h1 className={classes.h1} variant="h5" color="initial">{'Bienvenidos a Zona de Conocimiento'}</h1>
            </div>
        </div> 
    )
}
export default (Header);