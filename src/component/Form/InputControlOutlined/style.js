import { makeStyles } from '@material-ui/core/styles';

export const useStyles = props => makeStyles({
    formControl:{
        margin:'1%',
        // width: props.minWidth || '350px',
        // ['@media (max-width: 2560px)']:{ //mobile   
        //     width: '350px',
        // },
        // ['@media (max-width: 390px)']:{ //mobile   
        //     margin:'3% 0%',
        //     width: '280px',
        // },           
    },

    inputAdornment:{
        color: "#5a5a5a"
    }
});