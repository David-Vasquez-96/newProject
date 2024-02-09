import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    rootLista: {
        width: '100%',
        maxWidth: '100%',
    },

    rootListItem: {
        padding: '0px 0px 4px 100px'
    },
    rootListItemText:{
        flex: 'initial',
        color: 'black',
        // width: '350px',
        textAlign: 'right',
        paddingRight: '10px',
        '&>.MuiTypography-root':{
            fontWeight:'bold',
        }
    },
    colorIcon:{
        // color: 'black',
        textAlign: 'center',
        display: 'initial',
    },

    colorChip:{
        backgroundColor: '#1C4E78',
        color:'white'
    },
    centerTitle: {
        textAlign: 'center',
        marginBottom: '10px'
    },    
}))