import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    formControl:{
        minWidth: 350,
        margin:'1% 0%',
        paddingRight: '16px',
        ["@media (max-width: 1097px)"]: {
            marginTop:'1%',
        },        
        ["@media (max-width: 1024px)"]: {
            marginTop:'2%',
        },        
        ["@media (max-width: 748px)"]: {
            marginTop:'2%',
            marginBottom:'1%',
        },           
        ["@media (max-width: 460px)"]: {
            marginTop:'2%',
            marginBottom:'2%',
            padding: '0px',
        },         
    },
  }));
