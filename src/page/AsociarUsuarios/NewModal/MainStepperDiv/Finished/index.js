import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Icon,
  Typography,
  Button,
} from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { useStyles } from "./style";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const Finished = (props) => {
  const classes = useStyles();

  const NewRequest = () => {
    props.clearFiles();
  };

  const close = () => {
    props.handleClose();
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Icon style={{ color: grey[900], fontSize: 80 }}>
          check_circle_outline
        </Icon>
        <Typography variant="h5" gutterBottom>
          ¡Usuario asociado correctamente!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Se han habilitado las funciones especificadas del Portal Web TSE para
          el usuario exitosamente!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={NewRequest}
          startIcon={<ListAlt />}
          size="medium"
        >
          Nueva Habilitación
        </Button>
        <Button
          className={classes.button}
          onClick={close}
          color="secondary"
          variant="contained"
        >
          <Icon className={classes.icon}> cancel </Icon>
          Cerrar
        </Button>
      </CardContent>
      <CardActions className={classes.InstitutionTitle}>
        <Typography variant="subtitle2">
          Tribunal Supremo Electoral, Guatemala
        </Typography>
      </CardActions>
    </Card>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Finished);
