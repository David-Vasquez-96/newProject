import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    ContainerPrincipal:{
        backgroundColor: '#F2F6FA',
        padding: '15px 10px',
        width: '100%',
        // marginTop: '20px',
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'center',
        ['@media (max-width: 723px)']:{ //mobile Iphone 14 normal
            flexDirection : 'column',
            alignContent: 'center'
        },         
    },
    containerZero: {
        textAlign: 'center',
        ['@media (max-width: 723px)']:{ //mobile Iphone 14 normal
            padding: '20px 0px',
        },        
    },    
    mobileIcon:{
        ['@media (max-width: 1920px)']:{ //desktop
            width: '80px',
            height: '80px',
        },
        ['@media (max-width:1366px)']:{ //ipad
            width: '90px',
            height: '90px',
        },
        ['@media (max-width:1024px)']:{ //ipad
            width: '80px',
            height: '80px',
        },
       '@media (max-width:768px)':{ //ipad
            width: '70px',
            height: '70px',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            width: '60px',
            height: '60px',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            width: '60px',
            height: '60px',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '60px',
            height: '60px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '60px',
            height: '60px',
        }, 
    },     
    titlePrincipal:{
        textAlign: 'center',
        color: '#034DA1',
        margin: 0,
        padding: '0px 15px',
        wordWrap: 'break-word',
     
        ['@media (max-width: 1920px)']:{ //desktop
            fontSize: '3.5rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
            fontSize: '3.5rem',
        },
        ['@media (max-width:1024px)']:{ //ipad
            fontSize: '3.3rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '3rem',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            fontSize: '3rem',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            fontSize: '2.7rem',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            fontSize: '2.5rem',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            fontSize: '2.5rem',
        },
    },
    titleContent:{
        color: 'black',
        fontSize: '1rem',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover':{
            textDecoration: 'none',
            color: 'black',
        },   
    },
    containerFirstSection: {
        padding: '0px 20px 0px 20px',
        ['@media (max-width: 723px)']:{ //mobile Iphone 14 normal
            padding: '20px 0px',
        },
    },
    containerSecondSection: {
        padding: '0px 20px 0px 20px',
        ['@media (max-width: 723px)']:{ //mobile Iphone 14 normal
            padding: '20px 0px',
        },
    },
    dividerHorizontal:{
        display: 'none',
        ['@media (max-width: 723px)']:{ //mobile Iphone 14 normal
            display: 'block',
        },
    },
    dividerVertical:{
        display: 'list-item',
        height: 'auto',
        ['@media (max-width: 723px)']:{ //mobile Iphone 14 normal
            display: 'none'
        },
    },
}));