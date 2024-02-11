import { makeStyles } from '@material-ui/core/styles';

export const useStyles = props => makeStyles(theme=>({
    listDocumentsSecondary: {
        // backgroundColor: 'white',
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'initial',
        alignItems: 'center',
        width: '150px',
        // height: '150px',
        height: 'fit-content',
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
        },
        ['@media (max-width: 460px)']:{ //mobile 
            margin: '5px',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            margin: '5px',
            // height: 'fit-content',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            margin: '5px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            margin: '5px',
        },        
    },
    cardPrincipal: {
        borderRadius: '50%', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
        border: '5px solid'+props.label?.borderColor,
        ['@media (max-width: 1920px)']:{ //desktop
            width: '150px',
            height: '150px',
        },
        ['@media (max-width:1366px)']:{ //ipad
            width: '140px',
            height: '140px',
        },
        ['@media (max-width:1024px)']:{ //ipad
            width: '130px',
            height: '130px',
        },
       '@media (max-width:768px)':{ //ipad
            width: '115px',
            height: '115px',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            width: '90px',
            height: '90px',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            width: '90px',
            height: '90px',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '90px',
            height: '90px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '90px',
            height: '90px',
        },         
    },
    mobileIcon:{
        ['@media (max-width: 1920px)']:{ //desktop
            width: '100px',
            height: '100px',
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
    cardTitle: {
        color: props.label?.titleColor,
        fontWeight: 'bold',
        ['@media (max-width: 1920px)']:{ //desktop
            fontSize: '1.5rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
            fontSize: '1.5rem',
        },
        ['@media (max-width:1024px)']:{ //ipad
            fontSize: '1.4rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '1.3rem',
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