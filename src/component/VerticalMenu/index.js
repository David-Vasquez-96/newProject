import React from 'react';
import Group from 'component/Group';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import {useStyles} from './style';

const ListMenu=(props)=>{
    const classes = useStyles(props);

    return ( 
        <div>
            <div className={classes.title}>Menú</div>          
            {(props.menu!==null) ?  
                Object.keys(props.menu).map((key,index) =>{
                    return (
                        <div key={index}
                            onClick={()=>{
                                props.SET_MENU_ITEM_GROUP(index);
                            }}
                        > 
                            <Group {...props} group={props.menu[key]}></Group>                            
                        </div>
                    )
                }):''
            }
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ListMenu);
