import React, { useEffect } from 'react';
import ApiServices from 'service/ApiServices';
import {Button, Dialog, DialogActions,DialogContent, DialogTitle, Slide} from '@material-ui/core/';
import Table from 'component/Table' ;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Person(props) { 
    let refOfButtonClose = React.createRef();
    useEffect(() => {
        if (refOfButtonClose.current!==null)    refOfButtonClose.current.focus();
    },[]);

    return (
        <div>
            <Dialog
                maxWidth="xl"
                fullWidth={true}
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>props.closeModal(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
            <DialogContent>
                 <Table pageSize={10} 
                        header = {props.header} 
                        data={[]} 
                        customActions={props.customActions}
                        service={ApiServices[props.controller]}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" 
                        onClick={()=>props.closeModal(false)} 
                        color="secondary" ref={refOfButtonClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}