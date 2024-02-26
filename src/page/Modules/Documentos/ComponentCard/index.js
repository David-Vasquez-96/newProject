import React, { useState } from 'react';
import {useStyles} from './style';
import { Button, Card, IconButton, Typography } from '@material-ui/core';
import { DeleteForever, Edit, NoteAdd } from '@material-ui/icons';
import BotonElement from 'component/BotonTable'

const ComponentCard=(props)=> {
    const classes = useStyles(props)();
    return (
        <Card className={classes.containerCard} onClick={props.handleClick}>
            <div className={classes.containerData}>
                <Typography className={classes.cardTotal}>{props?.total}</Typography>
                {/* <img className={classes.mobileIcon} src={props?.image || 'data:image/png;base64,' } /> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffff" fill-opacity="1" d="M0,224L30,234.7C60,245,120,267,180,234.7C240,203,300,117,360,101.3C420,85,480,139,540,170.7C600,203,660,213,720,202.7C780,192,840,160,900,160C960,160,1020,192,1080,202.7C1140,213,1200,203,1260,170.7C1320,139,1380,85,1410,58.7L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>             */}
                {/* <img className={classes.backgroundImage} src={'assets/waveDocuments.svg'} /> */}
            </div>
            <Typography className={classes.cardTitle}>{props?.title}</Typography>
            <div className={classes.containerButtons}>
                <BotonElement icon={<NoteAdd />} style={classes.buttonSuccess} title="Agregar Subcarpeta" handleFunction={() => {}}/>
                <BotonElement icon={<Edit />} style={classes.editButton} title="Editar" handleFunction={props?.handleClickEdit}/>
                <BotonElement icon={<DeleteForever />} style={classes.deleteButton} title="Eliminar" handleFunction={props?.handleClickDelete}/>
                <img className={classes.mobileIcon} src={props?.image || 'data:image/png;base64,' } />  
            </div>
        </Card>
    )
}
export default (ComponentCard);