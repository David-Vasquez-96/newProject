import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
    root:{
        height: '100%',
        display: 'flex',
	},
    content:{
        height: '100%',
        width: '100%',
        flexGrow: 1,
        // backgroundColor: 'red',
        backgroundColor: '#EDEDED',
    },
    icon:{
        marginRight: 5,
    },
    title_text:{
        '@media (max-width:2560px)':{ //ipad
            fontSize: '0.8rem'
        },
        '@media (max-width: 415px)':{ //mobile   
            fontSize: '0.7rem',
        }            
    },
    button: {
        margin: '0px',
        padding: '6px 4px',
        '@media print':{
            display:'none',
        },
        '@media (max-width:768px)':{ //ipad
            padding: 0
        },
        '@media (max-width: 415px)':{ //mobile   
            marginLeft:0,
            minWidth:10,
            padding:0,
            fontSize: '0.5rem',
        },    
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        '@media (max-width:2000px)':{ //web
            fontSize:'0.8rem',
        },
        '@media (max-width:1000px)':{ //web
            fontSize:'1rem',
            minWidth: 200,
        },
        '@media (max-width:768px)':{ //ipad
            fontSize:'0.8rem',
            minWidth: 150,
        },
        '@media (max-width:415px)':{ //mobile
            fontSize:'0.5rem',
            maxWidth: 250,
        }
    },
    appIcon: {
        width: 30,
        height: 30, 
        ['@media (max-width:2560px)']:{ //ipad
        },
        ['@media (max-width:1024px)']:{ //ipad
        },
        ['@media (max-width:768px)']:{ //ipad
        },
        ['@media (max-width: 460px)']:{ //mobile   
            width: 30,
            height: 30, 
        },
        ['@media (max-width: 320px)']:{ //mobile   
            width: 30,
            height: 30, 
        }        
    },
    contentButtonAppBar:{
        width: '100%',
        textAlign: 'right',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "linear-gradient(0deg, #1d5079 20%, #205690 62%)",
        boxShadow: "none",
        height: 37,
        justifyContent: 'center',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appTitle: {
        alignItems: 'center',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        // fontSize: 15,
        fontFamily: 'roboto',
        lineHeight: '60px',
        verticalAlign: 'middle',
        textDecoration: 'none',
        wordWrap: 'break-word',
        '&:hover':{
            textDecoration: 'none',
            color: 'white',
        },
        '@media (max-width:2560px)':{ //ipad
            fontSize: '1rem'
        },
        '@media (max-width:768px)':{ //ipad
            fontSize: '0.9rem'
        },
        '@media (max-width:460px)':{ //ipad
            fontSize: '0.8rem'
        },
        '@media (max-width: 415px)':{ //mobile   
            fontSize: '0.7rem',
        }     
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    //    '@media (min-width: 500px)':{
    //         display: 'none',
    //     }
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        // boxShadow: '30px 0px 40px 17px rgba(55,56,55,0.45)',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        //padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        height: 'auto',
        padding: `30% 0% 10% 0%`,
        lineHeight: '1.1',
        fontSize: '0.96rem',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        // boxShadow: `0px -23px 10px 23px rgba(0,0,0,1)`,
        // background:'linear-gradient(0deg, #1d5079 20%, #205690 62%)',
        background: `radial-gradient(circle, rgba(12,60,99,1) 25%, rgba(32,86,144,1) 100%)`,
        color: 'white',
    },
    fab:{
        top: '2%',
        left: '34%',        
        position: 'absolute',
        border: '3px solid white',
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        },
    },
    image: {
        width: '80%',
        // borderRadius: '50%',
    },
    titleMenu:{
        fontFamily: 'sans-serif',
        color:"white",
        fontWeight: 'bold',
        fontSize:'1rem',
    },
    iconMenu:{
        top:'1%',
        left:'74%',
        width:'20%',
        color: 'rgba(255, 255, 255, 0.54)',
        position: 'absolute',
    },
    toolbar:{
        ['@media (max-width:415px)']:{ //mobile
            paddingLeft: 5,
            paddingRight:5,
        }
    },
    rootMenu: {
        display: 'flex',
        ['@media (max-width:2560px)']:{ //mobile
            flexDirection: 'row',
        },
        ['@media (max-width:430px)']:{ //mobile
            flexDirection: 'column',
        }        
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    containerInformation:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        textAlign: 'center',
    },    
    typographyInformation: {
        marginRight: theme.spacing(1),
    },    
    typography: {
        padding: theme.spacing(2),
    },
    menuItem: {
        // padding: '0px'
    },
    contentShift: {
        // transition: theme.transitions.create('margin', {
        //     easing: theme.transitions.easing.easeOut,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
        // marginLeft: 0,
    },
}));