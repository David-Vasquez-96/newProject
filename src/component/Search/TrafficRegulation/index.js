import React, { useEffect } from 'react';
import Base from 'component/Search/Base/'

export default function Vehicle(props) { 
    const [header,] = React.useState([
        { title: 'ID', field: 'id' },
        { title: 'Artículo', field: 'articleNumber' },
        { title: 'Inciso', field: 'subsection' },
        { title: 'Monto', field: 'amount' },
        { title: 'Descripción', field: 'description' },
    ]);
    const [controller,] = React.useState("trafficRegulation");
    const [customActions, setCustomActions] = React.useState([]);

    useEffect(() => {
        var localCustomAction=[];
        localCustomAction.push(function(rowData){ 
            return {
                icon: 'check_circle',
                tooltip: 'Seleccionar',
                onClick: function() { 
                    props.handler(rowData);
                }
            }
        });
        setCustomActions((props.customActions===undefined ) ?  localCustomAction : localCustomAction.concat(props.customActions));
    },[props.customActions, props.handler, props.open]);

    return (
        <Base   open={props.open}
                closeModal={props.closeModal}
                customActions={customActions}
                header={header}
                controller={controller}
                title={(props.title!==undefined) ? props.title: "Buscar artículo"}
        />
    );
}