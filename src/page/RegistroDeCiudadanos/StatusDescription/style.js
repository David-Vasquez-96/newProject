import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  /*     root: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        marginBottom: '150px',
    },
    titleTag: {
        marginBottom: '0px',
        marginTop: '0px'
    },
    itemsContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    */
  itemDescription: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    // marginLeft: "25px",
  },
  itemDescriptionText: {
    paddingLeft: "5px",
    marginTop: "0.2%",
    marginBottom: "0.2%",
    paddingRight: "1em",

  },
  root: {
    flexGrow: 1,
    paddingBottom: "10px",
    marginLeft: "2%",
    // paddingBottom: "100px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper2: {},
}));
