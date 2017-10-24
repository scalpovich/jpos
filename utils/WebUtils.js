/**
 * Created by liuyandong on 2017/10/21.
 */
const APPAPI_SERVICE_URL = "http://www.baicu.com";
export default class WebUtils {
    static doGetAsync(serviceName, controllerName, actionName, requestParameters) {
        var options = {
            method: "GET",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
        };
        var requestParameterPairs = [];
        requestParameterPairs.push("serviceName=" + serviceName);
        requestParameterPairs.push("controllerName=" + controllerName);
        requestParameterPairs.push("actionName=" + actionName);
        if (requestParameters) {
            for (var key in requestParameters) {
                requestParameterPairs.push(key + "=" + requestParameters[key]);
            }
        }
        var url = APPAPI_SERVICE_URL + "proxy/doGet?" + requestParameterPairs.join("&");
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

    static doPostAsync(serviceName, controllerName, actionName, requestParameters) {
        var requestParameterPairs = [];
        requestParameterPairs.push("serviceName=" + serviceName);
        requestParameterPairs.push("controllerName=" + controllerName);
        requestParameterPairs.push("actionName=" + actionName);
        if (requestParameters) {
            var requestParameterPairs = [];
            for (var key in requestParameters) {
                requestParameterPairs.push(key + "=" + requestParameters[key]);
            }
        }
        var options = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
            body: requestParameterPairs.join("&")
        };
        var url = APPAPI_SERVICE_URL + "/proxy/doPost";
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