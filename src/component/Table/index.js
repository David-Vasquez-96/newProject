import React from "react";
import MaterialTable from "material-table";
import { withStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import ButtonBack from "component/Table/Buttonback";
import ButtonAction from "component/Table/ButtonAction";
import ModalConfirmation from "component/ModalConfirmation";
import TableData from "./TableData";
import ActionList from "./ActionList";
import { styles } from "./Style";
import MenuDesplegable from 'component/MenuDesplegable'

function Table(props) {
  const { classes } = props;
  const [modalParams, setModalParams] = React.useState({
    open: false,
    handler: null,
    data: null,
  });
  const tableData = new TableData();
  const actionList = new ActionList(props, setModalParams);

  const closeModal = (option) => {
    setModalParams({ open: false });
    if (option) modalParams.handler(modalParams.data);
  };

  const getdata = async (query, header, service) => {
    tableData.setQuery(query);
    tableData.setHeader(header);
    tableData.setService(service);
    return tableData.getPromiseResponse();
  };

  let isMenuDesplegable = props.isMenuDesplegable
  let arrayMenuDesplegable = props.arrayMenuDesplegable

  if (props.data === []) return null;
  else
    return (
      <div className={classes.root}>
        <ModalConfirmation
          open={modalParams.open}
          data={modalParams.data}
          handler={modalParams.handler}
          closeModal={closeModal}
          message={modalParams.message}
        />
        <MaterialTable

          localization={{
            toolbar: { searchPlaceholder: "Buscar", searchTooltip: "Buscar " },
            pagination: {
              labelRowsSelect: "Registros",
              labelRowsPerPage: "Filas por pagina",
              labelDisplayedRows: "Registros {from} al {to} de {count}",
              previousTooltip: "Pagina anterior",
              nextTooltip: "Página siguiente",
              lastTooltip: "Última página",
              firstTooltip: "Primera página",
            },
            body: {
              deleteTooltip: "Eliminar",
              emptyDataSourceMessage: "No existen registros",
            },
            header: { actions: "Opciones" },
          }}
          title={
            props.title !== undefined ? props.title : "Listado de registros"
          }
          columns={props.header}
          data={
            props.service !== undefined
              ? (query) => getdata(query, props.header, props.service)
              : props.data
          }
          detailPanel={props.detailPanel !== undefined ? props.detailPanel : []}
          actions={actionList.getList()}
          onSelectionChange={(rows) => props.selectionChange(rows)}
          options={
            props.options !== undefined
              ? props.options
              : {
                debounceInterval: 1500,
                filtering: props.filter,
                pageSize: 5,
                pageSizeOptions: [5, 10, 20, 30, 50, 75, 100],
                toolbar: true,
                paging: true,
                actionsColumnIndex: -1,
              }
          }
          components={{
            Action: (props) => {
              if(isMenuDesplegable){
                return(                            
                    <MenuDesplegable arrayMenuDesplegable={arrayMenuDesplegable}/>
                )
            }else{                        
              if (props.action.position === "toolbar") {
                return (
                  <ButtonBack
                    disabled={props.action.disabled}
                    icon={props.action.icon}
                    tooltip={props.action.tooltip}
                    onClick={props.action.onClick}
                  ></ButtonBack>
                )
              } else {

                var element = props.action.action(props.data);
                return (
                  <ButtonAction
                    tooltip={element.tooltip}
                    onClick={element.onClick}
                    icon={element.icon}
                  />
                );
            }

              }
            },
            Pagination: (props) => (
              <TablePagination
                {...props}
                SelectProps={{
                  style: {
                    fontSize: 14,
                  },
                }}
              />
            ),
          }}
          className={classes.table}
        ></MaterialTable>
      </div >
    );
}

export default withStyles(styles)(Table);
