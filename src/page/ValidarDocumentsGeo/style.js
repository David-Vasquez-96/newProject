import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
 
    containerPDF:{
        display: 'inherit',
        textAlign: 'center',
        // height: 'inherit',
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ffffff',
       '@media (max-width:2560px)':{ //web
            fontSize:'2rem',
        },
       '@media (max-width:1440px)':{ //web
            fontSize:'2rem',
        },
       '@media (max-width:1024px)':{ //web
            fontSize:'1.8rem',
        },
       '@media (max-width:768px)':{ //mobile
            fontSize:'1.7rem',
        },
       '@media (max-width:426px)':{ //mobile
            fontSize:'1.5rem',
        },
       '@media (max-width:320px)':{ //mobile
            fontSize:'1rem',
        }
    },  

    container: {
        marginTop: 15,
       '@media (max-width:2560px)':{ //web
            maxWidth: '60%',
        },
       '@media (max-width:1440px)':{ //web
            maxWidth: '65%',
        },
       '@media (max-width:1024px)':{ //web
            maxWidth: '80%',
        },
       '@media (max-width:768px)':{ //mobile
            maxWidth: '100%',
        },
    },

    colorComponente:{
        backgroundColor: 'white',
        alignItems: "center",
        borderRadius: 20,
        flexFlow: "row-wrap",
        // maxWidth: '50%',
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
        color: 'black',
    },

    colorChip:{
        backgroundColor: '#1C4E78',
        color:'white'
    },      
    lineaDegradadaBottom:{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 3,
        background: `rgb(2,0,36)`,
        background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
    },    
}))