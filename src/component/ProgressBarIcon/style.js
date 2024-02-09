import {  makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles({
    root:{
        marginTop: '-15px',
    },
    icon: props => ({
        marginLeft: props.marginLeft, 
        fontSize: '3.5rem',
        width: 45,
        height:45,
        backgroundImage: `url(/svg/vehicles/hot-air-balloon-svgrepo-com.svg)`,
        backgroundSize: 'cover', 
        transition: 'all 0.3s ease'
    }),
    text: props => ({
        marginLeft: props.marginLeft+15,  
        transition: 'all 0.3s ease',
        marginTop:'-10px',
    }),
});
 
