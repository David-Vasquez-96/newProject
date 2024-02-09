import React, { useState } from 'react';
import {useStyles} from './style';
import {Button, Typography, Box} from '@material-ui/core/';
import {currency} from 'constant/index';

const DetailInformation=(props)=> {
    const classes = useStyles(props);    
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <Box textAlign="center">
                <Button className={!open ? classes.show : classes.hide} variant="outlined" color="primary" onClick={()=> setOpen(true) }>
                    Facturas
                </Button>
            </Box>
            <div className={open ? classes.show : classes.hide}>
                <Box textAlign="center" fontWeight="fontWeightBold" fontSize={24}>Facturas del pago</Box>
                <br></br>
                {props.data.map((row,index) => (
                    <div key={index}>
                        <Typography component="div">
                              
                            <Box textAlign="center" fontWeight="fontWeightBold" fontSize={16}>
                                Factura: {row.document}
                            </Box>
                            <Box textAlign="left">
                                Mes de pago: {new Date(row.entryDate).getMonth()+1}
                            </Box>
                            <Box textAlign="left">
                                Número de contador: {row.wa[0].wattmeter}
                            </Box>
                            <Box textAlign="left">
                                Monto del mes: {currency.GTQ.format(row.charges)}
                            </Box>
                            <Box textAlign="left">
                                Monto de mora: {currency.GTQ.format(row.latePayment)}
                            </Box>
                            <Box textAlign="left">
                                Monto de reconexión: {currency.GTQ.format(row.reconectionPayment)}
                            </Box>
                            <Box textAlign="left">
                                Monto de infracciones: {currency.GTQ.format(row.violationPayment)}
                            </Box>
                            <Box textAlign="left" >
                                Total a pagar: {currency.GTQ.format(row.totalToPay)}
                            </Box>
                            
                        </Typography>
                        <br></br>
                    </div>
                ))}
                <Box textAlign="center">
                    <Button variant="outlined" color="primary" onClick={()=> setOpen(false) }>
                        Ocultar
                    </Button>
                </Box>
            </div>    
        </div>
    )
}

export default DetailInformation;