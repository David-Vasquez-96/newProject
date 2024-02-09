import React, { useEffect } from 'react';
import Base from 'component/Search/Base/'

export default function Person(props) { 
    const [header,] = React.useState([
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'CUI', field: 'cui' },
        { title: 'No. Licencia', field: 'licenseNumber' },
        { title: 'Tipo de licencia', field: 'vehicleLicense.name' },
        { title: 'Descripción', field: 'vehicleLicense.description' },
       
    ]);
    const [controller,] = React.useState("person");
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
                title={(props.title!==undefined) ? props.title: "Buscar personas"}
        />
    );
}