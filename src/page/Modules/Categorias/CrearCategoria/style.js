import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerPrincipalCategoria:{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        // flexWrap: 'nowrap',
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: '25px',
        '@media (max-width:768px)':{ //ipad
            margin: '25px'
        },
        ['@media (max-width: 460px)']:{ //mobile 
            flexDirection: 'column',
            margin: '0px 10px'
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            margin: '0px 10px'
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            margin: '0px 5px'
        },
    },
    containerForm: {
        width: '100%',
        height: 'auto',
        borderTop: '15px solid #80c3ff',
        borderRadius: '10px',        
        background: 'white',
        margin: '0px 20px 0px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ['@media (max-width: 460px)']:{ //mobile 
            margin: '20px 0px',
        },        
    },
    containerVisualize:{
        width: '100%',
        height: 'auto',
        borderTop: '15px solid #80c3ff',
        borderRadius: '10px',        
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleCategory: {
        color: 'black',
    },
    formControlLogin: {
        width: '-webkit-fill-available',
        ['@media (max-width: 1920px)']:{ //desktop
            margin: '10px',
        },
        // ['@media (max-width: 460px)']:{ //mobile
        //     margin: '5px 10px',
        // },
    },      
}));