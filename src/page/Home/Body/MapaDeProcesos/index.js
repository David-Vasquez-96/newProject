import React from 'react';
import {useStyles} from './style';
import { Button } from '@material-ui/core';
import { ArcherContainer, ArcherElement } from 'react-archer';


const MapaDeProcesos=(props)=> {
    const classes = useStyles(props);

    return (
        <div className={classes.ContainerPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Mapa de Procesos'}</h1>
            {/* <p className={classes.titleSecondary} variant="h5" color="initial">{'Navega en las siguientes categorías y encuentra fácilmente los documentos que necesites.'}</p> */}
            <div className={classes.containerGeneral}>    
                <ArcherContainer strokeColor="blue">
                    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', position: 'relative'}}>
                        <ArcherElement
                            id="container1"
                            relations={[
                                {
                                targetId: 'container2',
                                targetAnchor: 'top',
                                sourceAnchor: 'bottom',
                                style: { strokeColor: '#1B4F72', strokeWidth: 2 },
                                },
                            ]}
                        >
                            <div className={classes.containerText}>
                                <p className={classes.verticalText} variant="h5" color="initial">{'NECESIDADES DE CLIENTES Y PARTES INTERESADAS'}</p>
                            </div>
                        </ArcherElement>
                        <ArcherElement
                            id="container2"
                            relations={[
                                {
                                targetId: 'container3',
                                targetAnchor: 'top',
                                sourceAnchor: 'bottom',
                                style: { strokeColor: '#1B4F72', strokeWidth: 2 },
                                },
                            ]}
                        >
                            <div className={classes.containerSecond}>
                                <ArcherContainer strokeColor="blue">
                                    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', position: 'relative'}}>
                                        <ArcherElement
                                            id="contenedor1"
                                            relations={[
                                                {
                                                targetId: 'contenedor2',
                                                targetAnchor: 'top',
                                                sourceAnchor: 'bottom',
                                                style: { strokeColor: '#1B4F72', strokeWidth: 2 },
                                                },
                                            ]}
                                        >                        
                                            <div className={classes.firstContainer}>
                                                <p variant="h5" color="initial">{'PROCESOS ESTRATÉGICOS'}</p>
                                                <div className={classes.firstContainerButtons}>
                                                    <Button variant='outlined' className={classes.firstButtons}>DIRECCIÓN</Button>
                                                    <Button variant='outlined' className={classes.firstButtons}>GESTIÓN DE CALIDAD</Button>
                                                </div>
                                            </div> 
                                        </ArcherElement>
                                        <ArcherElement
                                            id="contenedor2"
                                        >  
                                            <div className={classes.secondContainer}>
                                                <p variant="h5" color="initial">{'PROCESOS OPERATIVOS'}</p>
                                                <div className={classes.firstContainerButtons}>
                                                    <ArcherContainer strokeColor="blue">
                                                        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative'}}>
                                                            {/* Primer botón con una flecha apuntando al segundo */}
                                                            <ArcherElement
                                                                id="element1"
                                                                relations={[
                                                                    {
                                                                    targetId: 'element2',
                                                                    targetAnchor: 'top',
                                                                    sourceAnchor: 'bottom',
                                                                    style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    },
                                                                    {
                                                                    targetId: 'element3',
                                                                    targetAnchor: 'top',
                                                                    sourceAnchor: 'left',
                                                                    style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    },
                                                                    {
                                                                    targetId: 'element5',
                                                                    targetAnchor: 'top',
                                                                    sourceAnchor: 'right',
                                                                    style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    },
                                                                ]}
                                                            >
                                                                <Button variant='outlined' className={classes.secondButtons}>VENTAS</Button>
                                                            </ArcherElement>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0'}}>
                                                            {/* Segundo botón con una flecha apuntando al tercero */}
                                                            <ArcherElement
                                                                id="element2"
                                                                relations={[
                                                                    {
                                                                    targetId: 'element3',
                                                                    targetAnchor: 'top',
                                                                    sourceAnchor: 'bottom',
                                                                    style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    },
                                                                ]}
                                                            >
                                                                <Button variant='outlined' className={classes.secondButtons}>DESARROLLO DE PRODUCTOS</Button>
                                                            </ArcherElement>
                                                        </div>
                                                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center',  }}>
                                                            {/* tercer botón con una flecha apuntando al cuarto */}
                                                            <ArcherElement
                                                                id="element3"
                                                                relations={[
                                                                    {
                                                                    targetId: 'element5',
                                                                    targetAnchor: 'top',
                                                                    sourceAnchor: 'bottom',
                                                                    style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    },
                                                                    {
                                                                    targetId: 'element4',
                                                                    targetAnchor: 'left',
                                                                    sourceAnchor: 'right',
                                                                    style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    },
                                                                ]}
                                                            >
                                                                <Button variant='outlined' className={classes.secondButtons} style={{marginRight: '30px'}}>PRODUCCIÓN</Button>
                                                            </ArcherElement>
                                                            
                                                            {/* cuarto botón con una flecha apuntando al tercero */}
                                                            <ArcherElement
                                                                id="element4"
                                                                relations={[
                                                                    // {
                                                                    // targetId: 'element3',
                                                                    // targetAnchor: 'left',
                                                                    // sourceAnchor: 'left',
                                                                    // style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    // },
                                                                ]}
                                                            >   
                                                                <Button variant='outlined' className={classes.secondButtons}>MANTENIMIENTO</Button>
                                                            </ArcherElement>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>                                    
                                                            {/* cuarto botón con una flecha apuntando al tercero */}
                                                            <ArcherElement
                                                                id="element5"
                                                                relations={[
                                                                    {
                                                                    targetId: 'element3',
                                                                    targetAnchor: 'bottom',
                                                                    sourceAnchor: 'left',
                                                                    style: { strokeColor: 'white', strokeWidth: 2 },
                                                                    },
                                                                ]}
                                                            >   
                                                                <Button variant='outlined' className={classes.secondButtons}>LOGÍSTICA</Button>
                                                            </ArcherElement>                                     
                                                        </div>
                                                    </ArcherContainer>                                
                                                </div>                        
                                            </div> 
                                        </ArcherElement>
                                        <ArcherElement
                                            id="contenedor3"
                                            relations={[
                                                {
                                                targetId: 'contenedor2',
                                                targetAnchor: 'bottom',
                                                sourceAnchor: 'top',
                                                style: { strokeColor: '#1B4F72', strokeWidth: 2 },
                                                },
                                            ]}                                
                                        > 
                                            <div className={classes.thirdContainer}>
                                                <p variant="h5" color="initial">{'PROCESOS DE APOYO'}</p>
                                                <div className={classes.firstContainerButtons}>
                                                    <Button variant='outlined' className={classes.thirdButtons}>ASEGURAMIENTO DE CALIDAD</Button>
                                                    <Button variant='outlined' className={classes.thirdButtons}>CONTABILIDAD</Button>
                                                    <Button variant='outlined' className={classes.thirdButtons}>SALUD Y SEGURIDAD OCUPACIONAL</Button>
                                                    <Button variant='outlined' className={classes.thirdButtons}>COMPRAS</Button>
                                                    <Button variant='outlined' className={classes.thirdButtons}>IT</Button>
                                                    <Button variant='outlined' className={classes.thirdButtons}>RECURSOS HUMANOS</Button>
                                                </div>                        
                                            </div>
                                        </ArcherElement> 
                                    </div>
                                </ArcherContainer>
                            </div>
                        </ArcherElement>  
                        <ArcherElement
                            id="container3"
                        >
                            <div className={classes.containerText}>
                                <p className={classes.verticalText} variant="h5" color="initial">{'CLIENTES Y PARTES INTERESADAS SATISFECHOS'}</p>
                            </div>
                        </ArcherElement>
                    </div>
                </ArcherContainer>                
            </div>          
        </div> 
    )
}
export default (MapaDeProcesos);