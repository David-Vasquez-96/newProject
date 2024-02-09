import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useScrollTrigger, Box, Container, Zoom, Icon } from '@material-ui/core';
import { CssBaseline, AppBar , Toolbar, Typography, Fab, Avatar } from '@material-ui/core';
import FormTemplateMobile from "../FormElementsToMobile";
import AlertDialogMobile from "../FormElementsToMobile/Dialog/index";

import { useStyles } from "./style";

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles(props);
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.rootStyle}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const BackToTop = (props) => {
    const classes = useStyles(props);

    return (
        <React.Fragment>
            <AppBar className={clsx(classes.appBar)}>
                <Toolbar variant = 'regular' className={classes.toolbar}></Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor"/>
            <Container>
                <Box my={2}>
                   <div className={classes.mobileContainer}>
                            <div className={classes.mobileHeaderDiv}>
                                <img alt="LOGO DEL TSE" src="assets/WhiteIcon.svg" className={classes.mobileIcon} />
                                <div className={classes.mobileTitleDivHeader}>Tribunal Supremo Electoral</div>
                            </div>

                            <FormTemplateMobile/>

                        </div>
                    <AlertDialogMobile/>
                </Box>
            </Container>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}

export default BackToTop
// export default connect(mapStateToProps, mapDispatchToProps)(BackToTop)
