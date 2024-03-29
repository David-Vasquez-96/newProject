import ApiServices from 'service/ApiServices';
import { ACCESS_TOKEN, publicMenu } from 'constant/index';

export default class UserAccount{
    constructor(){
        this.email="";
        this.password="";
        this.authenticated=false;
        this.currentUser=null;
        this.menu=[];
        this.isError=false;
        this.errorMessage="";
        this.errors=[];
        this.userConfiguration=null;
    }
    setEmail(_email){ this.email=_email;};
    setPassword(_password){ this.password=_password;};
    getAuthenticated(){ return this.authenticated;};
    getCurrentUser(){ return this.currentUser;};
    getMenu(){ return this.menu; };
    getIsError(){ return this.isError;};
    getErrorMessage(){ return this.errorMessage; };
    getErrors(){return this.errors;};
    getUserConfiguration(){ return this.userConfiguration;};

    async setCurrentUser(){
        const currentUser = await ApiServices.userSecurity.getCurrentUser();
        this.authenticated= true;
        this.currentUser= currentUser;
    }

    async setMenu(){
        this.menu=[];
        const menuResponse = await ApiServices.userSecurity.getUserMenu();
        if (menuResponse.data!=="") this.menu= JSON.parse(menuResponse.data);
        this.menu= [...this.menu, ...publicMenu]
    }

    async login(){
        const loginRequest = Object.assign({}, {"email": this.email, "password": this.password});
        await ApiServices.userSecurity.login(loginRequest)
        .then(async(response) => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            await this.setCurrentUser();
            await this.setMenu();
            //await this.setUserConfiguration();
            this.isError=false;
            this.errorMessage="";
            this.errror=[];
        }).catch(error => {
            this.authenticated= false;
            this.currentUser= null;
            this.menu=[];
            this.isError=true;
            this.errors=error.errors;
            this.errorMessage=(error && error.message) || 'Oops! algo esta mal. Por favor intenta de nuevo!';
        });
    }

    async logout(){
        /* const response = await ApiServices.userSecurity.logout();
            if (response.error === null){
                localStorage.removeItem(ACCESS_TOKEN);
            } */
        localStorage.removeItem(ACCESS_TOKEN);
    }

    async setUserConfiguration(){
        this.userConfiguration=null;
        const userResponse  = await ApiServices.user.findByUserId();
            if (userResponse.error===null){
                if (userResponse.data.length>0)
                    this.userConfiguration=userResponse.data[0];                    
            }
    }
}