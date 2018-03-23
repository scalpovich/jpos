/**
 * Created by liuyandong on 2017/10/22.
 */
import Constants from "../constants/Constants";
import {NativeModules} from "react-native";

export default class CommonUtils {
    static initPos() {
        return new Promise((resolve, reject) => {
            NativeModules["CustomNativeModule"]["initPos"]((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
}