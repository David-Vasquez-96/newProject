import React, { useEffect } from 'react';
import Base from 'component/Search/Base/'

export default function Person(props) { 
    const [header,] = React.useState([
        { title: 'ID', field: 'id' },
        { title: 'Fecha', field: 'entryDate', type:'date' },
        { title: 'Boleta', field: 'ticket' },
        { title: 'Dirección de la Infracción', field: 'address' },
        { title: 'Propietario', field: 'vehicle.person.name' },
        { title: 'Infractor', field: 'person.name' },
        { title: 'Accción del infractor', field: 'personStatusOfTrafficTicket.name' },
        { title: 'Estado de la multa', field: 'trafficTicketStatus.name' },
        { title: 'Agente', field: 'employee.firstName' },
        { title: 'Place de vehículo', field: 'vehicle.fullPlate' },
        { title: 'Tipo de vehículo', field: 'vehicle.vehicleType.name' }, 
    ]);
    const [controller,] = React.useState("trafficTicket");
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
                title={(props.title!==undefined) ? props.title: "Buscar multa"}
        />
    );
}