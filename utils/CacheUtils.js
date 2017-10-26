/**
 * Created by liuyandong on 2017/10/21.
 */
import {NativeModules} from "react-native";
export default class CacheUtils {
    static findUserInfo() {
        return NativeModules["CustomNativeModule"]["findUserInfo"]();
    }

    static findAppAuthorities() {
        return NativeModules["CustomNativeModule"]["findAppAuthorities"]();
    }
}