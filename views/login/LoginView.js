/**
 * Created by liuyandong on 2017/9/16.
 */
import React, {Component} from "react";
import {
    DeviceEventEmitter,
    Dimensions,
    NativeModules,
    PixelRatio,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import WebUtils from "../../utils/WebUtils";
import CacheUtils from "../../utils/CacheUtils";
import AuthUtils from "../../utils/AuthUtils";
import PaidSuccessComponent from "../../components/PaidSuccessComponent";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";
import CommonUtils from "../../utils/CommonUtils";
import HomeView from "../main/HomeView";
import ForgetPasswordView from "./ForgetPasswordView";
import RegisterView from "./RegisterView";
import Constants from "../../constants/Constants";
import ApplicationHandler from "../../utils/ApplicationHandler";
import BindElemeView from "../eleme/BindElemeView";

var window = Dimensions.get("window");
var width = window.width;
var pixelWidth = 1 / PixelRatio.get();

export default class LoginView extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.loginName = null;
        this.password = null;
    }

    handlePaidButtonOnPress() {
        var data = null;
        this["refs"]["loadingToastComponent"]["show"]("加载中...");
        /*CacheUtils.obtainUserInfo().then((userInfo) => {
            var weiXinPayUnifiedOrderRequestParameters = {
                tenantId: 7,
                branchId: 7,
                userId: 7,
                notifyUrl: "aa",
                tradeType: "APP",
                body: "afafa",
                outTradeNo: "afafafafafa",
                totalFee: 1,
                spbillCreateIp: "192.168.0.186"
            };
            return WebUtils.doGet("http://192.168.31.200:8082/out/weiXinPay/unifiedOrder", weiXinPayUnifiedOrderRequestParameters);
        }).then((weiXinPayUnifiedOrderResult) => {
            if (!weiXinPayUnifiedOrderResult["successful"]) {
                return CommonUtils.reject(weiXinPayUnifiedOrderResult["error"]);
            }
            data = weiXinPayUnifiedOrderResult["data"];
            return NativeModules["WeiXinNativeModule"]["registerApp"](data["appid"]);
        }).then((registerAppSuccessful) => {
            if (!registerAppSuccessful) {
                return CommonUtils.reject("注册APP失败！");
            }
            return NativeModules["WeiXinNativeModule"]["isWXAppInstalled"]();
        }).then((isInstalled) => {
            if (!isInstalled) {
                return CommonUtils.reject("未安装微信！")
            }
            var sendPayRequestParameters = {
                partnerId: data["partnerid"],
                prepayId: data["prepayid"],
                nonceStr: data["noncestr"],
                timeStamp: data["timestamp"],
                package: data["package"],
                sign: data["sign"]
            };
            return NativeModules["WeiXinNativeModule"]["sendPayRequest"](sendPayRequestParameters);
        }).then((sendPayRequestSuccessful) => {
            if (!sendPayRequestSuccessful) {
                return CommonUtils.reject("支付失败！")
            }
            var weiXinPayResponseListener = DeviceEventEmitter.addListener("Wei_Xin_Pay_Resp", (resp) => {
                weiXinPayResponseListener.remove();
                var errCode = resp["errCode"];
                if (errCode == 0) {
                    this.props.navigator.push({component: PaidSuccessComponent});
                } else if (errCode == -1) {
                    alert("支付失败！");
                } else if (errCode == -2) {

                }
            });
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });*/
    }

    login() {
        this["refs"]["loadingToastComponent"]["show"]("登录中...");
        var loginName = this["loginName"];
        if (!loginName) {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("提示", "确定", "用户名不能为空！");
            return;
        }

        var password = this["password"];
        if (!password) {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("提示", "确定", "密码不能为空！");
            return;
        }
        AuthUtils.login(loginName, password, Constants.LOGIN_MODE_USER).then((result) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["props"]["navigation"]["navigate"]("Tab");
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("提示", "确定", error["message"]);
        });
    }

    obtainLastKnownLocation() {
        this["refs"]["loadingToastComponent"]["show"]("登录中...");
        NativeModules["CustomNativeModule"]["obtainLastKnownLocation"]().then((positionCoordinate) => {
            alert(JSON.stringify(positionCoordinate));
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"], () => {
                this["props"]["navigator"]["push"]({component: HomeView});
            });
        });
    }

    doWeiXinLogin(code) {
        let obtainOAuthAccessTokenRequestParameters = {
            appId: Constants.WEI_XIN_OPEN_PLATFORM_APP_ID,
            code: code
        };
        WebUtils.doGet(Constants.SERVICE_NAME_PLATFORM, "weiXin", "obtainOAuthAccessToken", null, obtainOAuthAccessTokenRequestParameters).then((obtainOAuthAccessTokenResult) => {
            if (!obtainOAuthAccessTokenResult["successful"]) {
                return CommonUtils.reject(obtainOAuthAccessTokenResult["error"]);
            }
            return AuthUtils.login(this["state"]["loginName"], this["state"]["password"], Constants.LOGIN_MODE_WEI_XIN);
        }).then((userInfo) => {
            let appAuthorities = userInfo["appAuthorities"];
            let appAuthorityJsonObject = {};
            let length = appAuthorities.length;
            for (let index = 0; index < length; index++) {
                let appAuthority = appAuthorities[index];
                appAuthorityJsonObject[appAuthority["serviceName"] + "_" + appAuthority["controllerName"] + "_" + appAuthority["actionName"]] = appAuthority;
            }
            CommonUtils.appAuthorities = appAuthorityJsonObject;
            this["refs"]["loadingToastComponent"]["hide"]();
            this["props"]["navigator"]["push"]({component: HomeView});
        }).catch((error) => {
            this["refs"]["alertDialogComponent"]["alert"]("提示", "确定", error["error"]);
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });
    }

    useWeiXinLogin() {
        let sendAuthRequestParameters = {
            scope: "snsapi_userinfo",
            state: "wechat_sdk_demo_test"
        };
        this["refs"]["loadingToastComponent"]["show"]("登录中...");
        NativeModules["WeiXinNativeModule"]["registerApp"](Constants.WEI_XIN_OPEN_PLATFORM_APP_ID).then((registerAppSuccessful) => {
            if (!registerAppSuccessful) {
                return CommonUtils.reject("注册APP失败！")
            }
            return NativeModules["WeiXinNativeModule"]["sendAuthRequest"](sendAuthRequestParameters);
        }).then((sendAuthRequestResult) => {
            if (!sendAuthRequestResult) {
                return CommonUtils.reject("登录失败！")
            }
            var weiXinAuthResponseListener = DeviceEventEmitter.addListener("Wei_Xin_Auth_Resp", (resp) => {
                weiXinAuthResponseListener.remove();
                var errCode = resp["errCode"];
                if (errCode == 0) {
                    this.doWeiXinLogin(resp["code"]);
                } else if (errCode == -1) {
                    this["refs"]["loadingToastComponent"]["hide"]();
                    this["refs"]["alertDialogComponent"]["alert"]("确定", "登录失败！");
                }
            });
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });
    }

    toForgetPasswordView() {
        this["props"]["navigation"]["navigate"]("ForgetPasswordView");
    }

    toRegisterView() {
        this["props"]["navigation"]["navigate"]("RegisterView");
    }

    handleAlipayButtonOnPress() {
        let alipayTradeAppPayRequestParameters = {
            tenantId: 4,
            branchId: 4,
            subject: "subject",
            outTradeNo: "outTradeNobb",
            totalAmount: 0.01,
            productCode: "productCode",
            notifyUrl: "notifyUrl",
            userId: 1
        };
        this["refs"]["loadingToastComponent"]["show"]("加载中...");
        /*WebUtils.doGet("https://check-local.smartpos.top/zd1/ct2/alipay/alipayTradeAppPay", alipayTradeAppPayRequestParameters).then((alipayTradeAppPayResult) => {
            if (!alipayTradeAppPayResult["successful"]) {
                return CommonUtils.reject(alipayTradeAppPayResult["error"]);
            }
            return NativeModules["AlipayNativeModule"]["sendPayRequest"](alipayTradeAppPayResult["data"]);
        }).then((payResult) => {
            alert(payResult);
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });*/
    }

    render() {
        return (
            <View style={[styles.container, styles.justifyContentCenter, styles.alignItemsCenter]}>
                {
                    Platform.OS == "android" ? <StatusBar backgroundColor="#41D09B"></StatusBar> : <View style={{height: 20, backgroundColor: "#41D09B"}}></View>
                }
                <View style={{borderBottomWidth: pixelWidth, borderBottomColor: "gray", flexDirection: "row"}}>
                    <TextInput style={[styles.loginName]}
                               underlineColorAndroid="transparent"
                               keyboardType="numeric"
                               onChangeText={(text) => this.loginName = text}
                               placeholder="请输入账号">
                    </TextInput>
                </View>
                <View style={{borderBottomWidth: pixelWidth, borderBottomColor: "gray", flexDirection: "row"}}>
                    <TextInput style={[styles.password]}
                               underlineColorAndroid="transparent"
                               secureTextEntry={true}
                               onChangeText={(text) => this.password = text}
                               placeholder="请输入密码">
                    </TextInput>
                </View>
                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.login.bind(this)}>
                    <Text style={{color: "#FFFFFF", fontSize: 18}}>登录</Text>
                </TouchableOpacity>
                <View style={{height: 40, width: width - 80, flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity onPress={this.toRegisterView.bind(this)} style={{flex: 1, height: 40, justifyContent: "center"}}>
                        <Text style={{fontSize: 12, color: "#41D09B"}}>立即注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toForgetPasswordView.bind(this)} style={{flex: 1, height: 40, justifyContent: "center", alignItems: "flex-end"}}>
                        <Text style={{fontSize: 12, color: "#41D09B"}}>忘记密码？</Text>
                    </TouchableOpacity>
                </View>
                {/*<TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.handlePaidButtonOnPress.bind(this)}>
                    <Text style={{color: "#FFFFFF", fontSize: 18}}>微信支付</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.handleAlipayButtonOnPress.bind(this)}>
                    <Text style={{color: "#FFFFFF", fontSize: 18}}>支付宝支付</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.obtainLastKnownLocation.bind(this)}>
                    <Text style={{color: "#FFFFFF", fontSize: 18}}>获取位置坐标</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.useWeiXinLogin.bind(this)}>
                    <Text style={{color: "#FFFFFF", fontSize: 18}}>使用微信登录</Text>
                </TouchableOpacity>*/}
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
    loginName: {
        height: 40,
        width: width - 80,
        fontSize: 16
    },
    password: {
        height: 40,
        width: width - 80,
        fontSize: 16
    },
    loginButton: {
        backgroundColor: "#41D09B",
        height: 40,
        width: width - 80,
        borderRadius: 4,
        marginTop: 20
    }
});