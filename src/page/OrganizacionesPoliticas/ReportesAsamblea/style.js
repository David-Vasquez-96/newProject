import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    colorComponente:{
        backgroundColor: 'white',
        alignItems: "center",
        borderRadius: 20,
        flexFlow: "row-wrap",
        ['@media (max-width:415px)']:{ //mobile
            marginBottom: 10,
        },
        ['@media (max-width:320px)']:{ //mobile
            marginBottom: 10,
        }                
    },

    lineaDegradadaBottom:{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
    },
    centerTitle: {
        textAlign: 'center',
        // marginTop: '10px',
        // marginBottom: '10px',
        backgroundColor:'gainsboro',
    },        
}))