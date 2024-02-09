import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '1%',
    },
    card : {
        borderTop:'5px solid #20568E',
        borderRadius: '25px',
    },
    icon: {
        color: '#1D517D', 
        fontSize: 100
    },
    title: {
        fontWeight: 'bold',
        fontSize: '2rem',
        textAlign: 'center',
       '@media (max-width:1440px)':{ // web
            fontSize: '1.6rem',
        },
        '@media (max-width:1024px)':{ // web
            fontSize: '1.6rem',
        },
       '@media (max-width:768px)':{ // ipad
            fontSize: '1.6rem',
        },
       '@media (max-width:460px)':{ // mobil         
            fontSize: '1.6rem',
        },
       '@media (max-width:320px)':{ // mobil         
            fontSize: '1.6rem',
        },        
    },
    content: {
        textAlign: 'justify',
        margin: '10px 0px',
        '@media (max-width:2560px)':{ // web
            fontSize: '1.1rem',
        },
        '@media (max-width:1440px)':{ // web
            fontSize: '1.1rem',
        },
        '@media (max-width:1024px)':{ // web
            fontSize: '1.1rem',
        },
       '@media (max-width:768px)':{ // ipad
            fontSize: '1.1rem',
        },
       '@media (max-width:460px)':{ // mobil         
            fontSize: '1.1rem',
        },
       '@media (max-width:320px)':{ // mobil         
            fontSize: '1.1rem',
        },    
    },
    subtitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '30px',	
       '@media (max-width:2560px)':{ // web
            fontSize: '1.1rem',
        },
       '@media (max-width:1440px)':{ // web
            fontSize: '1.1rem',
        },
        '@media (max-width:1024px)':{ // web
            fontSize: '1.5rem',
        },
       '@media (max-width:768px)':{ // ipad
            fontSize: '1.1rem',
        },
       '@media (max-width:460px)':{ // mobil         
            fontSize: '1.1rem',
        },
       '@media (max-width:320px)':{ // mobil         
            fontSize: '1.1rem',
        }, 
    },
    InstitutionTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    buttonMargin: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },        
    },    
}));