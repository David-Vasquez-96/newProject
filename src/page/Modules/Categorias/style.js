import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerPrincipal:{
        textAlign: 'center',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',

        margin: '48px 0px 15px 0px',
        position: "relative",
        width: "100%",
        overflow: "auto",
        paddingLeft:0,
        paddingRight:0,
        backgroundColor: '#EDEDED',
    },
    containerTable: {
        margin: '20px 0px',
    }
}));