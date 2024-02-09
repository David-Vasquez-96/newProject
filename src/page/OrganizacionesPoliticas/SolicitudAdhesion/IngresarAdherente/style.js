import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    inputContainer: {
        marginLeft: '37px',
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center'
    },

    buttonSheet: {
        color: '#FFF',
        backgroundColor: "#008AFA"
    },

    actionContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'center'
    },

    iconButtonContainer: {
        marginLeft: '10px',
        marginRight: '10px'
    },

    iconStyles: {
        backgroundColor: '#FFF',
        '&:hover': {
            backgroundColor: '#e8e8e8'
        }
    }
}));