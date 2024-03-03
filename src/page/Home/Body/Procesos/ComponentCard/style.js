import { makeStyles } from '@material-ui/core/styles';

export const useStyles = props => makeStyles(theme=>({
    listProcessSecondary: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'initial',
        alignItems: 'center',
        width: '150px',
        height: '200px',
        ['@media (max-width: 1920px)']:{ //desktop
            margin: '20px 100px',
        },
        ['@media (max-width:1745px)']:{ //ipad
            margin: '20px 70px',
        },
        ['@media (max-width:1499px)']:{ //ipad
            margin: '20px 50px',
        },
        ['@media (max-width:1366px)']:{ //ipad
            margin: '20px 50px',
        },
        ['@media (max-width:1024px)']:{ //ipad
            margin: '20px 50px',
        },
       '@media (max-width:768px)':{ //ipad
            margin: '20px',
            height: '170px',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            margin: '5px',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            margin: '5px',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            margin: '5px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            margin: '5px',
        },        
    },
    cardPrincipal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        border: '1px solid '+`rgba(${ props?.backgroundColor?.r }, ${ props?.backgroundColor?.g }, ${ props?.backgroundColor?.b }, ${ props?.backgroundColor?.a })`,
        boxShadow: '0px 0px 15px black',
        borderRadius: '25px',
        ['@media (max-width: 1920px)']:{ //desktop
            width: '200px',
            height: '100%',
        },
        ['@media (max-width:1366px)']:{ //ipad
            width: '200px',
            height: '100%',
        },
        ['@media (max-width:1024px)']:{ //ipad
            width: '200px',
            height: '100%',
        },
       '@media (max-width:768px)':{ //ipad
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '100%',
            height: '100%',
        },         
    },
    containerImage: {
        width: '100%',
        // height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: `rgba(${ props?.backgroundColor?.r }, ${ props?.backgroundColor?.g }, ${ props?.backgroundColor?.b }, ${ props?.backgroundColor?.a })`,
        // backgroundColor: props.label?.backgroundColor
    },
    mobileIcon:{
        // border: '3px solid white',
        // borderRadius: '5px',
        paddingTop: '10px',
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
    containerTitle: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ['@media (max-width: 1920px)']:{ //desktop
        },
        ['@media (max-width:1366px)']:{ //ipad
            height: '100%',
        },
        ['@media (max-width:1024px)']:{ //ipad
            height: '100%',
        },
       '@media (max-width:768px)':{ //ipad
            height: '100%',
        },
    } ,
    cardTitle: {
        fontWeight: 'bold',
        color: props.label?.titleColor,
        ['@media (max-width: 1920px)']:{ //desktop
            fontSize: '1.2rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
            fontSize: '1.2rem',
        },
        ['@media (max-width:1024px)']:{ //ipad
            fontSize: '1.2rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '1.2rem',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            fontSize: '1.2rem',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            fontSize: '1.1rem',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            fontSize: '1rem',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            fontSize: '1rem',
        },        
    }, 
}));