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
import LoadingToastComponent from "../commonComponent/LoadingToastComponent";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
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

    handleAlipayButtonOnPress() {
        this["refs"]["loadingToastComponent"]["show"]("加载中...");
        return;
        CacheUtils.findUserInfo().then((userInfo) => {
            let alipayTradeAppPayRequestParameters = {
                tenantId: 3,
                branchId: 3,
                subject: "要货单支付",
                outTradeNo: "fffff",
                totalAmount: 0.01,
                productCode: "fafafafa",
                notifyUrl: "aaa",
                userId: 1,
            };
            return WebUtils.doPost("https://check-local.smartpos.top/zd1/ct2/alipay/alipayTradeAppPay", alipayTradeAppPayRequestParameters);
        }).then((alipayTradeAppPayResult) => {
            if (!alipayTradeAppPayResult["successful"]) {
                return CommonUtils.reject(alipayTradeAppPayResult["error"]);
            }
            console.log(alipayTradeAppPayResult["data"]);
            return NativeModules["AlipayNativeModule"]["sendPayRequest"](alipayTradeAppPayResult["data"]);
        }).then((sendPayRequestResult) => {
            if (!sendPayRequestResult) {
                return CommonUtils.reject("支付失败！");
            }
            this["refs"]["loadingToastComponent"]["hide"]();
            var alipayResponseListener = DeviceEventEmitter.addListener("Alipay_Resp", (resp) => {
                console.log("*************************************************************" + JSON.stringify(resp));
                let resultStatus = resp["resultStatus"];
                if (resultStatus == "9000") {
                    // this["refs"]["alertDialogComponent"]["alert"](resp["memo"]);
                } else {
                    this["props"]["navigator"]["pop"]();
                }
                alipayResponseListener.remove();
            });
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });
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

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.handleAlipayButtonOnPress.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>支付宝支付</Text>
                </TouchableOpacity>

                <AlertDialogComponent ref="alertDialogComponent"></AlertDialogComponent>
                <LoadingToastComponent ref="loadingToastComponent"></LoadingToastComponent>
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