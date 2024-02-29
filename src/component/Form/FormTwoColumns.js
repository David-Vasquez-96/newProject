import React, { Fragment, useEffect } from "react";
import clsx from "clsx";
import { Grid, Button, CircularProgress, Divider, Typography,  Container, Chip, Icon, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core/";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { Send, NavigateBefore, NavigateNext, CheckCircleOutline, GetApp, ContactPhone} from "@material-ui/icons/";
import Alert from "@material-ui/lab/Alert";
import FormControlInput from "component/Form/InputControl";
import FormControlInputOutlined from "component/Form/InputControlOutlined";
import FormControlTextField from "component/Form/TextFieldControl";
import FormControlTextArea from "component/Form/TextAreaAutosizeControl";
import FormControlInputCustom from "component/Form/InputControlCustom";
import FormControlPassword from "component/Form/PasswordControl";
import FormControlSelect from "component/Form/SelectControl";
import FormControlSelectAutocomplete from "component/Form/SelectControlAutoComplete";
import FormControlSelectAutoCompleteV2 from "component/Form/autoComplete";
import FormCustomAutoComplete from "component/Form/CustomAutoComplete";
import CustomFormControlSelect from "component/Form/CustomSelectControl";
import FormCheckboxList from "component/Form/CheckboxListControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControlDate from "component/Form/DateControl";
import FormControlTime from "component/Form/TimePickerControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlInputRadio from "./radioButton";
import MultiselectV1 from 'component/Form/MultiSelectAutoComplete';
import FormControlFile from './InputFile';
import FormControlShowPDF from './PDFControl';
import MaxHeightTextarea from './customTextArea';
import FormControlSelectAutoCompleteCheckbox from './AutoCompleteCheckBox';
import ListControl from './ListItem'
import SketchPickerColorControl from './SketchPickerColorControl/SketchPicker'
import FormControlSelectAutoCompleteV3 from 'component/Form/autoCompleteEstable'

// import FormControlFile from './InputFile';
import { useStyles } from "./style";
import { withStyles } from "@material-ui/core/styles";
import { showMessagePersonalizedPosition } from "service/SweetAlert";
import { functions } from 'constant/index'

export default function Table(props) {
  const ColorButton = withStyles((theme) => ({
    root: {
      color: "white",
      backgroundColor: "#1c4e78",
      "&:hover": {
        backgroundColor: "#1c4e78",
      },
    },
  }))(Button);

  const classes = useStyles();
  const [elements, setElements] = React.useState(props.elements);
  const [apiErrors, setApiErrors] = React.useState(props.apiErrors);
  const [listOfFile, setListOfFile] = React.useState([]);
  const numericPattern = "^[0-9]*$";

  // funcion para el textArea
  const handleArea = (value, name) => {
    elements[name].value = value
    elements[name].isError = isErrorInElementWithPattern(name, value)
    setElements({ ...elements })
  }

  const handleChangeCheck = (name, event) => {
    isErrorInElementWithPattern(name, event);        
    elements[name].value = event;
    if (elements[name].handler !== undefined) {
      elements[name].handler(event);
    }
    setElements({ ...elements});
    setApiErrors([]);
}

  const handleChangeRadio = (event) => {
    elements[event.target.name].value = event.target.value;
    props.validateChangeInputRadio(elements[event.target.name]);
  };
  const handleChangeAutocompleteV3 = (event) => {
    const nameTarget = event.target.name;
    const valueTarget = event.target.value;
    const textTarget = event.target.text;

    isErrorInElementWithPattern(nameTarget, { id: valueTarget });

    if (
      elements[nameTarget].showSelectAutoComplete ||
      elements[nameTarget].showSelectAutoComplete !== "undefined"
    ) {
      elements[nameTarget].isError =
        valueTarget === null
          ? ""
          : valueTarget?.toString().match(elements[nameTarget].pattern) === null
          ? true
          : false;
      elements[nameTarget].value = {
        id: valueTarget != undefined ? Number(valueTarget) : null,
        name: textTarget,
      };
    }

    if (elements[nameTarget].handler !== undefined) {
      elements[nameTarget].handler(event);
    }
    if(elements[nameTarget].value?.name === '' && elements[nameTarget].value?.id === 0){
      elements[nameTarget].value = null
      // elements[nameTarget].list = null
    }
    elements[nameTarget].data = event.target.data
    setElements({ ...elements });
    setApiErrors([]);
  }; 
  const isValidForm = function () {
    var isValid = true;
    Object.keys(elements).forEach(function (key) {
      elements[key].isError = isErrorInElementWithPattern(
        key,
        elements[key].value
      );
      if (isValid === true) isValid = elements[key].isError ? false : true;
      
    });
    setElements({ ...elements });
    return isValid;
  };

  useEffect(() => {
    setApiErrors(props.apiErrors);
  }, [props.apiErrors]);

  const handleChange = (event) => {
    if( event.target.value?.length > elements[event.target.name].finalRequiredLength){
      return setElements({ ...elements });
    }
    if((event.target.value?.length === 0) && elements[event.target.name].isError && elements[event.target.name].validators[0]==='requireds'){
      elements[event.target.name].value = event.target.value;
      elements[event.target.name].isError = false;
      return setElements({ ...elements });
    }
    if((event.target.value?.length === 0) && elements[event.target.name].validators[0]==='required'){
      elements[event.target.name].value = event.target.value;
      elements[event.target.name].isError = true;    
      if (elements[event.target.name].handler !== undefined) {
        elements[event.target.name].handler(event);
      }
      return setElements({ ...elements });
    }
    if((event.target.value?.length === 0) && elements[event.target.name].validators[0]==='requireds'){
      elements[event.target.name].value = event.target.value;
      elements[event.target.name].isError = false;    
      return setElements({ ...elements });
    }
    if((event.target.value?.length < elements[event.target.name].initialRequiredLength)){
      elements[event.target.name].value = event.target.value;
      elements[event.target.name].isError = true;
      return setElements({ ...elements });
    }

    if (elements[event.target.name].pattern === numericPattern) {
      // Condición a la que se entra si el input tiene un pattern numérico.
      // Validamos si sí cumple con el pattern numérico.
      if (
        event.target.value.toString().match(elements[event.target.name].pattern)
      ) {
        // Si el campo del formulario tiene atributo requiredLength, vamos a impedir
        // que se ingresen más caracteres que los permitidos.
        if (elements[event.target.name].requiredLength) {
          if (
            event.target.value.length <=
            elements[event.target.name].requiredLength
          ) {
            //Aqui vamos a hacer el cambio en el valor del element y a llamar su hook opcional.
            if (elements[event.target.name].useStateHook) {
              elements[event.target.name].useStateHook(event.target.value);
            }
            if (elements[event.target.name].isError) {              
              elements[event.target.name].isError = false;
            }
            elements[event.target.name].value = event.target.value;

            // Handler que solo quiero llamar si se cambia el valor del numerico en el input
            if (elements[event.target.name].additionalHandler !== undefined) {
              elements[event.target.name].additionalHandler(event);
            }
            setElements({ ...elements });

            // Limpiar todos los children de este element.
            if (elements[event.target.name].children) {
              elements[event.target.name].children.forEach((child) => {
                if (elements[child]) {
                  elements[child].value = "";
                  if (elements[child].defaultValue) {
                    elements[child].defaultValue = "";
                  }
                  if (elements[child].disabled) {
                    elements[child].disabled = false;
                  }
                  // elements[child].list = [];
                  if (elements[child].useStateHook) {
                    elements[child].useStateHook("");
                  }
                  // Cambiar key si tiene key value y keys array.
                  if (elements[child].key && elements[child].keys) {
                    if (elements[child].key === elements[child].keys[0]) {
                      elements[child].key = elements[child].keys[1];
                    } else {
                      elements[child].key = elements[child].keys[0];
                    }
                  }
                }
              });
            }
          }
        } else {
          // Si el campo del formulario NO tiene atributo requiredLength, vamos a permitir
          // que se ingresen los caracteres que quieran.
          if (elements[event.target.name].useStateHook) {
            elements[event.target.name].useStateHook(event.target.value);
          }
          if (elements[event.target.name].isError) {
            elements[event.target.name].isError = false;
          }
          elements[event.target.name].value = event.target.value;
          setElements({ ...elements });
        }
      }
    } else {
      isErrorInElementWithPattern(event.target.name, event.target.value);
      if (elements[event.target.name].elementType !== "checkbox") {
        elements[event.target.name].isError =
          (event.target.value === null
            ? ""
            : event.target.value.toString()
          ).match(elements[event.target.name].pattern) === null
            ? true
            : false;
            
        elements[event.target.name].value = event.target.value;

      } else {
        var value = JSON.parse(event.target.value.toLowerCase());
        elements[event.target.name].value =
          value === elements[event.target.name].value ? !value : value;
      }
      if (elements[event.target.name].useStateHook) {
        elements[event.target.name].useStateHook(event.target.value);
      }

      if (elements[event.target.name].elementType === "date") {
        elements[event.target.name].isError = false;
      }
      if (elements[event.target.name].elementType === "time") {
        elements[event.target.name].isError = false;
      }
    }

    if (elements[event.target.name].handler !== undefined) {
      // event.target.index=parseInt(event.currentTarget.dataset.index);
      elements[event.target.name].handler(event);
    }
    setElements({ ...elements });
    setApiErrors([]);
  };

  const handleChangeCustomAutocomplete = (event) => {
    if (elements[event.target.elementName].handler) {
      elements[event.target.elementName].handler(event);
    }
    let value = event.target.value;
    if (value !== null) {
      if (elements[event.target.elementName].isError) {
        elements[event.target.elementName].isError = false;
      }
      value = Number(value);
    } else {
      value = "";
    }
    if (elements[event.target.elementName].useStateHook) {
      elements[event.target.elementName].useStateHook(value);
    }
    elements[event.target.elementName].value = value;

    if (elements[event.target.elementName].children) {
      elements[event.target.elementName].children.forEach((child) => {
        if (elements[child]) {
          elements[child].value = "";
          elements[child].list = [];
          if (elements[child].useStateHook) {
            elements[child].useStateHook("");
          }
          if (elements[child].key === elements[child].keys[0]) {
            elements[child].key = elements[child].keys[1];
          } else {
            elements[child].key = elements[child].keys[0];
          }
        }
      });
    }
    setElements({ ...elements });
  };

  const handleChangeCheckboxList = (event) => {
    if (elements[event.target.elementName].handler) {
      elements[event.target.elementName].handler(event);
    }
    let checkedBoxes = 0;
    elements[event.target.elementName].list.forEach((option) => {
      if (option.id === event.target.name) {
        option.checked = event.target.checked;
      }
      if (option.checked) {
        checkedBoxes++;
      }
    });
    elements[event.target.elementName].checkedBoxesCounter = checkedBoxes;
    if (checkedBoxes < elements[event.target.elementName].requiredChecks) {
      elements[event.target.elementName].isError = true;
    } else {
      elements[event.target.elementName].isError = false;
    }
    setElements({ ...elements });
    if (elements[event.target.elementName].useStateHook) {
      elements[event.target.elementName].useStateHook(
        elements[event.target.elementName].list
      );
    }
    setElements({ ...elements });
  };

  const handleChangeAutocompleteV2 = (event) => {
    const nameTarget = event.target.name;
    const valueTarget = event.target.value;
    const textTarget = event.target.text;

    isErrorInElementWithPattern(nameTarget, { id: valueTarget });

    if (
      elements[nameTarget].showSelectAutoComplete ||
      elements[nameTarget].showSelectAutoComplete !== "undefined"
    ) {
      elements[nameTarget].isError =
        valueTarget === null
          ? ""
          : valueTarget?.toString().match(elements[nameTarget].pattern) === null
          ? true
          : false;
      elements[nameTarget].value = {
        id: valueTarget != undefined ? Number(valueTarget) : null,
        name: textTarget,
      };
    }

    if (elements[nameTarget].handler !== undefined) {
      elements[nameTarget].handler(event);
    }
    if(elements[nameTarget].value?.name === '' && elements[nameTarget].value?.id === 0){
      elements[nameTarget].value = null
      // elements[nameTarget].list = null
    }
    setElements({ ...elements });
    setApiErrors([]);
  };
  const handleChangeFile = async (event) => {
    if (elements[event.target.name].elementType === "file") {

        // get the file currently selected
        const currentFile = event.target.files[0];
        const nameTarget = event.target.name;

        // get the validators of the input file
        const { required, size } = elements[nameTarget].validators;

        // change the values of the file
        elements[nameTarget].isError = false;
        elements[nameTarget].errorMessages = "";
        elements[nameTarget].value = "";

        const oneMegaInBytes = 1048576;

        const existOfTheList = validateExistFileOnList(currentFile, elements[nameTarget].idelement);
        if (existOfTheList?.returnType) {
            elements[nameTarget].isError = true;
            const messageError = `El archivo ${currentFile.name} ya ha sido adjuntado en ${existOfTheList?.nameOnTheList?.label}`;
            elements[nameTarget].errorMessages = messageError;
            setElements({ ...elements });
            return;
        }

        // if the file is not required and No file currently selected for upload'
        if (!required && !currentFile) {
            setElements({ ...elements });
            return;
        }

        // if the file is required and no file currently selected for upload
        if (required && !currentFile) {
            elements[nameTarget].isError = true;
            elements[nameTarget].errorMessages = "Por favor debe adjuntar lo solicitado";
            setElements({ ...elements });
            return;
        }

        const isValidFileType = validateFileType(currentFile, elements[nameTarget])
        if (!isValidFileType) {
            elements[nameTarget].isError = true;
            elements[nameTarget].errorMessages = `Solo de aceptan documentos con extension ${elements[nameTarget].accept}`;
            setElements({ ...elements });
            return;
        }

        const isValidFileSize = validateFileSize(currentFile, size, oneMegaInBytes);
        if (isValidFileSize) {
            elements[nameTarget].isError = true;
            const messageError = `Su archivo pesa ${(currentFile.size / oneMegaInBytes).toFixed(2)} MB y solo se aceptan archivos de ${size}`;
            elements[nameTarget].errorMessages = messageError;
            setElements({ ...elements });
            return;
        }
        const fileInBase64 = await convertBase64(currentFile);
        elements[nameTarget].value = functions.splitBase64(fileInBase64);
        
        elements[nameTarget].base64Complete = fileInBase64;
        if (elements[nameTarget].handler !== undefined) {
          elements[nameTarget].handler(elements[nameTarget]);
        }
        setElements({ ...elements });
        setApiErrors([]);
    }
}
    /** FUNCTION TO VALIDATE FILE TYPE
    * description fucntion to validate file type
    * params
    *   currentFile = currentFile is the file currently selected,
    *   element = is the input file of the form
    */
     const validateFileType = (currentFile, element) => {
      const fileAccept = element.accept ? element.accept.split(', ') : [];
      const fileType = currentFile.name.split('.').reverse()[0];
      return fileAccept.includes(`.${fileType}`);
  }

  /** FUNCTION TO VALIDATE FILE SIZE
  * description fucntion to validate file size
  * params
  *   currentFile = currentFile is the file currently selected,
  *   sizeAccepted = is the size accepted of the file in MB
  */
  const validateFileSize = (currentFile, sizeAccepted, oneMegaInBytes) => {
      const splitSize = sizeAccepted.split(' ');
      const sizeFile = (splitSize.length === 1) ? oneMegaInBytes : Number(splitSize[0]) * oneMegaInBytes;
      return currentFile.size > sizeFile;
  }

  /** FUNCTION TO VALIDATE FILE EXIST IN THE LIST
  * description fucntion to validate that file no exist in the list
  * params
  *   currentFile = currentFile is the file currently selected,
  *   idElement =  the unique ID of the file
  */
  const validateExistFileOnList = (currentFile, idElement) => {
      // validate that list of file is > 0
      if (listOfFile.length > 0) {
          // validate that current file is null
          if (!currentFile) {
              return existeIDElementOfTheList(idElement, false, undefined);
          }

          // check file name element doesn't exist in file list
          const nameOnTheList = listOfFile.find(item => item.name === currentFile.name);
          if (nameOnTheList) {
              return existeIDElementOfTheList(idElement, true, nameOnTheList);
          }

          // check file id element doesn't exist in file list
          const existIdElementOfTheList = listOfFile.some(item => item.idelement === idElement);
          if (existIdElementOfTheList) {
              const newListOfFile = listOfFile.filter(item => item.idelement !== idElement)
              setListOfFileAction(newListOfFile, currentFile, idElement);
              return false;
          }
          setListOfFileAction(listOfFile, currentFile, idElement);
      }
      setListOfFileAction(listOfFile, currentFile, idElement);
  }

  // Function to set element in file list
  const setListOfFileAction = (newList, currentFile, idElement) => {
      setListOfFile([...newList, { idelement: elements[idElement].idelement, name: currentFile.name, label: elements[idElement].label }])
  }

  // Function to check file id element exist in file list
  const existeIDElementOfTheList = (idElement, returnType, nameOnTheList) => {
      const existOnTheList = listOfFile.some(item => item.idelement === idElement);
      if (existOnTheList) {
          const newListOfFile = listOfFile.filter(item => item.idelement !== idElement)
          setListOfFile(newListOfFile);
          return { returnType, nameOnTheList };
      }
      return { returnType, nameOnTheList };
  }

  /** FUNCTION TO CONVERT FILE TO BASE 64
  * description = Function to convert file to base 64
  * params
  *   file = currentFile is the file currently selected,
  */
  const convertBase64 = (file) => {
      if (file) {
          return new Promise((resolve, reject) => {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = () => { resolve(fileReader.result); };
              fileReader.onerror = (error) => { reject(error); };
          });
      }
  };
  const isErrorInElementWithPattern = (key, value) => {
    let isError = false;
    switch (elements[key].elementType) {
      case "input":
        const isrequired = (elements[key].validators[0] === "required") ? true : false;
        if(!value && isrequired) {
          isError = true;
        }        
        else if((value?.length < elements[key].initialRequiredLength)) {
          isError = true;
        }
        else{
          isError = false;
        } 
        elements[key].value = value; 
        break;
      case "textField":
        const isrequiredtextField = (elements[key].validators[0] === "required") ? true : false;
        if(!value && isrequiredtextField) isError = true;
        else if((value?.length < elements[key].initialRequiredLength)) isError = true;
        else isError = false;
        elements[key].value = value; 
        break;          
      case "inputCustom":
        const isrequiredInputCustom = (elements[key].validators[0] === "required") ? true : false;
        if(!value && isrequiredInputCustom){
          isError = true;
        } 
        else if((value?.length < elements[key].initialRequiredLength)){
          isError = true;
        } 
        else{
          isError = false;
        } 
        elements[key].value = value; 
        break;      
      case "checkbox":
        elements[key].value =
          typeof value === "string" ? JSON.parse(value) : value;
        break;
      case "date":
        if(value){
            isError =
              value === null
                ? true
                : value.getTime() === value.getTime()
                ? false
                : value.toLocaleDateString("es-ES").match(elements[key].pattern) ===
                  null
                ? true
                : false;
            // isError= (value.toLocaleDateString("es-ES").match(elements[key].pattern)===null) ? true : false;
          }else{
            isError = true
          }
          elements[key].value = value;            
        break;
      case "time":
        // isError =
        //   value === null
        //     ? true
        //     : value.getTime() === value.getTime()
        //     ? false
        //     : value.toLocaleDateString("es-ES").match(elements[key].pattern) ===
        //       null
        //     ? true
        //     : false;
        // isError= (value.toLocaleDateString("es-ES").match(elements[key].pattern)===null) ? true : false;
        // elements[key].value = value;
        isError = !value ? true : false;
        elements[key].value = value;
        break;
      case "hidden":
        isError = false;
        elements[key].value = value;
        break;
      case "autocompleteV3":
        isError = !elements[key].pattern
          ? false
          : value != null || value != undefined
          ? value?.id?.toString().match(elements[key].pattern) === null
            ? true
            : false
          : true;
        elements[key].value = value;
        break;          
      case "radio":
        isError = !value ? true : false;
        elements[key].value = value;
        break;
      case "autocomplete":
        isError = !elements[key].pattern
          ? false
          : value.toString().match(elements[key].pattern) === null
          ? true
          : false;
        elements[key].value = value;
        break;
        case "file":
          const isRequired = elements[key].validators?.required;
          isError = (!value && isRequired) ? true : false;
          elements[key].value = value;
          elements[key].errorMessages = "Por favor debe adjuntar lo solicitado";
          break;        
        case "textareaV2":
          // isError = (((value === null ? "" : value.toString()).match(elements[key].pattern)) === null) ? true : false
          isError =
            (value === null ? "" : value.toString()).match(
              elements[key].pattern
            ) === null
              ? true
              : false;
          elements[key].value = value;          
        break;          
      case "autocompleteV2":
        isError = !elements[key].pattern
          ? false
          : value != null || value != undefined
          ? value?.id?.toString().match(elements[key].pattern) === null
            ? true
            : false
          : true;
        elements[key].value = value;
        break;
      case "multiSelect" : 
        isError = !elements[key].pattern
        ? false
        : value != null || value != undefined
        ? value?.id?.toString().match(elements[key].pattern) === null
          ? true
          : false
        : true;
      elements[key].value = value;      
        break;        
      default:
        isError =
          (value === null ? "" : value.toString()).match(
            elements[key].pattern
          ) === null
            ? true
            : false;
        elements[key].value = value;
        break;
    }
    elements[key].isError = isError;
    return isError;
  };

  const handleChangeAutocomplete = (event) => {
    const nameTarget = event.target.name;
    const valueTarget = event.target.value;

    isErrorInElementWithPattern(nameTarget, valueTarget);

    if (
      elements[nameTarget].showSelectAutoComplete ||
      elements[nameTarget].showSelectAutoComplete !== "undefined"
    ) {
      elements[nameTarget].isError =
        valueTarget === null
          ? ""
          : valueTarget.toString().match(elements[nameTarget].pattern) === null
          ? true
          : false;
      elements[nameTarget].value = valueTarget;
    }

    if (elements[nameTarget].handler !== undefined) {
      // event.target.index=parseInt(event.currentTarget.dataset.index);
      elements[nameTarget].handler(event);
    }
    setElements({ ...elements });

    setApiErrors([]);
  };

  const saveAndClean = function () {
    var isValid = isValidForm();
    if (isValid === true) props.saveAndClean(getData(), false);
  };

  const getData = function () {
    var data = {};
    Object.keys(elements).map((key) => (data[key] = elements[key].value));
    return data;
  };

  const saveAndBack = function () {
    var isValid = isValidForm();
    if (isValid === true) props.saveAndBack(getData(), true);
  };

  const getApiErrorByKeyElement = (key) => {
    let data = { message: null, isError: false };
    if (apiErrors === null || apiErrors === undefined || apiErrors.length === 0)
      return data;
    apiErrors.forEach((item) => {
      if (key === item.attribute) {
        data.message = item.message;
        data.isError = true;
      }
    });
    return data;
  };

  const cancelAction = function () {
    Object.keys(elements).forEach((item) => {
      elements[item].isError = false;
      if (elements[item].elementType === "date")
        elements[item].value = new Date();
      else if (elements[item].elementType === "time")
        elements[item].value = new Date();
      else if (elements[item].elementType === "radio")
        elements[item].value = elements[item].value;
      else elements[item].value = "";
      setElements({ ...elements });
    });
  };

  const handleClicBotonCerrar = () => {
    props.BotonCerrar();
    cancelAction();
  };
  let buttonListHtml =
    props.buttonList !== undefined
      ? Object.keys(props.buttonList).map((key) => {
          let item = props.buttonList[key];
          return (
            <>
            {
              (item.variant) ? (              
                <Button
                  name={key}
                  key={key}
                  variant={item.variant}
                  className={classes.buttonVariant}
                  color={item.color}
                  disabled={item.disabled}
                  size={item.size}
                  startIcon={item.icon}
                  onClick={() => {
                    if (item.isCancel) {
                      item.callback();
                      return;
                    }
                    var isValid = isValidForm();
                    if (isValid === true) item.callback(getData(), isValid);
                  }}
                >
                  {props.loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                  {" " + item.label}
                </Button>
              ):(              
                <Button
                  name={key}
                  key={key}
                  disableElevation
                  className={classes.bottonPrincipal}
                  // disabled={true}
                  disabled={item.disabled}
                  size={item.size}
                  startIcon={item.icon}
                  onClick={() => {
                    if (item.isCancel) {
                      item.callback();
                      return;
                    }
                    var isValid = isValidForm();
                    if (isValid === true) item.callback(getData(), isValid);
                  }}
                >
                  {props.loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                  {" " + item.label}
                </Button>
              )
            }
            </>
          );
        })
      : "";

  var htmlControls = Object.keys(elements).map((key) => {
    let messageError = elements[key].errorMessages,
      isError = elements[key].isError;

    let apiErrorOfKey = getApiErrorByKeyElement(key);
    if (apiErrorOfKey.isError) {
      messageError = apiErrorOfKey.message;
      isError = true;
    }
    switch (elements[key].elementType) {
      case "input":
        return (
          <FormControlInput
            key={key}
            type={elements[key].type}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            autoComplete={elements[key].autoComplete}
            // requiredLength={elements[key].requiredLength}
            handleChange={handleChange}
            onChange={
              elements[key].handler !== undefined ? elements[key].handler : null
            }            
            errorMessages={messageError}
            keyPress={elements[key].keyPress}
            disabled={elements[key].disabled}
            showInputControl={elements[key].showInputControl}
            minWidth={elements[key].minWidth}
            // writeUppercase={elements[key].writeUppercase}
          ></FormControlInput>
        );
        case "textField":
          return (
            <FormControlTextField
              key={key}
              type={elements[key].type}
              label={elements[key].label}
              isError={isError}
              name={elements[key].idelement}
              value={elements[key].value}
              size={elements[key].size}
              autoComplete={elements[key].autoComplete}
              // requiredLength={elements[key].requiredLength}
              handleChange={handleChange}
              onChange={
                elements[key].handler !== undefined ? elements[key].handler : null
              }            
              errorMessages={messageError}
              keyPress={elements[key].keyPress}
              disabled={elements[key].disabled}
              showInputControl={elements[key].showInputControl}
              minWidth={elements[key].minWidth}
              // writeUppercase={elements[key].writeUppercase}
            ></FormControlTextField>
          );        
      case "textArea":
        return (
          <FormControlTextArea
            key={key}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            autoComplete={elements[key].autoComplete}
            handleChange={handleChange}
            errorMessages={messageError}
            keyPress={elements[key].keyPress}
            disabled={elements[key].disabled}
            showInputControl={elements[key].showInputControl}
            minWidth={elements[key].minWidth}
            // writeUppercase={elements[key].writeUppercase}
          ></FormControlTextArea>
        );
        case "textareaV2": return (
          <MaxHeightTextarea
              key={key}
              idelement={elements[key].idelement}
              elementType={elements[key].elementType}
              value={elements[key].value}
              label={elements[key].label}
              placeholder={elements[key].placeholder}
              maxLength={elements[key].maxLength}
              handleArea={handleArea}
              isError={isError}
              errorMessages={elements[key].errorMessages}
              disabled={elements[key].disabled}
          />
      )
      case "password":
        return (
          <FormControlPassword
            key={key}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChange}
            keyPress={elements[key].keyPress}
            errorMessages={messageError}
            variant={elements[key].variant}
            minWidth={elements[key].minWidth}
            placeholder={elements[key].placeholder}
            style={elements[key].style}
            showComponent={elements[key].showComponent}
            onChange={
              elements[key].handler !== undefined ? elements[key].handler : null
            }             
          ></FormControlPassword>
        );
        case "inputOutlined":
          return (
            <FormControlInputOutlined
              key={key}
              label={elements[key].label}
              type={elements[key].type}
              isError={isError}
              maxLength={elements[key].maxLengthTwo}
              name={elements[key].idelement}
              value={elements[key].value}
              handleChange={handleChange}
              errorMessages={messageError}
              keyPress={elements[key].keyPress}
              disabled={elements[key].disabled}
              margin={elements[key].margin}
              icon={elements[key].icon}
              minWidth={elements[key].minWidth}
              style={elements[key].style}
              placeholder={elements[key].placeholder}
              onChange={
                elements[key].handler !== undefined ? elements[key].handler : null
              }              
            ></FormControlInputOutlined>
          );        
        case "SketchPickerColor":
          return (
            <SketchPickerColorControl
              key={key}
              label={elements[key].label}
              type={elements[key].type}
              isError={isError}
              maxLength={elements[key].maxLengthTwo}
              name={elements[key].idelement}
              value={elements[key].value}
              handleChange={handleChange}
              getData={elements[key].getData}
              errorMessages={messageError}
              keyPress={elements[key].keyPress}
              disabled={elements[key].disabled}
              margin={elements[key].margin}
              icon={elements[key].icon}
              minWidth={elements[key].minWidth}
              style={elements[key].style}
              placeholder={elements[key].placeholder}
              onChange={
                elements[key].handler !== undefined ? elements[key].handler : null
              }              
            ></SketchPickerColorControl>
          );        
      case "inputCustom":
        return (
          <FormControlInputCustom
            key={key}
            type={elements[key].type}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            autoComplete={elements[key].autoComplete}
            handleChange={handleChange}
            onChange={
              elements[key].handler !== undefined ? elements[key].handler : null
            }  
            errorMessages={messageError}
            keyPress={elements[key].keyPress}
            disabled={elements[key].disabled}
          ></FormControlInputCustom>
        );
      case "dropdown":
        return (
          <Grid className={classes.grid} key={key}>
            <FormControlSelect
              className={classes.select}
              label={elements[key].label}
              isError={isError}
              name={elements[key].idelement}
              value={elements[key].value}
              handleChange={handleChange}
              errorMessages={messageError}
              list={elements[key].list}
              onChange={
                elements[key].handler !== undefined
                  ? elements[key].handler
                  : null
              }
              disabled={elements[key].disabled}
            ></FormControlSelect>
          </Grid>
        );
    case "autocompleteV3":
      return (
        <FormControlSelectAutoCompleteV3
          key={elements[key].idelement}
          className={classes.select}
          label={elements[key].label}
          isError={isError}
          name={elements[key].idelement}
          value={elements[key].value}
          handleChange={handleChangeAutocompleteV3}
          focus={elements[key].focus}
          errorMessages={messageError}
          list={elements[key].list}
          onChange={
            elements[key].handler !== undefined ? elements[key].handler : null
          }
          disabled={elements[key].disabled}
          modified={elements[key].modified}
          position={elements[key].position}
          showSelectAutoComplete={elements[key].showSelectAutoComplete}
          variant={elements[key].variant}
          style={elements[key].style}
          icon={elements[key].icon}
          data={elements[key].data}
        ></FormControlSelectAutoCompleteV3>
      );          
      case "customDropdown":
        return (
          <CustomFormControlSelect
            key={key}
            className={classes.select}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChange}
            errorMessages={messageError}
            list={elements[key].list}
            onChange={
              elements[key].handler !== undefined ? elements[key].handler : null
            }
            disabled={elements[key].disabled}
          ></CustomFormControlSelect>
        );
      case "autocomplete":
        return (
          <FormControlSelectAutocomplete
            key={elements[key].idelement}
            className={classes.select}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChangeAutocomplete}
            errorMessages={messageError}
            list={elements[key].list}
            onChange={
              elements[key].handler !== undefined ? elements[key].handler : null
            }
            disabled={elements[key].disabled}
            modified={elements[key].modified}
            position={elements[key].position}
            showSelectAutoComplete={elements[key].showSelectAutoComplete}
          ></FormControlSelectAutocomplete>
        );
      case "autocompleteV2":
        return (
          <FormControlSelectAutoCompleteV2
            key={elements[key].idelement}
            className={classes.select}
            label={elements[key].label}
            variant={elements[key].variant}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChangeAutocompleteV2}
            focus={elements[key].focus}
            errorMessages={messageError}
            list={elements[key].list}
            onChange={
              elements[key].handler !== undefined ? elements[key].handler : null
            }
            disabled={elements[key].disabled}
            modified={elements[key].modified}
            position={elements[key].position}
            showSelectAutoComplete={elements[key].showSelectAutoComplete}
          ></FormControlSelectAutoCompleteV2>
        );
      case "autoCompleteCheckbox":
        return (
          <FormControlSelectAutoCompleteCheckbox
              key={key} 
              name={elements[key].idelement} 
              options={elements[key].options}
              label={elements[key].label} 
              placeholder={elements[key].placeholder}
              isError={isError} 
              handleChange={handleChangeCheck} 
              focus={elements[key].focus}
              errorMessages={messageError}
              defaultValue={elements[key].defaultValue}
              onChange={
                elements[key].handler !== undefined ? elements[key].handler : null
              }              
          ></FormControlSelectAutoCompleteCheckbox>
        );
      case "list":
        return (
            <ListControl
                elementType={elements[key].elementType}
                data={elements[key].data}
                icon={elements[key].icon}
            ></ListControl>
        );
        case "file": return (
          <Fragment key={key}>
              <FormControlFile
                  key={key}
                  fileWidth={elements[key].fileWidth}
                  label={elements[key].label}
                  name={elements[key].name}
                  multiple={elements[key].multiple}
                  elementType={elements[key].elementType}
                  accept={elements[key].accept}
                  handleChangeFile={handleChangeFile}
                  src={elements[key].src}
                  isError={elements[key].isError}
                  errorMessages={elements[key].errorMessages}
                  showInputFile={elements[key].showInputFile}
                  value={elements[key].value}
                  fileType={elements[key].fileType}
                  onChange={
                    elements[key].handler !== undefined ? elements[key].handler : null
                  }                    
              />
          </Fragment>
      )
      case "showPDF": return (
          <Fragment key={key}>
              <FormControlShowPDF
                  key={key}
                  label={elements[key].label}
                  name={elements[key].name}
                  showInputFile={elements[key].showInputFile}
                  idSolicitud={elements[key].idSolicitud}
                  controller={elements[key].controller}
                  isDPI={elements[key].isDPI}
                  value={elements[key].value}
              />
          </Fragment>
      )        
        case "multiSelect" : 
          return (
            <MultiselectV1
              key={elements[key].idelement}
              elementType={elements[key].elementType}
              className={classes.select}
              label={elements[key].label}
              isError={isError}
              name={elements[key].idelement}
              value={elements[key].value}
              handleChange={handleChangeAutocompleteV2}
              errorMessages={messageError}
              list={elements[key].list}
              onChange={
                elements[key].handler !== undefined ? elements[key].handler : null
              }
              disabled={elements[key].disabled}
              modified={elements[key].modified}
              position={elements[key].position}
              showSelectAutoComplete={elements[key].showSelectAutoComplete}
            />
          )
      case "customAutocomplete":
        return (
          <FormCustomAutoComplete
            className={classes.select}
            key={key}
            autoCompleteKey={elements[key].key}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChangeCustomAutocomplete}
            errorMessages={messageError}
            list={elements[key].list}
            onChange={
              elements[key].handler !== undefined ? elements[key].handler : null
            }
            disabled={elements[key].disabled}
            position={elements[key].position}
          ></FormCustomAutoComplete>
        );
      case "checkbox":
        return (
          <FormControlLabel
            className={classes.checkbox}
            key={key}
            control={
              <Checkbox
                checked={elements[key].value}
                name={elements[key].idelement}
                onChange={handleChange}
                value={elements[key].value}
                color="primary"
              />
            }
            disabled={elements[key].disabled}
            label={elements[key].label}
          />
        );
      case "checkboxList":
        return (
          <FormCheckboxList
            key={key}
            className={classes.select}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChangeCheckboxList}
            errorMessages={messageError}
            list={elements[key].list}
            disabled={elements[key].disabled}
          ></FormCheckboxList>
        );
      case "date":
        return (
          <FormControlDate
            key={key}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChange}
            errorMessages={messageError}
            disabled={elements[key].disabled}
            modified={elements[key].modified}
          ></FormControlDate>
        );
      case "time":
        return (
          <FormControlTime
            key={key}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChange}
            errorMessages={messageError}
            disabled={elements[key].disabled}            
          ></FormControlTime>
        );
      case "title":
        return (
          <div
            style={{ textAlign: elements[key].position }}
            className={classes.title}
            key={elements[key].idelement}
          >
            <Divider /> <strong>{elements[key].title}</strong> <Divider />
          </div>
        );
      case "titleCustom":
        return (
            (elements[key].show) ?
              <div
                style={{
                  color: elements[key].color ? elements[key].color : 'black',
                  fontSize: elements[key].fontSize ? elements[key].fontSize : '',
                  textAlign: elements[key].position, marginTop:'10px', marginBottom: '5px', width: '100%',
                  backgroundColor: elements[key].backgroundColor ? elements[key].backgroundColor : '#E0E0E0'
                }}
                // className={classes.title}
                key={elements[key].idelement}
              >
                <Divider /> <strong>{elements[key].title}</strong> <Divider />
              </div>
            : ''
        );
        case "customTitle": return (
          <div style={{ textAlign: elements[key].position }} className={classes.titleBySignup} key={elements[key].idelement}>
              <strong>{elements[key].title}</strong>
              <Divider variant="middle"/> 
          </div>
      );
      case "label":
        return (
          <div
            style={{
              marginRight: "15px",
              marginLeft: "15px",
              marginTop: "0px",
            }}
          >
            <Chip label={<strong>{elements[key].value} </strong>} />
          </div>
        );
      case "labelCustom":
        return (
          <div
            style={{
              marginRight: "15px",
              marginLeft: "15px",
              marginTop: "0px",
            }}
          >
            <Chip style={{
              color: elements[key].letraColorChip ? elements[key].letraColorChip : 'black',
              fontSize: elements[key].fontSize ? elements[key].fontSize : '17px',
              textAlign: elements[key].position, marginTop:'10px', marginBottom: '5px', width: '100%',
              backgroundColor: elements[key].colorChip ? elements[key].colorChip : '#E0E0E0'
            }}
              label={<strong>{elements[key].value} </strong>} />
          </div>
        );
      case "labelCustomV2":
        return (
          (elements[key].show) ?
            <div
              style={{
                marginRight: "15px",
                marginLeft: "15px",
                marginTop: "0px",
              }}
            >
              <Chip style={{
                color: elements[key].letraColorChip ? elements[key].letraColorChip : 'black',
                fontSize: elements[key].fontSize ? elements[key].fontSize : '17px',
                textAlign: elements[key].position, marginTop:'10px', marginBottom: '5px', width: '100%',
                backgroundColor: elements[key].colorChip ? elements[key].colorChip : '#E0E0E0'
              }}
                label={<strong>{elements[key].value} </strong>} />
            </div> : ''
        );
      case "labelWithTitleAndSubtitle":
        return (
          (elements[key].show) ?
            <div key={elements[key].idelement} style={{backgroundColor:'white', color:'black', padding: '5px', margin: '0px 10px 0px 0px',border:'1px solid black',borderRadius:'10px', boxShadow:'5px 5px #205690', textAlign:'center'}}>
              <span><strong>{elements[key].value?.title}</strong></span><br/>
              <span >{elements[key].value?.value}</span>
            </div>:''
        );
      // case "file":
      //   return (
      //     <Fragment key={key}>
      //       <FormControlFile
      //         key={key}
      //         fileWidth={elements[key].fileWidth}
      //         label={elements[key].label}
      //         name={elements[key].name}
      //         multiple={elements[key].multiple}
      //         elementType={elements[key].elementType}
      //         accept={elements[key].accept}
      //         handleChangeFile={handleChangeFile}
      //         src={elements[key].src}
      //         isError={elements[key].isError}
      //         errorMessages={elements[key].errorMessages}
      //         showInputFile={elements[key].showInputFile}
      //       />
      //     </Fragment>
      //   );
      case "radio":
        return (
          <FormControlInputRadio
            key={key}
            label={elements[key].label}
            idelement={elements[key].idelement}
            value={elements[key].value}
            handleChangeRadio={handleChangeRadio}
            options={elements[key].options}
            isError={elements[key].isError}
            errorMessages={elements[key].errorMessages}
          />
        );
      default:
        return null;
    }
  });
  return (
    <div
      className={
        props.hideInPrintView === true
          ? classes.hideInPrintView + " " + classes.root
          : classes.root
      }
    >
      <div className={classes.formContainer}>{htmlControls}</div>
      {/* <br></br> */}
      {
          props.description && (
              <List>
                  {
                      props.description.map((text, index) => {
                          return (
                              <ListItem style={{padding: '0px'}} key={index}>
                                  <ListItemIcon>
                                      <Send color="primary"/>
                                  </ListItemIcon>
                                  <ListItemText style={{color: 'black'}}
                                      primary={text.name}
                                  />
                              </ListItem>
                          )
                      })                                
                  }
              </List>
          )
      }
      {props.MensajeDatosRequeridos !== "" &&
      props.MensajeDatosRequeridos != null ? (
        <Typography className={classes.pos} color="textSecondary">
          <small className={classes.note}>{props.MensajeDatosRequeridos}</small>
        </Typography>
      ) : (
        ""
      )}
      {props.alertWarningTitle  ? (
        <Container maxWidth="sm">
          <Alert variant="outlined" severity="warning">
            {props.alertWarningTitle}
          </Alert>
        </Container>
      ) : (
        ""
      )}
      {buttonListHtml}
      {props.estaEmpadronado ? (
        <>
          <ColorButton
            // disabled={props.disabled}
            className={classes.bottonNormal}
            variant="contained"
            color="primary"
            onClick={props.BotonPersonlizado2}
          >
            <CheckCircleOutline className={classes.leftIcon} />{" "}
            {props.TituloBotonPersonalizado}
          </ColorButton>
          {props.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      ) : (
        ""
      )}
      {props.BotonPersonlizado ? (
        <>
          <ColorButton
            disabled={props.disabledBotonPersonalizado}
            className={classes.bottonNormal}
            variant="contained"
            color="primary"
            onClick={props.BotonPersonlizado}
          >
            <CheckCircleOutline className={classes.leftIcon} />{" "}
            {props.TituloBotonPersonalizado}
          </ColorButton>
          {props.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      ) : (
        ""
      )}
      {props.BotonRechazarPorCasoEspecial ? (
        <>
          <ColorButton
            disabled={props.disabled}
            className={classes.bottonNormal}
            variant="contained"
            color="primary"
            onClick={props.BotonRechazarPorCasoEspecial}
          >
            <CheckCircleOutline className={classes.leftIcon} /> Enviar a Caso
            Especial
          </ColorButton>
          {props.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      ) : (
        ""
      )}
      {props.BotonProcesar ? (
        <>
          <ColorButton
            disabled={props.disabled}
            className={classes.bottonNormal}
            variant="contained"
            color="primary"
            onClick={props.BotonProcesar}
          >
            <CheckCircleOutline className={classes.leftIcon} /> Procesar
          </ColorButton>
          {props.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      ) : (
        ""
      )}
      {props.BotonAgregarRegistroDeContacto ? (
        <>
          <ColorButton
            disabled={props.disabled}
            className={classes.bottonNormal}
            variant="contained"
            color="primary"
            onClick={props.BotonAgregarRegistroDeContacto}
          >
            <ContactPhone className={classes.leftIcon} /> Agregar Registro de
            Contacto
          </ColorButton>
          {props.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      ) : (
        ""
      )}
      {props.BotonDescargarPDF ? (
        <>
          <ColorButton
            disabled={props.desactivarBotonDescargarPDFConstancia}
            className={classes.bottonNormal}
            variant="contained"
            color="primary"
            onClick={props.BotonDescargarPDF}
          >
            <GetApp className={classes.leftIcon} /> Descargar constancia PDF
          </ColorButton>
          {props.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      ) : (
        ""
      )}
      {props.BotonGenerarPDF ? (
        <>
          <ColorButton
            disabled={props.desactivarBotonDescargarPDFConstancia}
            className={classes.bottonNormal}
            variant="contained"
            color="primary"
            onClick={props.BotonGenerarPDF}
          >
            <GetApp className={classes.leftIcon} /> Generar constancia PDF
          </ColorButton>
          {props.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </>
      ) : (
        ""
      )}
      {props.BotonEnviarCodigo ? (
        <ColorButton
          className={classes.espacioBotones}
          variant="contained"
          color="primary"
          onClick={props.BotonEnviarCodigo}
        >
          <Send className={classes.leftIcon} /> Reenviar código
        </ColorButton>
      ) : (
        ""
      )}
      {props.BotonRegresar ? (
        <Button
          className={classes.bottonNormal}
          disableElevation
          onClick={props.BotonRegresar}
        >
          <NavigateBefore className={classes.leftIcon} /> Regresar
        </Button>
      ) : (
        ""
      )}
      {props.BotonCancelar ? (
        <Button
          disableElevation
          className={classes.bottonNormalCancelar}
          onClick={props.BotonCancelar}
        >
          <CancelIcon className={classes.leftIcon} /> Rechazar
        </Button>
      ) : (
        ""
      )}
      {props.BotonCerrar ? (
        <Button
          disableElevation
          className={classes.bottonNormalCancelar}
          onClick={handleClicBotonCerrar}
        >
          <CancelIcon className={classes.leftIcon} /> Cerrar
        </Button>
      ) : (
        ""
      )}
      {props.BotonSiguiente ? (
        <Button
          disableElevation
          className={classes.bottonNormal}
          onClick={props.BotonCancelar}
        >
          <NavigateNext className={classes.leftIcon} /> Siguiente
        </Button>
      ) : (
        ""
      )}

      <Grid item xs={12}>
        {props.saveAndClean ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={saveAndClean}
          >
            <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
            Guardar y limpiar
          </Button>
        ) : (
          ""
        )}

        {props.saveAndBack ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={saveAndBack}
          >
            <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
            Guardar y regresar
          </Button>
        ) : (
          ""
        )}

        {props.handleShowList ? (
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={props.handleShowList}
          >
            <CancelIcon className={classes.leftIcon} />
            Cancelar
          </Button>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
}
