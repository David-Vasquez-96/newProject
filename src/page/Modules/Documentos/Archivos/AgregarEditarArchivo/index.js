import React, {  useState } from 'react';
import { AttachFile, Cancel, Description, FormatListNumbered, NoteAdd} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Form from 'component/Form/FormTwoColumns';
import Alert from 'react-s-alert';
import ComponenteVisualizarArchivo from '../VisualizarArchivos'
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFilesList } from 'store/reducers/documentosSlice'

const ComponenteAgregarEditarArchivos=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryList = JSON.parse(JSON.stringify(useSelector( state => state.categoria.categoryList))); 
    const newArray = []
    const formatos = [
        {id: 1, name: '1. PDF', type: '.pdf'},
        {id: 2, name: '2. EXCEL', type: '.xlsx'},
        {id: 3, name: '3. WORD', type: '.docx'},
        {id: 4, name: '4. IMAGEN', type: '.png'},
        {id: 5, name: '5. VIDEO', type: '.mp4'},
    ]
    const description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];     
    const FuncionAgregarExtension = (e) =>{
        elements.file.accept = e?.target?.data?.type
        elements.file.value = null
        elements.file.base64Complete = null
    }
    const [elements,setElements] = useState({
        type: {
            idelement: "type", value: props.data?.type || null , label: "Seleccione formato del archivo *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione formato del archivo'], isError:false, elementType:'autocompleteV3', variant: "outlined",  icon: <AttachFile/>,
            list: formatos, style: classes.formControlInput, disabled: false, data: props.data?.type, handler: FuncionAgregarExtension
        },
        file:{
            idelement: "file", value: props.data?.base64 || null, label: "Adjunte archivo *", base64Complete: props.data?.base64 || null,
            validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
            disabled:false, name:"file", fileWidth: false, src: '', multiple: false, accept:".png, .jpg, .jpeg, .svg",
        },         
        nombreArchivo: {
            idelement: "nombreArchivo",  value: props.data?.name || "",    label: "Ingrese nombre del archivo *",   pattern:"^([a-zA-Z_ÑñáéíóúÁÉÍÓÚ][a-zA-Z_ ÑñáéíóúÁÉÍÓÚ]*[a-zA-Z_ÑñáéíóúÁÉÍÓÚ])$", initialRequiredLength: 1, finalRequiredLength: 100,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Description/>, 
            style: classes.formControlInput, disabled: false
        },
        version: {
            idelement: "version",  value: props.data?.version || "",    label: "Ingrese versión *",   pattern:"^([a-zA-Z_0-9][a-zA-Z_ Ññ0-9]*[a-zA-Z_Ññ0-9])$", initialRequiredLength: 1, finalRequiredLength: 30, 
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <FormatListNumbered/>, 
            style: classes.formControlInput, disabled: false
        },
        typeCategory: {
            idelement: "typeCategory", value: props.data?.idCategoria || null , label: "Asignele una categoria *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione una categoria'], isError:false, elementType:'autocompleteV3', variant: "outlined",  icon: <AttachFile/>,
            list: categoryList, style: classes.formControlInput, disabled: false
        },        
    });

    const FuncionAgregarArchivo = (e) => {
        dispatch(setFilesList([]))        
        let saveUser = {
            idCarpeta: props.datosDeDocumento?.carpeta?.idCarpeta,
            idSubCarpeta: props.datosDeDocumento?.subCarpeta?.idSubCarpeta,
            id: props.filesList.length+1, 
            idCategoria: elements.typeCategory.value, 
            formato: elements.type.data?.type, 
            type: elements.type.data, 
            name: elements.nombreArchivo.value, 
            version: elements.version.value, 
            usuario: 'MDHERRERAV', 
            publicacion: new Date(),
            base64: elements.file.base64Complete
        }
        newArray.push(saveUser)
        const concatArray = props.filesList.concat(newArray)
        dispatch(setFilesList(concatArray))
        props.closeModal()
        Alert.success('Archivo '+saveUser?.name+' agregado correctamente.');
    }

    const FuncionEditarArchivo = () =>{
        dispatch(setFilesList([]))
        let getFileId = props.filesList.findIndex(obj => obj.name === props?.data?.name)
        if(getFileId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            props.filesList[getFileId].idCategoria = elements.typeCategory.value;
            props.filesList[getFileId].formato = elements.type.data?.type;
            props.filesList[getFileId].type = elements.type.data;
            props.filesList[getFileId].name = elements.nombreArchivo.value;
            props.filesList[getFileId].version = elements.version.value;
            // props.filesList[getFileId].publicacion = new Date();
            props.filesList[getFileId].base64 = elements.file.base64Complete;
        }
        dispatch(setFilesList(props.filesList))
        Alert.success('Archivo / '+ elements.nombreArchivo.value+' / actualizado correctamente.')
        props.closeModal()
    }

    const FuncionArchivos = () =>{
        if(props.id === 1) FuncionAgregarArchivo();
        else if (props.id === 2) FuncionEditarArchivo();        
    }
    // funciones para visualizar un archivo *******************************************************
    const [openFileViewer, setOpenFileViewer] = useState({open: false, data: {}});
    const FuctionOpenFileViewer = (data) =>{
        if(props.id === 1) setOpenFileViewer({open: true, data: {base64: elements.file.base64Complete, formato: elements.type.data?.type}});
        else if (props.id === 2) setOpenFileViewer({open: true, data: {base64: elements.file.base64Complete, formato: elements.type.data?.type}});                
        
    }
    const FuctionCloseFileViewer = () =>{
        setOpenFileViewer({open: false, data: {}})
    }       
    const [buttonList,setButtonList]= useState({
        "procesar":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionArchivos, variant: 'outlined', color: "primary", },
        "verArchivo":{"label":"Ver archivo","icon": <Description />,"callback":FuctionOpenFileViewer, isCancel: true, variant: "outlined", color: "primary"},
        "cancel":{"label":"Cancelar","icon": <Cancel />,"callback":props.closeModal, isCancel: true, variant: "outlined", color: "secondary"},
    });

    const anchoDePantalla = window.innerWidth;

    return (
        <>
            <DialogoPersonalizado 
                open={props.open}
                fullScreen={(anchoDePantalla <= 460) ? true : false}
                closeModal={props.closeModal}
                // actualizarTabla={props.actualizarTabla}
                iconToolbar={props.iconToolbar}
                titleToolbar={props.titleToolbar}
                fullWidth={true}
                maxWidth={'md'}            
            >
                <div className={classes.containerPrincipal}>
                    <div className={classes.title}>Complete el formulario para {props.titleToolbar}</div>
                    <Form   elements= {elements}  buttonList={buttonList} description={description} />
                </div>
            </DialogoPersonalizado>
            {/* componente para visualizar un archivo ******************************************* */}
            {
                (openFileViewer.open) ? (
                    <ComponenteVisualizarArchivo 
                        open = {openFileViewer.open}
                        closeModal = {FuctionCloseFileViewer}
                        iconToolbar = {<NoteAdd/>}
                        titleToolbar = {'Visualizador'}
                        data={openFileViewer.data}
                    />
                ):''
            }                
        </>
    )
}
export default (ComponenteAgregarEditarArchivos);