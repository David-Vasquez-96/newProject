import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    
    cardContent: {
        display: "contents",
    },
    listItem: {
        padding: '1% 6% 0% 8%',
        '&>.MuiListItem-root':{
            padding: '1% 6% 0% 8%',
        }
    },
    listIcon: {
        minWidth: 40,
        '&>.MuiListItemIcon-root':{
            minWidth: 40,
        }
    },
    listButton:{
       '@media (max-width : 1024px)':{
            width: 50,
            height: 50,
            fontSize: 15,
            margin: '3% 0% 3% 0%'
        },
       '@media (max-width : 768px)':{
            height: '23%'        
        },
       '@media (max-width : 460px)':{
            height: '19%',
            top: '-1%',        
        },
    },
    icon:{
        color: '#066BBD'
    },
}));