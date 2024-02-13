import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerPrincipal:{
        width: '100%',
        // height: '100%',
        textAlign: 'center',
        // background: "linear-gradient(0deg, #1d5079 20%, #205690 62%)",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '48px 0px 15px 0px',
        // padding: '50px 15px 15px 15px',
    },
    containerTable: {
        margin: '20px 0px 0px 0px',
    }
}));