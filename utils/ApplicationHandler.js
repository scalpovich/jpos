/**
 * Created by liuyandong on 2017/10/22.
 */
import {NativeModules} from "react-native";

export default class CommonUtils {
    static initPos(loginName, password) {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["initPos"](loginName, password, (result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
}