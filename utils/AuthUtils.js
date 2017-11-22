/**
 * Created by liuyandong on 2017/11/22.
 */
import {NativeModules} from "react-native";
export default class AuthUtils {
    static login(loginName, password, loginMode) {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["obtainLastKnownLocation"](loginName, password, loginMode, (appAuthorities) => {
                resolve(appAuthorities);
            },(error) => {
                reject(error);
            });
        });
    }

    static logout() {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["logout"]((logoutSuccessful) => {
                resolve(logoutSuccessful);
            },(error) => {
                reject(error);
            });
        });
    }
}