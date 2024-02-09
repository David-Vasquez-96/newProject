import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        margin:'auto',
       '@media (max-width:2000px)':{ //web
            marginTop: '3%',
        },
       '@media (max-width:768px)':{ //ipad
            marginTop: '5%',
            width: '66%',
        },
       '@media (max-width:470px)':{ //mobile
            fontWeight: '500',
            marginTop: '12%',
            width: '90%'
        },
    },
    alert:{
        position: 'absolute',
        margin: 'auto',        
       '@media (max-width:470px)':{ //mobile
            display: 'flex',
            flexDirection: 'column',
            width: 'inherit',
        },
        '&>.MuiAlert-message':{
            padding: '0% 0% 0% 15%',
            fontSize: '1.3rem',
            textAlign: 'center',
           '@media (max-width:470px)':{ //mobile
                padding: '0% 0% 0% 0%',
                fontSize: '0.9rem',
            },
        },
        '&>.MuiAlert-icon':{
            fontSize: 45,
            marginLeft: 27,
           '@media (max-width:470px)':{ //mobile
                fontSize: '30px',
                marginLeft: 123,
            },
        },
    }
}));

