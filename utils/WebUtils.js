/**
 * Created by liuyandong on 2017/10/21.
 */
import Constants from "../constants/Constants"
const APP_API_SERVICE_URL = "http://192.168.31.200:8989";
export default class WebUtils {
    static doGetAsync(serviceName, controllerName, actionName, accessToken, requestParameters) {
        var options = {
            method: "GET",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
        };
        var requestParameterPairs = [];
        requestParameterPairs.push("serviceName=" + serviceName);
        requestParameterPairs.push("controllerName=" + controllerName);
        requestParameterPairs.push("actionName=" + actionName);
        if (accessToken) {
            requestParameterPairs.push("access_token=" + accessToken);
        }
        if (requestParameters) {
            for (var key in requestParameters) {
                requestParameterPairs.push(key + "=" + JSON.stringify(requestParameters[key]));
            }
        }
        var url = APP_API_SERVICE_URL + Constants.PROXY_DO_GET_URI + "?" + requestParameterPairs.join("&");
        console.log(url)
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

    static doPostAsync(serviceName, controllerName, actionName, accessToken, requestParameters) {
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
                requestParameterPairs.push(key + "=" + JSON.stringify(requestParameters[key]));
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

    static doGet(url, requestParameters) {
        var options = {
            method: "GET",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
        };
        if (requestParameters) {
            var requestParameterPairs = [];
            for (var key in requestParameters) {
                requestParameterPairs.push(key + "=" + requestParameters[key]);
            }
            url = url + "?" + requestParameterPairs.join("&");
        }
        console.log(url)
        return fetch(url, options).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({code: "网络错误！", message: "网络错误！"});
            }
        }).catch((error) => {
            return Promise.reject({code: "网络错误！", message: "网络错误！"});
        });
    }

    static doPost(url, requestParameters) {
        var options = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
        };
        if (requestParameters) {
            var requestParameterPairs = [];
            for (var key in requestParameters) {
                requestParameterPairs.push(key + "=" + requestParameters[key]);
            }
            options["body"] = requestParameterPairs.join("&");
        }
        return fetch(url, options).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({code: "网络错误！", message: "网络错误！"});
            }
        }).catch((error) => {
            return Promise.reject({code: "网络错误！", message: "网络错误！"});
        });
    }
}