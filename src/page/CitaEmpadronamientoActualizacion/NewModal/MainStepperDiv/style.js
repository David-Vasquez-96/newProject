import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    AppBar : {
        background: '#fafafa',
        color:'#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',          
    },    
    signupContainer : {
        width: '100%',
        height: '100%',
        maxWidth: '2000px',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(/img/loginBack.svg)`,
        '@media (max-width:768px)':{ // ipad
            backgroundImage: `url(/img/ipadBack.svg)`,
        },
        '@media (max-width:460px)':{ // mobil
            marginTop: '-1%',
            backgroundImage: `url(/img/movil.svg)`,
        }
    },
    signupBox :{        
        height: 'auto',
        margin:  'auto',
        padding: '1% 1% 1% 1%',
        position: 'relative',
        textAlign: 'center',
        background: '#ffffff',
        width: "100%",
        '@media (max-width:768px)':{ // ipad
            width: '47%',
            marginTop: '14%',

        },
        '@media (max-width:460px)':{ // mobil
            marginTop: '0%',            
            background: 'transparent',
            borderRadius: 'none',
            boxShadow: 'none',            
            padding: '3% 9% 1% 9%',
            width: 'auto',            
        },
    },
    marginIcon: {
        // paddingTop: 5,
    },
    title : {
        position: 'relative',
        margin: 'auto',
        color: `black`,
        fontWeight: '550',
        fontSize: '2rem',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '1% 0%',
        '@media (max-width:1024px)':{ // web
            fontSize: '2.5rem',
        },
        '@media (max-width:768px)':{ // ipad
            fontSize: '3rem',
            padding: '3% 2%',
        },
        '@media (max-width:460px)':{ // ipad
            fontSize: '1.7rem',
            padding: '0% 7%',            
            marginTop: '0%',
        },
    },
    titleLeft : {          
        color: `rgb(118, 123, 121)`,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: '0%',
        marginBottom: '-6%',        
        '@media (max-width:460px)':{ // mobile  
            fontSize: '1.5rem',
            marginBottom: '-2%',  
        },
    },
    img:{
        '@media (min-width:769px)':{ // mobil                        
            display: 'none'
        }, 
        '@media (max-width:768px)':{ // mobil      
            background: '#e9d400',             
            borderRadius: '50%',
            margin: 'auto',                         
            width: '25%',
        },
        '@media (max-width:460px)':{ // mobil                        
            width: '30%',
        },
    },
}))