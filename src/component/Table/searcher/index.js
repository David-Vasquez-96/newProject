import React, { useEffect }  from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button, Card, CardContent, Chip, FormControl, Icon, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from "date-fns/locale/es";
import { Alert } from '@material-ui/lab';

const searcherObjectGeneral = { searchFor: "", searchCriteria: '', searchValue: '', searchDateStart: new Date(), searchDateEnd: new Date(), }

function Searcher({searchForAction, searchList, cleanSearchFilter}) {
    const classes = useStyles();
    const [searcherObject, setSearchObject] = React.useState(searcherObjectGeneral);
    const [options, setOptions] = React.useState([]);
    const [selectedSearchList, setSelectedSearchList] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(false);
    const [message, setMessage] = React.useState(false);


    const handleChange =(event) => {
        setSearchObject({ ...searcherObject, [event.target.name]: event.target.value })
    };

    const handleChangeDate =(value, name) => {
        setSearchObject({ ...searcherObject, [name]: value })
    };

    useEffect(() => {
        deleteActionOfTheArray()
    }, [])

    const deleteActionOfTheArray = () => {
        const arrayOptions = searchList.filter( item => item.field !== 'accion');
        setOptions(arrayOptions)
    }

    const handleClick = () => {
        setShowAlert(false);
        let elementSearchList = [];

        const {searchFor, searchCriteria, searchValue, searchDateStart, searchDateEnd} = searcherObject;
        const item = options.find( ({field}) => field === searchFor);

        if(searchCriteria !== 'Entre') {
            if(!searcherObject.searchFor || !searcherObject.searchCriteria || !searcherObject.searchValue) {
                setShowAlert(true);
                setMessage("Todos los campos son requeridos")
                return;
            }
            elementSearchList =  addItemToSelectedSearchList(searchFor, item.title, searchValue, searchCriteria);
        }

        if(searchCriteria === 'Entre') {
            if(!searcherObject.searchFor || !searchDateStart || !searchDateEnd) {
                setShowAlert(true);
                setMessage("Todos los campos son requeridos")
                return;
            }

            const start = new Date(`${searchDateStart.toDateString()} 00: UTC`);
            const end = new Date(`${searchDateEnd.toDateString()} 23:59 UTC`);

            elementSearchList =  [
                ...selectedSearchList,
                { index: selectedSearchList.length + 1, column: {field: searchFor, title: item.title}, value: start, searchCriteria: "MayorIgual", operatorCriteria: 'and'},
                { index: selectedSearchList.length + 2, column: {field: searchFor, title: item.title}, value: end, searchCriteria: "MenorIgual", operatorCriteria: 'or'}
            ];
        }
        
        setSelectedSearchList(elementSearchList);
        setSearchObject(searcherObjectGeneral);
        searchForAction(elementSearchList)
    }

    const addItemToSelectedSearchList = (searchFor, title, searchValue, searchCriteria) => {
        return [...selectedSearchList,
            { index: selectedSearchList.length + 1, column: {field: searchFor, title}, value: searchValue, searchCriteria, operatorCriteria: 'or'}
        ]
    }

    const handleDelete = (key) => {
        setShowAlert(false);
        const elements = selectedSearchList.filter( ({index}) => index !== key);
        setSelectedSearchList(elements);
        setSearchObject(searcherObjectGeneral);
        searchForAction(elements)
    }

    const handleClickClean = () => {
        setSearchObject(searcherObjectGeneral)
        setSelectedSearchList([])
        setShowAlert(false)
        cleanSearchFilter()
    }

    const dateParse = (value, searchCriteria) => {
        if(value && typeof value == 'object') {
            const optionDate = {year: 'numeric', month: 'long', day: '2-digit'};
            // return
            // console.log( value.toLocaleDateString('es-ES', optionDate))
            return value.toLocaleDateString('es-ES', optionDate);
            // const start = new Date(value.toDateString());
            // return `${searchCriteria == 'MayorIgual' ? start.getDate()+ 1 : start.getDate()} ${start.getMonth() + 1}, ${start.getUTCFullYear()}`;
        }
        return value;
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="searchFor">Buscar Por</InputLabel>
                    <Select
                        className={classes.select}
                        labelId="searchFor"
                        id="searchFor"
                        name={"searchFor"}
                        value={searcherObject.searchFor}
                        onChange={handleChange}
                        required
                    >
                        { options?.map( ({field, title}) => (
                            <MenuItem value={field} key={field}>{title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="search-criteria">Criterio de búsqueda</InputLabel>
                    <Select
                        className={classes.select}
                        labelId="search-criteria"
                        id="search-criteria"
                        name={"searchCriteria"}
                        value={searcherObject.searchCriteria}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Contiene">Contiene</MenuItem>
                        <MenuItem value={"Igual"}>Igual</MenuItem>
                        <MenuItem value={"NoIgual"}>No Igual</MenuItem>
                        <MenuItem value={"MayorIgual"}>Mayor Igual</MenuItem>
                        <MenuItem value={"MenorIgual"}>Menor Igual</MenuItem>
                        <MenuItem value={"Entre"}>Rango de Fechas</MenuItem>
                        <MenuItem value={"Mayor"}>Mayor</MenuItem>
                        <MenuItem value={"Menor"}>Menor</MenuItem>
                        <MenuItem value={"Inicia"}>Inicia</MenuItem>
                        <MenuItem value={"Finaliza"}>Finaliza</MenuItem>
                    </Select>
                </FormControl>
                {searcherObject.searchCriteria !== 'Entre' && (
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="standard-adornment-password">Valor de Búsqueda</InputLabel>
                        <Input
                            type={'text'}
                            value={searcherObject.searchValue}
                            onChange={handleChange}
                            variant="outlined"
                            name="searchValue"
                            required
                        />
                    </FormControl>   
                )}
                {searcherObject.searchCriteria === 'Entre' && (
                    <>
                    <FormControl className={classes.formControl} >
                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id={"search-date-start"}
                                name={"searchDateStart"}
                                label={"Fecha de inicio"}
                                value={searcherObject.searchDateStart}
                                onChange={(e) => handleChangeDate(e, "searchDateStart")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>  
                    <FormControl className={classes.formControl} >
                        <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id={"search-date-end"}
                                name={"searchDateEnd"}
                                label={"Fecha final"}
                                value={searcherObject.searchDateEnd}
                                onChange={(e) => handleChangeDate(e, "searchDateEnd")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>  
                    </>
                )}
                <Button className={classes.button} label={"Buscar "} onClick={handleClick}  variant="contained">
                    <Icon className={classes.icon} >search</Icon>
                    Buscar
                </Button>
                <Button className={classes.button} label={"Buscar "} onClick={handleClickClean}  variant="contained" disabled={selectedSearchList.length === 0}>
                    <Icon className={classes.icon} >clear</Icon>
                    Limpiar
                </Button>
            </CardContent>
            <CardContent>
                {selectedSearchList.length > 0  && (
                    <>
                        <Typography  className={classes.marginLeft}>Filtro de búsqueda</Typography>
                        {selectedSearchList.map( ({index, column, value, searchCriteria}) => (
                            <Chip key={index} label={`${column.title} ${searchCriteria} ${dateParse(value, searchCriteria)}`} onDelete={ () => handleDelete(index)} color="primary" />
                        ))}
                    </>
                )}
            </CardContent>
            {showAlert && (
                <CardContent>
                    <Alert className={classes.marginLeft} severity="error">{message}</Alert>
                </CardContent>
            )}
    </Card>
    )
}

export default Searcher
