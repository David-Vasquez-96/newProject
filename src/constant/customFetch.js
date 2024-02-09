
import ApiServices from "service/ApiServices";

export const customCreateRegisterReport = async ({controller, action, data}) => {
    try {
      //  const hasPermission = await ApiServices.userSecurity.hasPermission(controller, action);

       // if(hasPermission.error) return {error: hasPermission.error, type: 1, };

        const response = await ApiServices[controller].createRegisterReport(action, data);

        if(response.error) return {error: response.error, type: 2 }

        return {response};

    } catch (error){
        return {error, type: 2, }
    }
}
