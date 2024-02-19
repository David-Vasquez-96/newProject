import React, { useState } from 'react';
import {useStyles} from './style';
import { Card, Typography } from '@material-ui/core';

const ComponentCard=(props)=> {
    const classes = useStyles(props)();

    return (
        <div className={classes.listProcessSecondary}>                            
            <Card className={classes.cardPrincipal}>
                <div className={classes.containerImage}>                    
                    <img className={classes.mobileIcon} src={props?.icon} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,192L6.2,186.7C12.3,181,25,171,37,181.3C49.2,192,62,224,74,197.3C86.2,171,98,85,111,80C123.1,75,135,149,148,181.3C160,213,172,203,185,165.3C196.9,128,209,64,222,74.7C233.8,85,246,171,258,197.3C270.8,224,283,192,295,181.3C307.7,171,320,181,332,165.3C344.6,149,357,107,369,90.7C381.5,75,394,85,406,96C418.5,107,431,117,443,149.3C455.4,181,468,235,480,234.7C492.3,235,505,181,517,176C529.2,171,542,213,554,202.7C566.2,192,578,128,591,138.7C603.1,149,615,235,628,266.7C640,299,652,277,665,272C676.9,267,689,277,702,282.7C713.8,288,726,288,738,277.3C750.8,267,763,245,775,234.7C787.7,224,800,224,812,208C824.6,192,837,160,849,122.7C861.5,85,874,43,886,48C898.5,53,911,107,923,144C935.4,181,948,203,960,208C972.3,213,985,203,997,208C1009.2,213,1022,235,1034,240C1046.2,245,1058,235,1071,224C1083.1,213,1095,203,1108,186.7C1120,171,1132,149,1145,128C1156.9,107,1169,85,1182,90.7C1193.8,96,1206,128,1218,133.3C1230.8,139,1243,117,1255,90.7C1267.7,64,1280,32,1292,32C1304.6,32,1317,64,1329,96C1341.5,128,1354,160,1366,181.3C1378.5,203,1391,213,1403,192C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z"></path></svg>
                </div>
                <div className={classes.containerTitle}>                                
                    <Typography className={classes.cardTitle}>{props?.title}</Typography>
                </div>
            </Card>
        </div>
    )
}
export default (ComponentCard);