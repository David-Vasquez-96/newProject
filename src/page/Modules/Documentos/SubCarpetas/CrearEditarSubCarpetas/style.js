import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipalDocuments:{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        // flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '25px',
        borderTop: '15px solid #80c3ff',
        borderRadius: '10px',
        background: 'white',
        padding: '10px 0px',
        '@media (max-width:768px)':{ //ipad
            margin: '25px',
            flexDirection: 'column',
        },
        ['@media (max-width: 600px)']:{ //mobile 
            margin: '0px 10px',
            padding: '0px'
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            borderTop: '0px',
            borderRadius: '0px',
            margin: '0px'
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            borderTop: '0px',
            borderRadius: '0px',
            margin: '0px'
        },
    },
    containerForm: {
        width: '100%',
        height: 'auto',
        margin: '0px 0px 0px 0px',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleDocument: {
        color: 'black',
        margin: '10px 0px',
        fontWeight: 'bold',
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
    selectColor: {
        width: '-webkit-fill-available',
        textAlign: 'left',
        border: '1px solid #d4d8c1',
        borderRadius: '5px',
        ['@media (max-width: 1920px)']:{ //desktop
            margin: '10px',
        },
    },
    divider: {
        display: 'none',
        ['@media (max-width: 600px)']:{ //mobile 
            display: 'block',
            margin: '15px 0px',
        },        
    }
}));