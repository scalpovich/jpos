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
        this["props"]["navigator"]["push"]({component: TestComponent});
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
        CacheUtils.obtainUserInfo().then((userInfo) => {
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
            this["refs"]["loadingToastComponent"]["hide"]();
            let resultStatus = sendPayRequestResult["resultStatus"];
            if (resultStatus == "9000") {
                this["props"]["navigator"]["push"]({component: TestComponent});
            } else if (resultStatus == "8000") {
                this["refs"]["alertDialogComponent"]["alert"]("确定", "支付结果确认中！");
            } else {
                this["refs"]["alertDialogComponent"]["alert"]("确定", "支付失败！");
            }
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