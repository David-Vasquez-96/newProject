import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    containerLogo: {
        padding: '20px 0px',
    },
    mobileIcon:{
        ['@media (max-width:2560px)']:{ //ipad
            width: '100%',
            height: '400px',
        },
        ['@media (max-width:959px)']:{ //ipad
            width: '100%',
            height: '150px',
        },        
    },    
}));
