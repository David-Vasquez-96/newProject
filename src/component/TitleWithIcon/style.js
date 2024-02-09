import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    root:{
        width: '100%',
        textAlign: 'center',
    },
    h1:{
        textAlign: 'center',
        color: 'black',
        fontFamily: 'roboto',
        margin: 0,
       '@media (max-width:2000px)':{ // web
            fontSize: '1.125rem',
        },
       '@media (max-width:1000px)':{ // web
            fontSize: '1rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '0.9rem',
        },
    },
	image: {
		width: 50,
		height: 50,
        margin: '3px',
       '@media (max-width:1000px)':{ // web
            width: 45,
            height: 45,
        },
       '@media (max-width:768px)':{ //ipad
            width: 40,
            height: 40,
        },        
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},    
    AppBar : {
        // paddingTop: '10px',
        backgroundColor: 'white',
        color:'#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',          
    },
    lineaDegradadaBottom:{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 2,
        background: 'linear-gradient(90deg, rgba(0,0,0,1) 11%, rgba(139,138,138,1) 72%)',
    },
}))