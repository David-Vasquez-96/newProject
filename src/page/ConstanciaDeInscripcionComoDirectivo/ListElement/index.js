import React, { useState, useEffect } from 'react';
import {ListItem, List, Divider, ListItemText, ListItemAvatar, Typography, Box, Avatar} from '@material-ui/core/';
import {useStyles} from './style';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import {currency} from 'constant/index';
import DetailInformation from './DetailInformation';
import Icon from '@material-ui/core/Icon';

const ListElement=(props)=> {
    const classes = useStyles(props);    
    const [data, setData] = React.useState(props.data);
    const [totalToPay,setTotalToPay]=React.useState(0);
    const [discountAmount,setDiscountAmount]=React.useState(0);
    const [interesPayment,setInteresPayment]=React.useState(0);
    const [regulatedAmount,setRegulatedAmount]=React.useState(0);
  
    useEffect(() => {  
        setData(props.data);
        updateTotals();
    });
  
    const updateTotals=()=>{
        let   totalToPay=0,
            discountAmount=0,
            interesPayment=0,
            regulatedAmount=0;
        var dataCloned = Object. assign([], data); 

        for(var index=0; index<dataCloned.length;index++){
            totalToPay+=dataCloned[index].totalToPay;
            discountAmount+=dataCloned[index].discountAmount;
            interesPayment+=dataCloned[index].interesPayment;
            regulatedAmount+=dataCloned[index].regulatedAmount;
        }
        setTotalToPay(totalToPay.toFixed(2));
        setDiscountAmount(discountAmount.toFixed(2));
        setInteresPayment(interesPayment.toFixed(2));
        setRegulatedAmount(regulatedAmount.toFixed(2));
    }
 
    return (
        <div>
        <List className={classes.root}>

            {(data!=null) ?data.map((row,index) => (
                <div key={index}>
                <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>{index+1}</Avatar>
                    </ListItemAvatar>
                    
                    <ListItemText
                        primary={"Institución: "+row.company}
                        secondary={
                            <React.Fragment>
                               <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                    {"Referencia: "+row.id}
                                </Typography>
                                <br></br>
                                <Typography component="span" variant="body2" gutterBottom>{"Banco y cuenta: ".concat(row.bankAndAccount)}</Typography>
                                <br></br>
                                <Typography component="span" variant="body2" gutterBottom>{"Documento: "+row.document}</Typography>
                                <br></br>
                                <Typography component="span" variant="body2" gutterBottom>{"Fecha de pago: "+new Intl.DateTimeFormat('es-ES').format(new Date(row.entryDate))}</Typography>
                                <br></br>
                                <Typography component="span" variant="body2" gutterBottom>{"Total a pagar: "+currency.GTQ.format(row.totalToPay)}</Typography>
                                <br></br>
                                <Typography component="span" variant="body2" gutterBottom>
                                    {"Estado: "}
                                    {(row.isActive===true) ?
                                        (row.isProcess==true) ? 
                                        (<div><Icon style={{ color: '#E0991F' }}>timer</Icon> En proceso de validación</div>) : 
                                        (<div><Icon style={{ color: '#57C48F' }}>star</Icon> Pago aceptado</div>) 
                                        : (<div><Icon style={{ color: 'red' }}>block</Icon> Proceso cancelado</div>) 
                                    }
                                </Typography>
                                <br></br>
                                <Typography component="span" variant="body2" gutterBottom>{"Nota: " + (row.note=== undefined ? "" : row.note) }</Typography>
                                <br></br>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <DetailInformation key={index} data={row.invoiceList}/>
                </div>
              )):""}
            
        </List>
          
        <br/>
        <Divider/>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(ListElement);