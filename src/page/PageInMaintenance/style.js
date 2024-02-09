import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    root: {
        width: 120,
        height: 120,
        margin: 'auto',
        borderRadius: '0px 0px 75px 70px',
        '& img':{
            width: '80%',
            height: '80%',
        },
        ['@media (max-width: 2000px)'] :{  //web
            width: 135,
            height: 135,
            marginBottom: '8%',
        },
        ['@media (max-width:1566px)']:{ // web
            width: 100,
            height: 100,
            marginBottom: '3%',
        },        
        ['@media (max-width:1280px)']:{ // web
            width: 93,
            height: 95, 
        },
        ['@media (max-width:1024px)']:{ // web
            width: 100,
            height: 100, 
        },
        ['@media (max-width:768px)']:{ // web
            width: 78,
            height: 82, 
        },
        ["@media (max-width: 500px)"]:{
            width: 70,
            height: 85,            
        }
    },    
    loginContainer : {
        alignContent: "center",
        backgroundSize: 'contain',
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: 'column',
        height: 'inherit', 
        justifyContent: 'center',
        position: 'relative!important',        
        height: '100%',
    },
    loginBox :{
        top: '44%',
        left: '50%',
        width: '24%',
        height: 'auto',
        margin:  'auto',
        padding: '1% 1% 1% 1%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',        
        background: '#f2f4f3',
        borderRadius: '28px 28px 28px 28px',
        ['@media (max-width: 2000px)'] :{  //web
            width: '26%',
            marginTop: '0%',
            minWidth: 312,
        },
        ['@media (max-width: 1500px)'] :{  //web
            width: '23%',   
        },
        ['@media (max-width:1366px)']:{ // web
            width: '26%',
        },
        ['@media (max-width:1280px)']:{ // web
            
        },
        ['@media (max-width:1030px)']:{ // web
            top: '50%',
            width: '30%',
        },
        ['@media (max-width:780px)']:{ // ipad
            width: '47%',
            
        },
        ['@media (max-width:460px)']:{ // mobil
            marginTop: '0%',            
            background: 'transparent',
            borderRadius: 'none',
            boxShadow: 'none',
        },
        boxShadow:'0px 0px 0px 2px #1e88e5',
    },
    title : {
        position: 'absolute',
        margin: 'auto',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '2.3rem',
        // fontFamily: 'nano',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '10%',     
        padding: '2% 0%',
        ['@media (max-width:1024px)']:{ // web
            fontSize: '2rem',
        },
        ['@media (max-width:768px)']:{ // ipad
            fontSize: '3rem',
            padding: '3% 2%',
        },
        ['@media (max-width:460px)']:{ // ipad
            fontSize: '1.7rem',
            padding: '0% 7%',            
            marginTop: '0%',
        },
    },
    titleLeft : {
        // fontFamily: 'nano',
        color: 'black',
        fontWeight: '500',
        marginTop: '0%',
        marginBottom: '3%',
        textAlign: 'center',
    },
    img:{       
        display: 'flex',
        borderRadius: '50%',
        margin: 'auto',        
        width: '30%',
        ['@media (max-width: 2560px)'] :{  //web
            width: '19%',
        },
        ['@media (max-width: 2000px)'] :{  //web
            width: '20%',
        },
        ['@media (max-width:1700px)']:{ // web
            width: '25%',
        },        
        ['@media (max-width:1500px)']:{ // web
            width: '30%',
        },        
        ['@media (max-width:1200px)']:{ // web
            width: '35%',
        },
        ['@media (max-width:1024px)']:{ // web
            width: '40%',
        },
        ['@media (max-width:1000px)']:{ // web
            width: '45%',
        },
        ['@media (max-width:768px)']:{ // web
            width: '45%',
        },
        ['@media (max-width:700px)']:{ // web
            width: '50%',
        },
        ['@media (max-width:600px)']:{ // web
            width: '55%',
        },
        ["@media (max-width: 500px)"]:{
            width: '60%',
        },
        ["@media (max-width: 400px)"]:{
            width: '70%',
        }        
    }
}))