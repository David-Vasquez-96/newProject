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
            </div>
            <Typography className={classes.cardTitle}>{props?.title}</Typography>
            <div className={classes.containerButtons}>
                <BotonElement icon={<NoteAdd />} style={classes.buttonSuccess} title="Agregar Archivos" handleFunction={props?.handleClickGoToSubDocument}/>
                <BotonElement icon={<Edit />} style={classes.editButton} title="Editar" handleFunction={props?.handleClickEdit}/>
                <BotonElement icon={<DeleteForever />} style={classes.deleteButton} title="Eliminar" handleFunction={props?.handleClickDelete}/>
                <img className={classes.mobileIcon} src={props?.image } />  
            </div>
        </Card>
    )
}
export default (ComponentCard);