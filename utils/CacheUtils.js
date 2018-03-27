/**
 * Created by liuyandong on 2017/10/21.
 */
import {NativeModules} from "react-native";
export default class CacheUtils {
    static obtainAppAuthorities() {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["obtainLastKnownLocation"]((appAuthorities) => {
                resolve(appAuthorities);
            }, (error) => {
                reject(error);
            })
        });
    }

    static obtainUserInfo() {
        return NativeModules["CustomNativeModule"]["obtainUserInfo"]();
    }

    static obtainLastKnownLocation() {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["obtainLastKnownLocation"]((lastKnownLocation) => {
                resolve(lastKnownLocation);
            }, (error) => {
                reject(error);
            })
        });
    }
}