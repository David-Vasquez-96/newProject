import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    containerLogo: {
        padding: '20px 0px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mobileIcon:{
        ['@media (max-width:2560px)']:{ //ipad
            width: '480px',
            height: '480px',
        },
        ['@media (max-width:460px)']:{ //ipad
            width: '100%',
            height: '450px',
        },        
        ['@media (max-width:320px)']:{ //ipad
            width: '100%',
            height: '320px',
        },        
    },    
}));
