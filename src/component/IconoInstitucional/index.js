import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 120,
        height: 120,
        margin: 'auto',
        borderRadius: '0px 0px 75px 70px',
        '& img':{
            width: '80%',
            height: '80%',
        },
       '@media (max-width: 2000px)' :{  //web
            width: 135,
            height: 135,
        },
       '@media (max-width:1566px)':{ // web
            width: 100,
            height: 100,
        },        
       '@media (max-width:1280px)':{ // web
            width: 93,
            height: 95, 
        },
       '@media (max-width:1024px)':{ // web
            width: 100,
            height: 100, 
        },
       '@media (max-width:768px)':{ // web
            width: 78,
            height: 82, 
        },
        "@media (max-width: 500px)":{
            width: 88,
            height: 85,            
        }
    },
}));

export default function IconElement(props) {
    const classes = useStyles(props);
    let url  ="/assets/SkyIcon.svg";
    return(<Avatar className={classes.root} alt="Logo TSE" src={url} />)
}
