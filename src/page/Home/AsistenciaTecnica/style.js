import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        '@media (max-width:1440px)':{ //web
            fontSize:'0.8rem',
            marginRight: 10,
        },
        '@media (max-width:449px)':{ //mobile
            fontSize:'0.6rem',
        }
                
    },

  }));