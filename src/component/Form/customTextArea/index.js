import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {InputLabel} from '@material-ui/core/';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useStyles } from './style';

export default function MaxHeightTextarea(props) {

    const classes = useStyles();
    return (
      <div className={classes.div}>   
        <InputLabel className={classes.label}>{props.label}</InputLabel>
        <TextareaAutosize className={props.isError?classes.areaError:classes.area}
          maxRows={props.maxRows?props.maxRows:2}
          aria-label={props.label?props.label:""}
          placeholder={props.placeholder?props.placeholder:""}
          defaultValue={props.value?props.value:""}
          maxLength={props.maxLength?props.maxLength:1000}
          onChange={(e)=>props.handleArea(e.target.value, props.idelement)}
          disabled={props.disabled?props.disabled:false}
        />
        {(props.isError) ? <FormHelperText className="Mui-error" id="component-error-text">{props.errorMessages}</FormHelperText> : null }
      </div>
    );
  }