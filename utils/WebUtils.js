/**
 * Created by liuyandong on 2017/10/21.
 */
import Constants from "../constants/Constants"
import {NativeModules} from "react-native";

const APP_API_SERVICE_URL = "http://192.168.31.200:8080/posapi";
export default class WebUtils {
    static doGet(requestParameters) {
        var options = {
            method: "GET",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
        };
        var requestParameterPairs = [];
        if (requestParameters) {
            for (var key in requestParameters) {
                requestParameterPairs.push(key + "=" + encodeURIComponent(requestParameters[key]));
            }
        }
        var url = "http://192.168.31.200:8888/catering/branch/listBranches?" + requestParameterPairs.join("&");
        return fetch(url, options).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({code: "网络错误！", message: "网络错误！"});
            }
        }).catch((error) => {
            return Promise.reject({code: "网络错误！", message: "网络错误！"})
        });
    }

    static doPost(serviceName, controllerName, actionName, accessToken, requestParameters) {
        var requestParameterPairs = [];
        requestParameterPairs.push("serviceName=" + serviceName);
        requestParameterPairs.push("controllerName=" + controllerName);
        requestParameterPairs.push("actionName=" + actionName);
        if (accessToken) {
            requestParameterPairs.push("access_token=" + accessToken);
        }
        if (requestParameters) {
            var requestParameterPairs = [];
            for (var key in requestParameters) {
                requestParameterPairs.push(key + "=" + encodeURIComponent(requestParameters[key]));
            }
        }
        var options = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
            body: requestParameterPairs.join("&")
        };
        var url = APP_API_SERVICE_URL + Constants.PROXY_DO_POST_URI;
        return fetch(url, options).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({code: "网络错误！", message: "网络错误！"});
            }
        }).catch((error) => {
            return Promise.reject({code: "网络错误！", message: "网络错误！"})
        });
    }

    static doGetSignature(requestParameters) {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["doGetSignature"](requestParameters, (result) => {
                resolve(result);
            },(error) => {
                reject(error);
            });
        });
    }

    static doPostSignature(requestParameters) {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["doPostSignature"](requestParameters, (result) => {
                resolve(result);
            },(error) => {
                reject(error);
            });
        });
    }
}