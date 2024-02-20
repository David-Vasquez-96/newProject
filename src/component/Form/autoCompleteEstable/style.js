import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({    
    grid:{
        // display: 'inline-grid',
        // marginTop:'1%',
        // marginBottom:'1%',
        // paddingRight: '16px',
        // ["@media (max-width: 748px)"]: {
        //     width: 350,
        //     marginTop:'2%',
        //     marginBottom:'2%',
        // },        
        // ["@media (max-width: 460px)"]: {
        //     width: 350,
        //     marginTop:'2%',
        //     marginBottom:'2%',
        //     padding: '0px',
        // },      
    },    
    textField:{
        // margin:'1%',
        // marginRight: theme.spacing(2),
        // // paddingRight:15,
        // marginTop: 0,
        // minWidth: 275,
    },   

    icon: {
        // paddingBottom: '10px',
    } ,
    textSuccess:{
        color: 'black'
    },
    textError:{
        color: 'red'
    },     
}));
