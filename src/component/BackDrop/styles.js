import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    backdrop: {
        backgroundColor: "#082a4063",
        zIndex: theme.zIndex.drawer + 1,
        color: '#092f5e',
    },
    colorComponente:{
        backgroundColor: 'white',
        alignItems: "center",
        flexFlow: "row-wrap",
        border: '1px solid  #cccccc ',
        borderRadius: '20px',                
        position: "relative",
        width: "100%",
        overflow: "auto",
        padding: '10px 0px 0px 0px',
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
}));