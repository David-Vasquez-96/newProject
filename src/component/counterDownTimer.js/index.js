import React, {useEffect, useState} from 'react';
import './stylesCounterDownTimer.css';
function CountDownTimer({DayshoursMinSecs, showDays, showHours, showMinutes, startounterDownTimer, stopCounterDownTimer}) {

  const {days = 0,  hours = 0, minutes = 0, seconds = 0 } = DayshoursMinSecs;
  const [[dys, hrs, mins, secs], setTime] = useState([days, hours, minutes, seconds]);

  const tick = () => {
    if (dys === 0 && hrs === 0 && mins === 0 && secs === 0) {
      stopCounterDownTimer()
      reset();
    } else if (hrs === 0 && mins === 0 && secs === 0){
      setTime([dys - 1, 23, 59, 59]);
    } else if (mins === 0 && secs === 0) {
        setTime([dys, hrs - 1, 59, 59]);
    }
    else if (secs === 0) {
        setTime([dys, hrs, mins - 1, 59]);
    } else {
        setTime([dys, hrs, mins, secs - 1]);
    }

    sessionStorage.setItem('countdown', JSON.stringify({dys, hrs, mins, secs}));
  };

  const reset = () => setTime([parseInt(days), parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    const timer = startCounter();
    return () => clearInterval(timer);
  });

  const startCounter = () => {
    if(startounterDownTimer) {
      const timerId = setInterval(() => tick(), 1000);
      return timerId;
    }
  }

  const padStartTime = (time) => {
    return time.toString().padStart(2, '0');
  }

  return (
    <div className={"AppContador"}>
      {showDays && (
          <div className="containerTime">
            <div  className="time">{`${padStartTime(dys)} `}</div>
            <div className="title">Dias</div>
          </div>
      )}
      {showHours && (
        <div className="containerTime">
          <div  className="time">{`${padStartTime(hrs)} `}</div>
          <div className="title">Horas</div>
        </div>
      )}
      {showMinutes && (
        <div className="containerTime">
            <div className="time">{`${padStartTime(mins)} `}</div>
            <div className="title">Minutos</div>
        </div>
      )}
      <div className="containerTime">
        <div className="time">{`${padStartTime(secs)}`}</div>
        <div className="title">Segundos</div>
      </div>
    </div>
  );
}

CountDownTimer.defaultProps = {
  showDays : false,
  showHours : false,
  showMinutes: false,
}

export default CountDownTimer;