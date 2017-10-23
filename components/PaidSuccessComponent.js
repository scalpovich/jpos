/**
 * Created by liuyandong on 2017/10/21.
 */
import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    NativeModules,
    DeviceEventEmitter
} from "react-native";
import WebUtils from "../utils/WebUtils";
import CacheUtils from "../utils/CacheUtils";
import CommonUtils from "../utils/CommonUtils";
import TestComponent from "./TestComponent";
import AlertDialogComponent from "../commonComponent/AlertDialogComponent";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var weiXinPayResponseListener = null;
export default class PaidSuccessComponent extends Component {
    constructor(props) {
        super(props);
    }

    handlePaidButtonOnPress() {
        /*NativeModules["CustomNativeModule"]["login"]("61011888", "e10adc3949ba59abbe56e057f20f883e").then((result) => {
            return CommonUtils.reject("你好")
        }).catch((error) => {
            alert(error["code"])
        })*/
        this["props"]["navigator"]["push"]({component: TestComponent});
        // this["props"]["navigator"].pop();
        /*CacheUtils.findUserInfo().then((userInfo) => {
            return NativeModules["AlipayNativeModule"]["sendPayRequest"](JSON.stringify(userInfo));
        }).then((result) => {
            var alipayResponseListener = DeviceEventEmitter.addListener("Alipay_Resp", (resp) => {
                alipayResponseListener.remove();
            });
        }).catch((error) => {
            alert(error);
        });*/
        // this["refs"]["alertDialogComponent"]["alert"]();
    }

    startOrderService() {
        NativeModules["CustomNativeModule"]["startOrderService"]();
        CommonUtils.addListener();
    }

    stopOrderService() {
        CommonUtils.removeListener();
        NativeModules["CustomNativeModule"]["stopOrderService"]();
    }

    startScanCodeActivity() {
        NativeModules["CustomNativeModule"]["startScanCodeActivity"]();
    }

    render() {
        return (
            <View style={[styles.container, styles.justifyContentCenter, styles.alignItemsCenter]}>
                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.handlePaidButtonOnPress.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>回到支付页面</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.startOrderService.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>启动订单服务</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.stopOrderService.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>停止订单服务</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.startScanCodeActivity.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>打开扫码页面</Text>
                </TouchableOpacity>

                <AlertDialogComponent ref="alertDialogComponent"></AlertDialogComponent>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAF1",
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    alignItemsCenter: {
        alignItems: "center"
    },
    loginButton: {
        backgroundColor: "#00AAEE",
        height: 40,
        width: width - 80,
        borderRadius: 4,
        marginTop: 20
    }
});