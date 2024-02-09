import React, { useEffect, useCallback } from "react";
import clsx from "clsx";
import {
  Icon,
  Grid,
  Button,
  CircularProgress,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  Send,
  NavigateBefore,
  NavigateNext,
  CheckCircleOutline,
} from "@material-ui/icons/";
import KeyboardArrowRightTwoToneIcon from "@material-ui/icons/KeyboardArrowRightTwoTone";
import FormControlInput from "component/Form/InputControl";
import FormControlInputOutlined from "component/Form/InputControlOutlined";
import FormControlPassword from "component/Form/PasswordControl";
import FormControlSelect from "component/Form/SelectControl";
import FormControlSelectAutoCompleteV2 from "component/Form/autoComplete";
import CustomFormControlSelect from "component/Form/CustomSelectControl";
import FormControlSelectAutocomplete from "component/Form/SelectControlAutoComplete";
import FormCustomAutoComplete from "component/Form/CustomAutoComplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControlInputRadio from "component/RadioButton";
import FormControlDate from "component/Form/DateControl";
import Checkbox from "@material-ui/core/Checkbox";
import { useStyles } from "./style";
import { withStyles } from "@material-ui/core/styles";
import FormControlSelectAutoCompleteV3 from 'component/Form/autoCompleteEstable'

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
  const numericPattern = "^[0-9]*$";
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
        // elements[event.target.name].isError= ((event.target.value.toString().match(elements[event.target.name].pattern))===null) ? true : false;
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

  const handleChangeRadio = (event) => {
    elements[event.target.name].value = event.target.value;
    props.validateChangeInputRadio(elements[event.target.name]);
  };

  const handleChangeAutocomplete = (event) => {
    const nameTarget = event.target.name;
    const valueTarget = event.target.value;

    isErrorInElementWithPattern(nameTarget, valueTarget);

    if (elements[nameTarget].elementType !== "checkbox") {
      elements[nameTarget].isError =
        (valueTarget === null ? "" : valueTarget.toString()).match(
          elements[nameTarget].pattern
        ) === null
          ? true
          : false;
      // elements[nameTarget].isError= ((valueTarget.toString().match(elements[nameTarget].pattern))===null) ? true : false;
      elements[nameTarget].value = valueTarget;
    } else {
      var value = JSON.parse(valueTarget.toLowerCase());
      elements[nameTarget].value =
        value === elements[nameTarget].value ? !value : value;
    }

    if (elements[nameTarget].handler !== undefined) {
      // event.target.index=parseInt(event.currentTarget.dataset.index);
      elements[nameTarget].handler(event);
    }

    setElements({ ...elements });

    setApiErrors([]);
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

    setElements({ ...elements });
    setApiErrors([]);
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

  const isErrorInElementWithPattern = (key, value) => {
    let isError = false;
    switch (elements[key].elementType) {
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
                className={item.style}
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
            label={elements[key].label}
            isError={isError}
            maxLength={elements[key].maxLengthTwo}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChange}
            errorMessages={messageError}
            keyPress={elements[key].keyPress}
            disabled={elements[key].disabled}
            margin={elements[key].margin}
          ></FormControlInput>
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
          ></FormControlInputOutlined>
        );
      case "customInput":
        return (
          <FormControlInput
            key={key}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={elements[key].onChange}
            errorMessages={messageError}
            this={elements[key]["this"]}
            keyPress={elements[key].keyPress}
            disabled={elements[key].disabled}
          // handleChange ={elements[key].onChange}
          ></FormControlInput>
        );
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
          ></FormControlPassword>
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
      case "autocompleteV2":
        return (
          <FormControlSelectAutoCompleteV2
            key={elements[key].idelement}
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
          ></FormControlSelectAutoCompleteV2>
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
              icon={elements[key].icon}
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
            key={key}
            className={classes.select}
            label={elements[key].label}
            isError={isError}
            includeHelperText={props.includeHelperText}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChangeAutocomplete}
            errorMessages={messageError}
            list={elements[key].list}
            onChange={
              elements[key].handler !== undefined
                ? elements[key].handler
                : null
            }
            disabled={elements[key].disabled}
            position={elements[key].position}
            variant={elements[key].variant}
          ></FormControlSelectAutocomplete>
        );
      case "customAutocomplete":
        return (
          <FormCustomAutoComplete
            className={classes.select}
            key={key}
            autoCompleteKey={elements[key].key}
            disabled={elements[key].disabled}
            defaultValue={elements[key].defaultValue}
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
          ></FormControlLabel>
        );
      case "date":
        return (
          <FormControlDate
            key={key}
            maxDate={elements[key].maxDate}
            label={elements[key].label}
            isError={isError}
            name={elements[key].idelement}
            value={elements[key].value}
            handleChange={handleChange}
            errorMessages={messageError}
            disabled={elements[key].disabled}
            margin={elements[key].margin}
            inputVariant={elements[key].inputVariant}
          ></FormControlDate>
        );
      case "title": return (
          <div style={{ textAlign: elements[key].position }} className={classes.title} key={elements[key].idelement}>
              <Divider /> <strong>{elements[key].title}</strong> <Divider />
          </div>
      );
      case "customTitle": return (
          <div style={{ textAlign: elements[key].position }} className={classes.titleBySignup} key={elements[key].idelement}>
              <strong>{elements[key].title}</strong>
              <Divider variant="middle"/> 
          </div>
      );
      case "customTitleBar": return (
          <div style={{ textAlign: elements[key].position }} className={classes.customTitleBar} key={elements[key].idelement}>
              <strong>{elements[key].title}</strong>
          </div>
      );
      case "separador": return (
          <div style={{ textAlign: elements[key].position, width: '100%', }} className={classes.section} key={elements[key].idelement}></div>
      );
      case "radio":
        return (
          <FormControlInputRadio
            key={key}
            elementKey={elements[key].key}
            label={elements[key].label}
            idelement={elements[key].idelement}
            value={elements[key].value}
            handleChangeRadio={handleChangeRadio}
            options={elements[key].options}
            disabled={elements[key].disabled}
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
      {htmlControls}
      <br></br>
      {
          props.description && (
              <List>
                  {
                      props.description.map((text, index) => {
                          return (
                              <ListItem style={{padding: '0px'}}>
                                  <ListItemIcon>
                                      <Send color="primary"/>
                                  </ListItemIcon>
                                  <ListItemText className={classes.listItemText}
                                      primary={text.name}
                                  />
                              </ListItem>
                          )
                      })                                
                  }
              </List>
          )
      }
      {buttonListHtml}
      {props.BotonEnviarCodigo ? (
        <Button
          variant = 'outlined'
          color = 'primary'
          className={classes.bottonEnviarCodigo}
          onClick={props.BotonEnviarCodigo}
        >
          <Send className={classes.leftIcon} /> Reenviar código
        </Button>
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
          variant = "outlined"
          color = 'secondary'
          disableElevation
          className={classes.bottonNormalCancelar}
          onClick={props.BotonCancelar}
        >
          <CancelIcon className={classes.leftIcon} /> Cancelar
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
