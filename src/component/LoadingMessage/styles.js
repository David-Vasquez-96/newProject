import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    dialog: {
        borderRadius: '10px'
    },
    colorComponente:{
        backgroundColor: 'white',
        alignItems: "center",
        flexFlow: "row-wrap",
        position: "relative",
        width: "100%",
        overflow: "auto",
    },    
    rootContainer:{  
        textAlign: 'center',
    },    
    title:{
        textAlign:"center",
        fontSize:20,
        fontFamily:`Helvetica,sans-serif`,
        paddingTop:20,
        marginBottom: 20,
        fontWeight: 'bold',
    
    },
    lineaDegradadaBottom:{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
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
	imageEnviado: {
		width: '30%',
		height: '100%',
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
	imgEnviado: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},    
}));