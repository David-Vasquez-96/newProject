import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    root:{
        //display: 'none',
        "@media print":{
            display: 'initial',   
        },
        marginTop:'1%',
        marginLeft:'2%',
        marginRight:'2%'
    },
    table: {
        minWidth: 650,
    },
});