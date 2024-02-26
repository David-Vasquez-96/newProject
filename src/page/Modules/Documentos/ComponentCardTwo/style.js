import { makeStyles } from '@material-ui/core/styles';

export const useStyles = props => makeStyles(theme=>({
    containerCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        border: '1px solid '+`rgba(${ props?.backgroundColor?.r }, ${ props?.backgroundColor?.g }, ${ props?.backgroundColor?.b }, ${ props?.backgroundColor?.a })`,
        boxShadow: '0px 0px 15px black',
        borderRadius: '25px',
        width: '300px',
        height: '100%',
        margin: '20px 20px',
        ['@media (max-width: 1920px)']:{ //desktop
        },
        ['@media (max-width:1366px)']:{ //ipad
            // width: '200px',
            // height: '100%',
        },
        ['@media (max-width:1024px)']:{ //ipad
            // width: '200px',
            // height: '100%',
        },
       '@media (max-width:768px)':{ //ipad
            // width: '100%',
            // height: '100%',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            // width: '100%',
            // height: '100%',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            // width: '100%',
            // height: '100%',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            // width: '100%',
            // height: '100%',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            // width: '100%',
            // height: '100%',
        },         
    },
    containerData: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: `rgba(${ props?.backgroundColor?.r }, ${ props?.backgroundColor?.g }, ${ props?.backgroundColor?.b }, ${ props?.backgroundColor?.a })`,
        // backgroundColor: props.label?.backgroundColor
        backgroundImage: `url(/assets/waveTotal.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'contain',
        backgroundPosition: 'bottom',
        backgroundBlendMode: 'soft-light',
    },
    containerSection:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%'
    },
    mobileIcon:{
        // border: '3px solid white',
        borderRadius: '25%',
        background: 'white',
        // paddingTop: '10px',
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
    containerButtons: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: `rgba(${ props?.backgroundColor?.r }, ${ props?.backgroundColor?.g }, ${ props?.backgroundColor?.b }, ${ props?.backgroundColor?.a })`,
        backgroundImage: `url(/assets/waveTotalTwo.svg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'contain',
        backgroundPosition: 'top',
        backgroundBlendMode: 'soft-light',
    } ,
    cardTotal: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: '4rem',
        marginBottom: '15px',
        ['@media (max-width: 1920px)']:{ //desktop
            // fontSize: '1.2rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
            // fontSize: '1.2rem',
        },
        ['@media (max-width:1024px)']:{ //ipad
            // fontSize: '1.2rem',
        },
       '@media (max-width:768px)':{ //ipad
            // fontSize: '1.2rem',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            // fontSize: '1.2rem',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            // fontSize: '1.1rem',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            // fontSize: '1rem',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            // fontSize: '1rem',
        },        
    }, 
    cardTitle: {
        fontWeight: 'bold',
        color: 'white',
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
    buttonSuccess: {
        color: '#1F558D',
        border: '1px solid #1F558D'
    },
    editButton: {
        color: '#F3650E',
        border: '1px solid #F3650E'
    },
    deleteButton: {
        color: 'red',
        border: '1px solid red'
    },
}));