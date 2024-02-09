import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    AppBar : {
        background: '#fafafa',
        color:'#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',          
    },    
    titleForm:{
       '@media (max-width:1440px)':{ //web
            fontSize:'1.3rem',
        },
       '@media (max-width:426px)':{ //mobile
            fontSize:'1rem',
        },
       '@media (max-width:415px)':{ //mobile
            fontSize:'1rem',
        },
       '@media (max-width:320px)':{ //mobile
            fontSize:'1rem',
        }        
    },
    signupContainer : {
        flexDirection:'column',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        // maxWidth: '2000px',
        textAlign: 'center',
        backgroundColor: '#ededed',
        backgroundSize: 'cover',
    //     backgroundImage: `url(/img/loginBack.svg)`,
    //    '@media (max-width:768px)':{ // ipad
    //         backgroundImage: `url(/img/ipadBack.svg)`,
    //     },
       '@media (max-width:430px)':{ // mobil
            width: 'fit-content',
        }
    },
    signupBox :{        
        height: 'auto',
        margin:  'auto',
        padding: '1% 0% 0% 0%',
        position: 'relative',
        textAlign: 'center',
        // background: 'black',
        // borderRadius: '28px 28px 28px 28px',
       '@media (max-width:2560px)':{ // web
            width: '80%',
            margin: '2% 2% 1% 2%',
        },
       '@media (max-width:1440px)':{ // web
            width: 'auto',
            margin: '2% 2% 1% 2%',
        },
       '@media (max-width:1024px)':{ // web
            width: 'auto',
            margin: '5% 2% 0% 2%',
        },
       '@media (max-width:768px)':{ // ipad
            width: 'auto',
            margin: '5% 2% 0% 2%',
        },
       '@media (max-width:460px)':{ // mobil
            margin: '5% 2% 0% 2%',
            // background: 'transparent',
            borderRadius: 'none',
            width: 'auto',            
        },
       '@media (max-width:320px)':{ // mobil
            margin: '5% 2% 0% 2%',
            // background: 'transparent',
            borderRadius: 'none',
            width: 'auto',            
        },
        // boxShadow:'0px 0px 6px 3px #1e88e5 inset',
        border: '1px solid  #cccccc', borderRadius: '20px'
        // background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
        
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
        borderRadius: '50%',                    
       '@media (max-width:768px)':{ // mobil      
            width: '25%',
        },
       '@media (max-width:460px)':{ // mobil                        
            width: '30%',
        },
    },  
}))