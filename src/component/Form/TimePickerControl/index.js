import "date-fns";
import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/es";
import { useStyles } from "./style";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function FormControlDate(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // props.handleChange({ target: { name: props.name, value: date } });
  };

  return (
    <FormControl className={classes.formControl}>
      <MuiPickersUtilsProvider locale={deLocale} utils={DateFnsUtils}>
        <KeyboardTimePicker
          className={classes.formControl}
          variant="inline"
          // format="dd/MM/yyyy"
          margin="normal"
          id={props.name}
          ampm={false}
          open={false}
          name={props.name}
          key={props.name}
          label={props.label}
          // value={selectedDate}
          value={props.value}
          disabled={props.disabled}
          // onChange={handleDateChange}
          onChange={(date) => {
            props.handleChange({ target: { name: props.name, value: date } });
          }}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          invalidDateMessage={'Formato Inválido'}
        />
      </MuiPickersUtilsProvider>
      {props.isError ? (
        <FormHelperText className="Mui-error" id="component-error-text">
          {props.errorMessages}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
