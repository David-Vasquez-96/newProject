import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    div: {
        width: '90%',
        margin: 'auto',
    },

    label:{
        marginTop: '25px'
    },

    area:{
        minHeight: '5em',
        width: '100%', 
        marginTop: '5px', 
        marginBottom: '20px', 
        fontFamily: 'roboto',
        marginBottom: '5px',
    },

    areaError:{
        minHeight: '5em',
        width: '100%', 
        marginTop: '5px', 
        marginBottom: '20px', 
        fontFamily: 'roboto',
        marginBottom: '5px',
        border: '2px solid red'
    }
}));
