import React, { useState, useEffect } from "react";
import {
  ListItem,
  List,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
  //   Box,
  Avatar,
} from "@material-ui/core/";
import { useStyles } from "./style";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import { Icon, Button, Chip, IconButton } from "@material-ui/core/";
// import ApiServices from "service/ApiServices";
// import Alert from "react-s-alert";
// import { functions } from "constant/index";
import Pagination from "react-pagination-list";
import { Assignment, Check, Timer } from "@material-ui/icons";
// import DoneIcon from "@material-ui/icons/Done";

function ListElement(props) {
  const classes = useStyles(props);
  const [data, setData] = React.useState([]);
  const splitDate = (date) => {
    if (date !== null) {
      var arr1 = date.split("-");
      var arr2 = arr1[2].split("T");
      var finalDate = arr2[0] + "/" + arr1[1] + "/" + arr1[0];
      return finalDate;
    }
  };

  useEffect(() => {
    setData(props.dataSolicitudes);
  }, [props.dataSolicitudes]);

  return (
    <div>
      <List className={classes.root}>
        <div className="App">
          {data.length > 0 ? (
            <Pagination
              data={data}
              pageSize={3}
              renderItem={(rowData, key) => (
                <div key={key}>
                  <div className={classes.centrarChip}>
                    <Chip
                      label={"Solicitud # " + rowData.idSolicitud}
                      color="primary"
                      variant="outlined"
                    />
                  </div>
                  <ListItem alignItems="flex-start" key={key}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <Assignment />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {"Fecha de solicitud: "}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {splitDate(rowData.fechaCreacion)}
                          </Typography>
                          <br></br>
                          {rowData.fechaResolucion === null ||
                          rowData.fechaResolucion === "" ? (
                            <React.Fragment />
                          ) : (
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {"Fecha de resolución: "}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {splitDate(rowData.fechaResolucion)}
                              </Typography>
                              <br></br>
                            </React.Fragment>
                          )}
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {"Estado: "}
                          </Typography>

                          {rowData.status === 1 ? (
                            <Chip
                              icon={<Check style={{ color: "#008104" }} />}
                              label="Solicitud aceptada"
                              variant="outlined"
                            />
                          ) : rowData.status === 2 ? (
                            <Chip
                              icon={
                                <Icon style={{ color: "#FA0000" }}>close</Icon>
                              }
                              label="Solicitud rechazada"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              // icon={<Timer />}
                              icon={
                                <Icon style={{ color: "#57C48F" }}>timer</Icon>
                              }
                              label="Solicitud en proceso"
                              variant="outlined"
                            />
                          )}

                          {rowData.status === 2 ? (
                            <React.Fragment>
                              <br></br>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {"Motivo de Rechazo: "}
                              </Typography>
                              <IconButton
                                // className = {classes.rechazoIcon}
                                size="small"
                                color="primary"
                                onClick={() => {
                                  props.abrirObservacion();
                                  props.setObservacion(
                                    rowData.mensajeRechazo,
                                    "Motivo de Rechazo de la Solicitud"
                                  );
                                }}
                              >
                                <img
                                  alt="comments"
                                  className={classes.rechazoIcon}
                                  src="/assets/comments.svg"
                                />
                              </IconButton>
                            </React.Fragment>
                          ) : (
                            <React.Fragment />
                          )}
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {rowData.status === 1 ? (
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {"Constancia de Empadronamiento: "}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  endIcon={<Icon>get_app</Icon>}
                                  onClick={async () => {
                                    props.downloadConstanciaEmpadronamiento(
                                      rowData.cve
                                    );
                                  }}
                                >
                                  Descargar
                                </Button>
                              </React.Fragment>
                            ) : (
                              ""
                            )}
                          </Typography>
                          <br></br>
                          <div className={classes.lineaDegradadaBottom}></div>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              )}
            />
          ) : (
            <div className={classes.centrarMensaje}>
              {" "}
              <strong>No existen registros de solicitudes. </strong>{" "}
            </div>
          )}
        </div>
      </List>

      <br />
      <Divider />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ListElement);
