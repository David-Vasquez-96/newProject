import React from 'react';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import ButtonBack from 'component/Table/Buttonback';
import ButtonAction from 'component/Table/ButtonAction';
import ModalConfirmation from 'component/ModalConfirmation';
import TableData from './TableData';
import ActionList from './ActionList';
import {styles} from './Style';
import './styles.css'
import Searcher from './searcher';
import MenuDesplegable from 'component/MenuDesplegable'
// import { useSelector, useDispatch } from 'react-redux'
// import allActions from 'store/actions';
import { AppBar, Button, Typography, Toolbar } from '@material-ui/core';
import { Autorenew } from '@material-ui/icons';

function Table(props) {
    // const dispatch = useDispatch();
    // const currentUser = useSelector(state => state.security.currentUser)
    const { classes } = props;
    const [modalParams, setModalParams] = React.useState({'open':false,'handler':null,'data':null});
    const tableData =  new TableData();
    const actionList = new ActionList(props,setModalParams);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const tableRef = React.createRef();

    const closeModal=(option)=>{
        setModalParams({'open':false});
        if (option) modalParams.handler(modalParams.data);
    }

    const getdata= async (query,header,service)=>{
        tableData.setQuery(query);
        tableData.setHeader(header);
        tableData.setService(service);        
        var prueba = await tableData.getPromiseResponse()
        return prueba
    }

    const searchForAction = async (elements) => {
        const {query} = tableRef.current.state
        query.filters = [];
        query.filters = elements;
        return await tableRef.current.onQueryChange();
    }

    const cleanSearchFilter = async () => {
        const {query} = tableRef.current.state
        query.filters = [];
        return await tableRef.current.onQueryChange()
    }
    let isMenuDesplegable = props.isMenuDesplegable
    let arrayMenuDesplegable = props.arrayMenuDesplegable


if (props.data===[]) return(null)
  else return (
    <div className={classes.root}>
        <div className={classes.container}>
        <ModalConfirmation open={modalParams.open} data={modalParams.data} handler={modalParams.handler} closeModal={closeModal} message={modalParams.message}/>
        {props.showSearcher && (
            <Searcher searchList={props.searchList || props.header} searchForAction={searchForAction} cleanSearchFilter={cleanSearchFilter}/>
        )}
        {
            (props.showToolbarPerzonalized) && (                
                <AppBar position="static" className={classes.appBar} elevation={0}>
                    <Toolbar variant="dense">
                        <Typography className={classes.title} variant="subtitle1" gutterBottom>{props.showToolbarTitle}</Typography>
                        {
                            (props.ActualizarTabla)&& (
                                <Button className={classes.buttonUpdate} onClick={props.ActualizarTabla} startIcon={<Autorenew />} >Actualizar</Button>
                            )
                        }
                        {                            
                            (props.arrayMenuDesplegable) &&(           
                                <MenuDesplegable arrayMenuDesplegable={props.arrayMenuDesplegable} showButtonSimple={true}/>                     
                            )
                        }
                    </Toolbar>
                </AppBar>        
            )
        }
        <MaterialTable
            localization={{
                toolbar: {searchPlaceholder: "Buscar",searchTooltip: "Buscar "},
                pagination:{labelRowsSelect:"Registros",labelRowsPerPage:"Filas por pagina",
                            labelDisplayedRows: 'Registros {from} al {to} de {count}',
                            previousTooltip:'Pagina anterior', nextTooltip:'Página siguiente', lastTooltip:'Última página', firstTooltip:'Primera página'},
                body: {deleteTooltip: "Eliminar",emptyDataSourceMessage: "No existen registros"},
                header:{ actions: 'Opciones'}
                
            }}

            title={props.title!==undefined ? props.title: "Listado de registros"}
            columns={props.header}
            data = {(props.service!== undefined) ? query=>getdata(query,props.header, props.service) : props.data}
            detailPanel={ (props.detailPanel!==undefined) ?  props.detailPanel : []}
            actions={actionList.getList(props.nameToolTipAdd, props.nameToolTipReportNewRequests, props.customTitleButtonTable, props.buttonList)}
            // actions={<MenuDesplegable />}
            tableRef={tableRef}
            // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
                debounceInterval: 1500,
                pageSize: 5,
                pageSizeOptions: [5, 10, 20, 30 ,50, 75, 100],
                toolbar: (props.showToolbar === undefined) ? true : props.showToolbar,
                paging: true,
                actionsColumnIndex: -1,
                filtering: (props.showFilter === true || props.showFilter === false) ? props.showFilter:true,
                search: props.showFilterGeneral,
                selection: props.selection,
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                },
                rowStyle: rowData => ({
                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                })                
            }}
            onSelectionChange={(rows, item) => props.onSelectionChange(rows, item)}
            components={{                
                Action: props => {
                    if(isMenuDesplegable){
                        return(                            
                            <MenuDesplegable arrayMenuDesplegable={arrayMenuDesplegable}/>
                            // <SpeedDialMenuButtonDesplegable arrayMenuDesplegable={arrayMenuDesplegable}/>
                        )
                    }else{                        
                        if (props.action.position==="toolbar"){
                            return (
                                <ButtonBack     icon={props.action.icon} tooltip={props.action.tooltip}
                                                onClick={props.action.onClick}>
                                </ButtonBack>
                            )
                        }else{
                            var element= props.action.action(props.data);                        
                            return (
                                    <ButtonAction   tooltip={element.tooltip}
                                                    onClick={element.onClick}
                                                    icon={element.icon}/>)
                        }
                    }
                },
                Pagination: props => (
                <TablePagination
                    {...props}
                    SelectProps={{
                    style:{
                        fontSize: 14
                    }
                    }}
                />
                )
            }}
            className={classes.table}
        >
        </MaterialTable>
        </div>
    </div>
  )
}

Table.defaultProps = {
    showSearcher : false,
    selection: false,
    isGetData: true,
    onSelectionChange: () => {},
}

export default withStyles(styles)(Table);