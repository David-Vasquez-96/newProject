import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerPrincipal:{
        width: "100%",
        // height: '100%',
        margin: '37px 0px',
        overflow: "auto",
        backgroundColor: '#EDEDED',
    },
    containerSecondary:{
        backgroundColor: 'white',
        borderRadius: '20px',
        paddingTop: '20px',
        paddingBottom: '10px',
        borderTop: '10px solid #1E5280;',
        flexGrow: 1,
    },
    typography:{
        textAlign: 'center',
        // fontWeight: 'bold',
        margin: '10px 0px 20px 0px',
        '@media (max-width:2560px)':{ //web
            fontSize:'1.1rem',
        },
       '@media (max-width:320px)':{ //mobile
            fontSize:'1rem',
        } 
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',
    },
    contentTitle: {
        margin: '0px 10px',
        fontWeight: 'bold',
    },
    form:{
        textAlign: 'center',
        margin: '15px 0px',
    },
}))