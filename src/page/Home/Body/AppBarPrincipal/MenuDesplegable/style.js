import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    BodyPrincipal:{
        width: '100%',
        // height: '100%',
        // textAlign: 'center',
        // backgroundColor: '#F2F6FA',
        // backgroundColor: '#dbedff',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItemTitle: {
        paddingLeft: '10px',
        paddingRight: '10px',    
    },
    ListItemIconTitle: {
        color: 'black',
        minWidth: '40px',
    },
    listItemTextTitle: {
        '&>.MuiTypography-body1':{
            fontWeight:'bold',
        },        
        
    },
    mobileIcon:{
        width: '30px',
        height: '30px',
        marginRight: '10px',
    //     ['@media (max-width: 1920px)']:{ //desktop
    //     },
    //     ['@media (max-width:1366px)']:{ //ipad
    //         width: '50px',
    //         height: '50px',
    //     },
    //     ['@media (max-width:1024px)']:{ //ipad
    //         width: '50px',
    //         height: '50px',
    //     },
    //    '@media (max-width:768px)':{ //ipad
    //         width: '50px',
    //         height: '50px',
    //     },
    //     ['@media (max-width: 460px)']:{ //mobile 
    //         width: '50px',
    //         height: '50px',
    //     },
    //     ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
    //         width: '50px',
    //         height: '50px',
    //     },
    //     ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
    //         width: '40px',
    //         height: '40px',
    //     },
    //     ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
    //         width: '40px',
    //         height: '40px',
    //     }, 
    },      
}));