
import ApiGenericServicesSecurity from 'service/ApiGenericServicesSecurity';

export default class UserChangePasswordRequest extends ApiGenericServicesSecurity{
    constructor(){
        super("userChangePasswordRequest");
    }
    sendCode(sendCode){        return this.customPOSTpublic("sendCode",sendCode);    }
    changePassword(changePassword){        return this.customPOSTpublic("changePassword",changePassword);    }
}