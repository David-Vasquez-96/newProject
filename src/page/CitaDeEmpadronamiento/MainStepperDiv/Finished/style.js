import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        //border: '2px solid #000000'
    },
    button:{
        marginLeft: 15
    },
    InstitutionTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    icon: {
        marginRight: 7
    }
}));