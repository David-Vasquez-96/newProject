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
    contendorDelListado: {
        margin: '20px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }, 
    cardComponent: {
        width: '260px',
        display: 'flex',
        ['@media (max-width: 576px)']:{ //mobile 
            width: '100%',
            display: 'block',
        },          
        // '&:hover': {
        //     transform: 'scale(1.20)',
        // }        
    }       
}));