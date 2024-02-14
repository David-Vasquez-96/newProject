import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useStyles} from './styles';
import Card64Image from '../../card64Image';
import Card64Pdf from '../../cardBase64Pdf';
export default function FormControlFile(props) {
    const classes = useStyles();
    return (
        <Fragment>
            {props?.showInputFile && (
                <>
                    <Grid className={props.fileWidth ? classes.rootFileWithWidth : classes.rootFile} >
                        <Grid item className={classes.containerInput} >
                            <Typography className={classes.titleFile}> {props.label} </Typography>
                            <input
                                name={props.name}
                                multiple={props.multiple}
                                className={props.fileWidth ? classes.designButtonFileWidth : classes.designButtonFile}
                                type={props.elementType}
                                accept={props.accept}
                                onChange={props.handleChangeFile}
                            />
                             {(props.isError) ? <FormHelperText className={classes.errorMessagesFile} id="component-error-text">{props.errorMessages}</FormHelperText> : null }
                        </Grid>
                        {props.fileWidth && (
                            <Grid item className={classes.containerImg} >
                                    {props.fileType === 'pdf' ? (
                                        <Card64Pdf label={props.label} pdf={props.value} title={props.name} showDownloadButton={false}  src={props.src} showTitle={false} />
                                    ) : (
                                        <Card64Image label={props.label} image={props.value} title={props.name}  src={props.src} showTitle={false}/>
                                    )}
                            </Grid>
                        )}
                    </Grid>
                </>
            )}
        </Fragment>
    )
}

FormControlFile.defaultProps = {
    showInputFile: true,
    fileType : 'pdf'
}