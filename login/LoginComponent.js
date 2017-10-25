/**
 * Created by liuyandong on 2017/9/16.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    NativeModules,
    DeviceEventEmitter
} from "react-native";
import WebUtils from "../utils/WebUtils";
import CacheUtils from "../utils/CacheUtils";
import PaidSuccessComponent from "../components/PaidSuccessComponent";
import AlertDialogComponent from "../commonComponent/AlertDialogComponent";
import LoadingToastComponent from "../commonComponent/LoadingToastComponent";
import CommonUtils from "../utils/CommonUtils";
import HomeView from "../main/HomeView";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var pixelWidth = 1 / PixelRatio.get();
var itemWidth = (width - 2 * pixelWidth) / 3;
var itemHeight = (width - 2 * pixelWidth) / 3;

var outTradeNo = "pp";
export default class LoginComponent extends Component {
    componentDidMount() {
        CommonUtils.addListener();
        this.state = {loginName: "", password: ""};
        CommonUtils.setCurrentComponent(this);
    }

    handlePaidButtonOnPress() {
        /*NativeModules["CustomNativeModule"]["login"](this.state.loginName, this.state.password).then((userInfo) => {
            alert(JSON.stringify(userInfo));
        }).catch((error) => {
            alert(JSON.stringify(error));
        })*/
        outTradeNo = outTradeNo + "a"
        var data = null;
        this["refs"]["loadingToastComponent"]["show"]("加载中...");
        CacheUtils.findUserInfo().then((userInfo) => {
            var weiXinPayUnifiedOrderRequestParameters = {
                tenantId: userInfo["tenantId"],
                branchId: userInfo["branchId"],
                userId: userInfo["userId"],
                notifyUrl: "aa",
                tradeType: "APP",
                body: "afafa",
                outTradeNo: outTradeNo,
                totalFee: 1,
                spbillCreateIp: "192.168.0.186"
            };
            return WebUtils.doGet("http://192.168.31.200:8082/out/weiXinPay/unifiedOrder", weiXinPayUnifiedOrderRequestParameters);
        }).then((weiXinPayUnifiedOrderResult) => {
            if (!weiXinPayUnifiedOrderResult["successful"]) {
                return Promise.reject(weiXinPayUnifiedOrderResult["error"]);
            }
            data = weiXinPayUnifiedOrderResult["data"];
            return NativeModules["WeiXinNativeModule"]["registerApp"](data["appid"]);
        }).then((registerAppSuccessful) => {
            if (!registerAppSuccessful) {
                return Promise.reject("注册APP失败！")
            }
            return NativeModules["WeiXinNativeModule"]["isWXAppInstalled"]();
        }).then((isInstalled) => {
            if (!isInstalled) {
                return Promise.reject("未安装微信！");
            }
            var sendPayRequestPayParameters = {
                partnerId: data["partnerid"],
                prepayId: data["prepayid"],
                nonceStr: data["noncestr"],
                timeStamp: data["timestamp"],
                package: data["package"],
                sign: data["sign"]
            };
            return NativeModules["WeiXinNativeModule"]["sendPayRequest"](sendPayRequestPayParameters);
        }).then((sendPayRequestSuccessful) => {
            if (!sendPayRequestSuccessful) {
                return Promise.reject("支付失败！")
            }
            var weiXinPayResponseListener = DeviceEventEmitter.addListener("WeiXin_Resp", (resp) => {
                console.log("*************************************************************" + JSON.stringify(resp))
                if (resp["type"] == "PayReq_Resp") {
                    var errCode = resp["errCode"];
                    if (errCode == 0) {
                        this.props.navigator.push({component: PaidSuccessComponent});
                    } else if (errCode == -1) {
                        alert("支付失败！");
                    } else if (errCode == -2) {

                    }
                    weiXinPayResponseListener.remove();
                }
            });
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["confirm"]("确定", error["code"]);
        });
    }

    login() {
        this["refs"]["loadingToastComponent"]["show"]("登录中...");
        NativeModules["CustomNativeModule"]["login"](this["state"]["loginName"], this["state"]["password"]).then((userInfo) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["props"]["navigator"]["push"]({component: HomeView});
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });
    }

    obtainLastKnownLocation() {
        this["refs"]["loadingToastComponent"]["show"]("登录中...");
        NativeModules["CustomNativeModule"]["obtainLastKnownLocation"]().then((positionCoordinate) => {
            return WebUtils.doGet("http://www.smartpos.top/portal/tenantWebService/showTenantInfo", {loginName: "61011888"});
        }).then((userInfo) => {
            alert(JSON.stringify(userInfo));
            this["refs"]["loadingToastComponent"]["hide"]();
            this["props"]["navigator"]["push"]({component: HomeView});
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });
    }

    render() {
        return (
            <View style={[styles.container, styles.justifyContentCenter, styles.alignItemsCenter]}>
                {/*<View style={{height: 150, backgroundColor: "black"}}></View>
                <View style={{height: height - 150}}>
                    <View style={{height: width / 3, flexDirection: "row"}}>
                        <View style={{width: itemWidth + pixelWidth, height: itemHeight, borderRightWidth: pixelWidth, borderRightColor: "gray"}}></View>
                        <View style={{width: itemWidth + pixelWidth, height: itemHeight, borderRightWidth: pixelWidth, borderRightColor: "gray"}}></View>
                        <View style={{width: itemWidth, height: itemHeight}}></View>
                    </View>
                    <View style={{height: width / 3, flexDirection: "row"}}>
                        <View style={{width: itemWidth + pixelWidth, height: itemHeight, borderRightWidth: pixelWidth, borderRightColor: "gray", borderTopWidth: pixelWidth, borderTopColor: "gray"}}></View>
                        <View style={{width: itemWidth + pixelWidth, height: itemHeight, borderRightWidth: pixelWidth, borderRightColor: "gray", borderTopWidth: pixelWidth, borderTopColor: "gray"}}></View>
                        <View style={{width: itemWidth, height: itemHeight, borderTopWidth: pixelWidth, borderTopColor: "gray", borderBottomWidth: pixelWidth, borderBottomColor: "gray"}}></View>
                    </View>
                </View>*/}
                <View style={{borderBottomWidth: pixelWidth, borderBottomColor: "gray", flexDirection: "row"}}>
                    {/*<Text style={{backgroundColor: "red", height: 40}}>用户名：</Text>*/}
                    <TextInput style={[styles.loginName]} underlineColorAndroid="transparent" keyboardType="numeric" onChangeText={(text) => this.setState({loginName: text})} placeholder="请输入账号"></TextInput>
                </View>
                <View style={{borderBottomWidth: pixelWidth, borderBottomColor: "gray", flexDirection: "row"}}>
                    {/*<Text style={{backgroundColor: "red", height: 40}}>密码：</Text>*/}
                    <TextInput style={[styles.loginName]} underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} placeholder="请输入密码"></TextInput>
                </View>
                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.login.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.handlePaidButtonOnPress.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>支付</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.obtainLastKnownLocation.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>获取位置坐标</Text>
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
    loginName: {
        height: 40,
        width: width - 80
    },
    password: {
        height: 40,
        width: width - 80
    },
    loginButton: {
        backgroundColor: "#00AAEE",
        height: 40,
        width: width - 80,
        borderRadius: 4,
        marginTop: 20
    }
});