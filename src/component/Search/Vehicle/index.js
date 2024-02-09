import React, { useEffect } from 'react';
import Base from 'component/Search/Base/'

export default function Vehicle(props) { 
    const [header,] = React.useState([
        { title: 'ID', field: 'id' },
        { title: 'Tipo de placa', field: 'vehiclePlateType.name' },
        { title: 'Placa', field: 'fullPlate' },
        { title: 'Tarjeta de circulación', field: 'circulationCard' },
        { title: 'Marca', field: 'brand' },
        { title: 'Color', field: 'color' },
        { title: 'Tipo de vehiculo', field: 'vehicleType.name' },
        { title: 'Propietario', field: 'person.name' },
        { title: 'NIT', field: 'person.nit' },
        { title: 'Tipo de licencia', field: 'person.vehicleLicense.name' },
    ]);
    const [controller,] = React.useState("vehicle");
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
                title={(props.title!==undefined) ? props.title: "Buscar vehículos"}
        />
    );
}