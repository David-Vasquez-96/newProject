import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        textAlign: "center",
    },

    dialogContent:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    titleLeft : {
        // fontFamily: 'nano',
        color: 'black',
        fontWeight: '500',
        marginTop: '0%',
        marginBottom: '3%',
        textAlign: 'center',
    },
    imagen: {
        width: '50%',
        height: '40%',
    },
    img:{       
        display: 'flex',
        borderRadius: '50%',
        margin: 'auto',        
        marginTop: '20px',
        width: '60%',
        '@media (max-width: 2560px)' :{  //web
            width: '60%',
        },
        '@media (max-width: 2000px)' :{  //web
            width: '60%',
        },
        '@media (max-width:1700px)':{ // web
            width: '70%',
        },        
        '@media (max-width:1500px)':{ // web
            width: '75%',
        },        
        '@media (max-width:1200px)':{ // web
            width: '75%',
        },
        '@media (max-width:1024px)':{ // web
            width: '75%',
        },
        '@media (max-width:1000px)':{ // web
            width: '80%',
        },
        '@media (max-width:768px)':{ // web
            width: '80%',
        },
        '@media (max-width:700px)':{ // web
            width: '80%',
        },
        '@media (max-width:600px)':{ // web
            width: '80%',
        },
        "@media (max-width: 500px)":{
            width: '80%',
        },
        "@media (max-width: 400px)":{
            width: '80%',
        }        
    }    
}))

