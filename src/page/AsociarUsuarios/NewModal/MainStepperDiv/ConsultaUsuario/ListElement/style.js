import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    colorComponente:{
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: 'white',
        display: "flex",
        flexFlow: "row-wrap",
        justifyContent: "center",
    },

    gridList: {
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 570,
    },     

    rootLista: {
        width: '100%',
        maxWidth: '100%',
    }, 

    colorIcon:{
        color: '#5d6dc7',
    },

    colorChip:{
        backgroundColor: '#3f51b5',
        color:'white'
    },
  }));
