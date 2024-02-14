import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    colorComponente:{
        backgroundColor: 'white',
        color: 'black',
        alignItems: "center",
        flexFlow: "row-wrap",
        borderRadius: '20px',                
        position: "relative",
        width: "100%",
        overflow: "auto",
		margin: '20px 30px 0px 30px',
        padding: '0px'
    },
    paper: {
        padding: '0px',
        margin: 'auto',
        border: '1px solic #205690',
        // boxShadow: '3px 3px #205690',
        display: 'flex',
        height: '100%',
        width: '100%',
    },
    grid: {
        padding: '2px 10px',
    },
    gridItem: {
        padding: '0px',
        display: 'flex',
        flexDirection: 'row',
    },
    icon: {
        padding: '0px 10px',
    },
    TypographyTitle: {
        padding: '0px 10px',
        fontWeight: 'bold',
        fontSize: '0.875rem',
    },
    TypographyBody: {
        padding: '0px 10px',
        textAlign: 'left',
        fontSize: '0.875rem',
    },  
}))