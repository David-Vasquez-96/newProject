let Timer =(function(){
    let timerObject;
    let callback=null;
    let seconds=0;
    let counter=()=>{
        seconds++;
        //console.log("seconds",seconds);
        if (callback!==undefined && callback!==null) callback(seconds);
    }
    let setCallback=(_callback)=>{callback=_callback }
    let getCallback=()=>{ return callback;};
    let getSeconds=()=>{ return seconds;}
    let reset=()=>{ seconds=0;}
    let start=()=>{
        clearInterval(timerObject);
        timerObject=setInterval(counter,1000);
    }
    let end=()=>{clearInterval(timerObject);}
    return {    "start":start,"end":end, 
                "getSeconds":getSeconds, 
                "reset":reset,
                "setCallback":setCallback,
                "getCallback":getCallback,
                "counter":counter};
})();

export default Timer;
