import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    colorComponente: {
        backgroundColor: "white",
        alignItems: "center",
        flexFlow: "row-wrap",
        border: "1px solid  #cccccc ",
        borderRadius: "20px",
        position: "relative",
        width: "100%",
        overflow: "auto",
        paddingLeft: "0px",
        paddingRight: "0px",
    },
    marginText: {
        paddingLeft: "10px",
        display: "contents",
    },
    lineaDegradadaBottom: {
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
    }
}));