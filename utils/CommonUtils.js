/**
 * Created by liuyandong on 2017/10/22.
 */
import {DeviceEventEmitter} from "react-native";
import Constants from "../constants/Constants";
export default class CommonUtils {
    static currentComponent = null;
    static appAuthorities = null;
    static weiXinPayResponseListener = null;

    static hasAuthority(serviceName, controllerName, actionName) {
        if (!this.appAuthorities) {
            return false;
        } else {
            return serviceName + "_" + controllerName + "_" + actionName in this.appAuthorities;
        }
    }

    static reject(message) {
        return Promise.reject({code: message, message: message});
    }

    static addListener() {
        if (!this.weiXinPayResponseListener) {
            this.weiXinPayResponseListener = DeviceEventEmitter.addListener("WeiXin_Resp", (resp) => {
                console.log("*************************************************************" + JSON.stringify(resp));
            });
        }
    }

    static removeListener() {
        if (this.weiXinPayResponseListener) {
            this.weiXinPayResponseListener.remove();
            this.weiXinPayResponseListener = null
        }
    }

    static getServiceName(business) {
        let serviceName = null;
        if (business == Constants.BUSINESS_CATERING) {
            serviceName = Constants.SERVICE_NAME_CATERING;
        } else if (business == Constants.BUSINESS_RETAIL) {
            serviceName = Constants.SERVICE_NAME_RETAIL;
        }
        return serviceName;
    }
}