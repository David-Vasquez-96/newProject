import Swal from 'sweetalert2'
import './SweetAlertStyle.css';

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
const showMessagePersonalizedToast = (typeMessage, title) => {
    Toast.fire({
        icon: typeMessage,
        title: title,        
        customClass: {
            container: 'my-swal',
        }         
      })
}
const showMessagePersonalizedPosition = (typeMessage, title, message, position) => {
    Swal.fire({
        icon: typeMessage,
        title: title,
        text: message,
        position: position,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        customClass: {
            container: 'my-swal',
        }        
      })
}

const showMessageError = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        allowOutsideClick: false
    })
}

const showMessageErrorSimple = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }        
    })
}

const showMessageSuccess = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        //type: "success",
        icon: 'success',
        allowOutsideClick: false
    })
}

const showMessageSuccessSimple = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }        
    })
}

const showMessageWarning = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        //type: "warning",
        icon: 'warning',
        allowOutsideClick: false
    })
}

const showMessageWarningSimple = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }        
    })
}
export {showMessagePersonalizedToast, showMessageError, showMessagePersonalizedPosition, showMessageSuccess, showMessageWarning, showMessageSuccessSimple, showMessageErrorSimple, showMessageWarningSimple }