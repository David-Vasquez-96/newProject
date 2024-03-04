import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Title from 'component/TitleWithIcon';
import { VerifiedUser } from '@material-ui/icons';
import Table from 'component/Table';
import { ButtonGroup, FormControlLabel, Switch} from '@material-ui/core';
import Alert from 'react-s-alert';

// REDUX **************************
import { useSelector, useDispatch} from 'react-redux';
import { setForms } from 'store/reducers/SecuritySlice';

const ComponentePermisosRoles=(props)=> {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    // const formsPrincipal = JSON.parse(JSON.stringify(useSelector( state => state.security.forms))); 
    const forms = JSON.parse(JSON.stringify(useSelector( state => state.security.forms))); 
    // const forms = cloneDeep(useSelector(state => state.security.forms));
    // const forms = useSelector(state => state.security.forms);

    const handleChange = (event) => {
        const object = {
            checked: event?.target?.checked,
            data: event?.target?.data,
            forms: forms
        };
        // dispatch(setForms([]))
        // const clonedForms = cloneDeep(forms); // Crear una copia profunda del objeto forms
        // let getFormId = clonedForms.findIndex(obj => obj.idGrupo === event?.target?.data?.idGrupo && obj.idForm === event?.target?.data?.idForm);
        // if (getFormId !== -1) {
        //     // Si se encuentra el objeto buscado, proceder a actualizar el objeto
        //     clonedForms[getFormId].read = event?.target?.checked;
        // }
        dispatch(setForms(object))
        Alert.success('Permisos actualizados correctamente.')
    };

    const ComponentSwitch = (data) =>{

        return (
            <FormControlLabel
                value={data.id}
                control={
                    <Switch 
                        color={(!data.read) ? "secondary":"primary"} 
                        checked={data.read}
                        onChange={(event) => {
                            var event = {
                                target: {
                                    checked: event.target.checked,
                                    name: event.target.name,
                                    data: data,
                                },
                            };
                            handleChange(event);
                        }}
                    />
                }
                label={(data.read) ? 'Acceso permitido' : 'acceso denegado'}
                labelPlacement="top"
            />
        )
    }
    
    const [header] = useState([
        { title: 'Id Grupo', field: 'idGrupo', cellStyle: { width: '200px'}},
        { title: 'Grupo de Formulario', field: 'grupoFormulario', cellStyle: { width: '200px'}},
        { title: 'Id Form', field: 'idForm', cellStyle: { width: '200px'}},
        { title: 'Formulario', field: 'nombreFormulario', cellStyle: { width: '200px'}},
        { title: 'Listar y Visualizar', field: 'read', cellStyle: { width: '200px'},
            render: rowData => ComponentSwitch(rowData)
        },
        { title: 'Crear', field: 'create', cellStyle: { width: '200px'}},
        { title: 'Editar', field: 'update', cellStyle: { width: '200px'}},
        { title: 'Eliminar', field: 'delete', cellStyle: { width: '200px'}},
        { title: 'Acciones', field: '', filtering: false,
            render: rowData=>
                <div>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {/* <BotonElement icon={<LockOpen style={{color: '#066bbd'}}/>} title="Permisos" function={()=>{}}/>
                        <BotonElement icon={<Edit style={{color: '#F3650E'}}/>} title="Editar" function={() => FuncionOpenModalEditRol(rowData)}/>
                        <BotonElement icon={<DeleteForever style={{color: 'red'}}/>} title="Eliminar" function={() => FunctionOpenRolModalToDelete(rowData)}/> */}
                    </ButtonGroup>
                </div>
        },         
    ]);
    

    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={true}
            closeModal={props.closeModal}
            // actualizarTabla={props.actualizarTabla}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
            // fullWidth={true}
            // maxWidth={'md'}            
        >
            <div className={classes.containerPrincipal}>
                <Title title={'Permisos de Rol '+props?.data?.name} icon={<VerifiedUser />} />
                <div className={classes.containerTable}>
                    <Table 
                        title={"Listado"}
                        header = {header}
                        // service={ApiServices[this.state.controller]}
                        // refreshList={this.showList}
                        data={forms} 
                        // showSearcher={true}
                        // isMenuDesplegable={true}
                        // arrayMenuDesplegable={buttonList}
                        refreshList={()=>{}}
                        showFilterGeneral={false}
                    />
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponentePermisosRoles);