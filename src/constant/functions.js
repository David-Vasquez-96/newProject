const isMobile = () => {
  var isMobile =
    /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent
    );
  if (isMobile) return true;
  else return false;
};

const downloadPDFFromStringBase64 = function (data, name) {
  const linkSource = `data:application/pdf;base64,${data}`;
  const downloadLink = document.createElement("a");
  const fileName = name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

const orderArray = function (array, attribute) {
  array.sort(function (a, b) {
    if (a[attribute] < b[attribute]) return -1;
    if (a[attribute] > b[attribute]) return 1;
    return 0;
  });
};

const orderArrayDescent = function (array, attribute) {
  array.sort(function (a, b) {
    if (a[attribute] > b[attribute]) return -1;
    if (a[attribute] < b[attribute]) return 1;
    return 0;
  });
};

//Reinicia los elementos del formulario, sus valores, y
//reinicia sus valores con hooks opcionales.
const clearElementValues = (elementsName, setElements) => {
  let newElements = Object.assign({}, elementsName);
  Object.keys(newElements).map((key) => {
    let element = newElements[key];
    if (element.elementType === "date") {
      // console.log("element:", element);
      const newDate = new Date();
      element.value = newDate;
      element.defaultValue = newDate;
      if (element.useStateHook) {
        element.useStateHook("");
      }
    } else {
      if (!element.hasOwnProperty("defaultValue")) {
        element.value = "";
        if (element.useStateHook) {
          element.useStateHook("");
        }
      }
    }

    if (!element.hasOwnProperty("defaultValue")) {
      if (element.key && element.keys) {
        if (element.key === element.keys[0]) {
          element.key = element.keys[1];
        } else {
          element.key = element.keys[0];
        }
      }
    }

    if (element.isError !== undefined) {
      element.isError = false;
    }
    if (element.enableOnExit != null && element.enableOnExit === true) {
      element.disabled = false;
    }
    if (element.cleanListOnExit != null && element.cleanListOnExit === true) {
      element.list = [];
    }
  });
  setElements(newElements);
};

const clearElementValuesNoDate = (elementsName, setElements) => {
  let newElements = Object.assign({}, elementsName);
  Object.keys(newElements).map((key) => {
    let element = newElements[key];
    if (element.elementType === "date") {     
      element.value = null;
      element.defaultValue = null;
      if (element.useStateHook) {
        element.useStateHook("");
      }
    } else {
      if (!element.hasOwnProperty("defaultValue")) {
        element.value = "";
        if (element.useStateHook) {
          element.useStateHook("");
        }
      }
    }

    if (!element.hasOwnProperty("defaultValue")) {
      if (element.key && element.keys) {
        if (element.key === element.keys[0]) {
          element.key = element.keys[1];
        } else {
          element.key = element.keys[0];
        }
      }
    }

    if (element.isError !== undefined) {
      element.isError = false;
    }
    if (element.enableOnExit != null && element.enableOnExit === true) {
      element.disabled = false;
    }
    if (element.cleanListOnExit != null && element.cleanListOnExit === true) {
      element.list = [];
    }
  });
  setElements(newElements);
};

//Reiniciar solo un element.
const clearElementValue = (elementsName, elementName, setElements) => {
  let newElements = Object.assign({}, elementsName);
  let element = newElements[elementName];
  if (element.elementType === "date") {
    // console.log("element:", element);
    const newDate = new Date();
    element.value = newDate;
    element.defaultValue = newDate;
    if (element.useStateHook) {
      element.useStateHook("");
    }
  } else {
    element.value = "";
    if (element.useStateHook) {
      element.useStateHook("");
    }
  }

  if (element.key && element.keys) {
    if (element.key === element.keys[0]) {
      element.key = element.keys[1];
    } else {
      element.key = element.keys[0];
    }
  }
  if (element.isError !== undefined) {
    element.isError = false;
  }
  if (element.enableOnExit != null && element.enableOnExit === true) {
    element.disabled = false;
  }
  if (element.cleanListOnExit != null && element.cleanListOnExit === true) {
    element.list = [];
  }

  // }
  setElements(newElements);
};

const monthDiff = (d1, d2) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

// Returns true if date passed as param was 6 months ago or longer.
const checkLongerThanSixMonthsFromNow = (fechaInicio) => {
  let ultimaActualizacion = fechaInicio;
  let today = new Date().toISOString().slice(0, 10);
  //Para probar la exactitud de los seis meses.
  let startDate = new Date("2021-02-04");
  const endDate = new Date();
  //Comentar la siguiente línea si quiero probar cuando alguien ya lleva 6 meses o más de
  //haber actualizado por última vez, con una fecha de actualización dummy.
  startDate = new Date(ultimaActualizacion);

  let monthDifference = monthDiff(new Date(startDate), new Date(endDate));
  let startDateDay = startDate.getDate();
  let endDateDay = endDate.getDate();

  if (
    monthDifference > 6 ||
    (monthDifference == 6 && startDateDay <= endDateDay)
  ) {
    // console.log("Última actualización fue hace 6 meses o más.");
    return true;
  } else {
    // console.log("Última actualización fue hace menos de 6 meses.");
    return false;
  }
};

const switchKeysInElements = (elementsName) => {
  let newElements = Object.assign({}, elementsName);
  Object.keys(newElements).map((key) => {
    let element = newElements[key];
    if (element.key && element.keys) {
      if (element.key === element.keys[0]) {
        element.key = element.keys[1];
      } else {
        element.key = element.keys[0];
      }
    }
  });
  // setElements(newElements);
  return newElements;
};

//Itera un arreglo de objetos como los "elements" que mandamos al FormTwoColumns para
//evaluar si un element requerido está vacío o "default", para triggerear su helper text que permite ver
//un texto en color rojo que indica el mensaje de error.
const checkIsEmptyWhenRequiredElement = (elementsName, setElements) => {
	let isAllGood = true;
	let newElements = Object.assign({}, elementsName);
	Object.keys(newElements).map((key) => {
		let element = newElements[key];
		if (element.elementType === "checkboxList") {
			let checkedBoxes = 0;
			element.list.forEach((option) => {
				if (option.checked) {
					checkedBoxes++;
				}
			});
			if (checkedBoxes < element.requiredChecks) {
				element.isError = true;
			} else {
				element.isError = false;
			}
		} else if (element.elementType === "date") {
			if (
				(element.value === null && element.validators[0] === "required") ||
				(element.value === element.defaultValue && element.validators[0] === "required" ) ||
				(element.value === '' && element.validators[0] === "required" ) ||
				(element.value === null && element.validators[0] === "required" ) 
			) {
				element.isError = true;
				isAllGood = false;
			}
			if(element.maxDate){
				if(element.value > element.maxDate){
					element.isError = true;
					isAllGood = false;
				}       
			}
		} else if (element.elementType === "autocompleteV2" || element.elementType === "autocompleteV3") {
			if (
				(element.value === null && element.validators[0] === "required" ) ||
				(element.value === '' && element.validators[0] === "required" ) ||
				(element.value === undefined && element.validators[0] === "required" ) 
			) {
				element.isError = true;
				isAllGood = false;
			}
		} else if (element.elementType === "customTitleBar"){
			isAllGood = true;
		} else if (element.elementType === "separador"){
			isAllGood = true;
		}
		else {
			if (element.value === "" && element.validators[0] === "required") {
				element.isError = true;
				isAllGood = false;
			}
			if (element.requiredLength) {
				if (element.value.length != element.requiredLength) {
					element.isError = true;
					isAllGood = false;
				}
			}
		}
		if(element.isError){
			isAllGood = false
		}
		});

		setElements(newElements);
		return isAllGood;
	};

//le damos formato a las fechas yy-mm-dd
const splitDate = function (date) {
  if (date !== undefined) {
    if (date !== null) {
      var arr1 = date.split("-");
      var arr2 = arr1[2].split("T");
      var fecha = new Date(date);
      // var hora = fecha.getHours();
      // var minutos = fecha.getMinutes();
      // var segundos = fecha.getSeconds();
      //var finalDate = arr1[0] + "-" + arr1[1] + "-" + arr2[0]+'T00:00:00.000Z';
      var finalDate = arr2[0] + "/" + arr1[1] + "/" + arr1[0];
      return finalDate;
    }
  }
};

const dateFormatGeneral = (date, dataToReturn = "") => {
  if (date) {
    if (typeof date == "string") {
      return splitDate(date);
    }

    const start = new Date(`${date?.toDateString()}`);
    const options = { year: "numeric", month: "numeric", day: "2-digit" };
    return start.toLocaleDateString("es-ES", options);
  }
  return dataToReturn;
};

// Aplicamos la diferencia en horario

const aplicarDiferenciaHoraria = function (hora, diferenciaEnHoras) {
  // console.log("hora: ", hora);
  let primerSplit = hora.split(":");
  // console.log("primerSplit:", primerSplit);
  let horaEnNumeros = Number(primerSplit[0]);
  // console.log("horaEnNumeros:", horaEnNumeros);
  let nuevaHoraEnNumeros = horaEnNumeros + Number(diferenciaEnHoras);
  // console.log("nuevaHoraEnNumeros:", nuevaHoraEnNumeros);
  let nuevaHoraEnString = nuevaHoraEnNumeros.toString();
  if (nuevaHoraEnNumeros < 10) {
    nuevaHoraEnString = "0" + nuevaHoraEnString;
  }
  nuevaHoraEnString =
    nuevaHoraEnString + ":" + primerSplit[1] + ":" + primerSplit[2];
  // console.log("nuevaHoraEnString:", nuevaHoraEnString);
  return nuevaHoraEnString;
};

const base64ToFile = (url, filename, mimeType) => {
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename,{type:mimeType});})
  );
}

export const functions = {
  isMobile: isMobile,
  downloadPDFFromStringBase64: downloadPDFFromStringBase64,
  orderArray: orderArray,
  splitDate: splitDate,
  dateFormatGeneral: dateFormatGeneral,
  clearElementValues: clearElementValues,
  clearElementValue: clearElementValue,
  orderArrayDescent: orderArrayDescent,
  checkIsEmptyWhenRequiredElement: checkIsEmptyWhenRequiredElement,
  switchKeysInElements: switchKeysInElements,
  checkLongerThanSixMonthsFromNow: checkLongerThanSixMonthsFromNow,
  aplicarDiferenciaHoraria: aplicarDiferenciaHoraria,
  clearElementValuesNoDate: clearElementValuesNoDate,
  base64ToFile,
};
