import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './style';

const LandscapeOrientation = () => (
    <style type="text/css">
      {"@media print{@page {size: landscape !important}}"}
    </style>
  );
  const PortraitOrientation = () => (
    <style type="text/css">
      {"@media print{@page {size: portrait !important}}"}
    </style>
  );
export default function TableReportSimple(props) {
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            {props.isLandscape ? <LandscapeOrientation/> : <PortraitOrientation/>}
            <Typography variant="subtitle1" component="h2">
                {props.subtitle}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {props.header.map((row)=>{
                                return (<TableCell key={Math.random()} align="center">{row.title}</TableCell>)
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.length>0 ? props.data.map((row) => (
                            <TableRow key={row.id}>
                                {props.header.map((header)=>{
                                    var parts= header.field.split(".");
                                    return (    <TableCell key={Math.random()} align="center">
                                                    {(parts.length===1) ? row[parts[0]] :
                                                    (parts.length===2) ? row[parts[0]][parts[1]] : 
                                                    (parts.length===3) ? row[parts[0]][parts[1]][parts[2]] : 
                                                    (parts.length===4) ? row[parts[0]][parts[1]][parts[2]][parts[3]] : 
                                                    (parts.length===5) ? row[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]] : 
                                                    ""}
                                                </TableCell>)
                                })}
                            </TableRow>
                        )): <TableRow></TableRow>}
                        {(props.summaryRow !==undefined) ? props.summaryRow : <TableRow></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    );
}