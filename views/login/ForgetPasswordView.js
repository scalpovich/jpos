/**
 * Created by liuyandong on 2017/10/28.
 */
import React, {Component} from "react";
import {
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import InputVerificationCodeView from "./InputVerificationCodeView";
import WebUtils from "../../utils/WebUtils";
import CommonUtils from "../../utils/CommonUtils";
import Constants from "../../constants/Constants";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var pixelWidth = 1 / PixelRatio.get();

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
export default class ForgetPasswordView extends Component {
    constructor(props) {
        super(props);
        this["state"] = {phoneNumber: ""};
    }

    back() {
        this["props"]["navigator"]["pop"]();
    }

    handlePhoneNumberOnChangeText(text) {
        this.setState({phoneNumber: text});
    }

    handleNextStepOnPress() {
        var pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        let phoneNumber = this["state"]["phoneNumber"];
        if (!pattern.test(phoneNumber)) {
            this["refs"]["alertDialogComponent"]["alert"]("确定", "请输入正确的手机号码！");
            return;
        }

        this["props"]["navigator"]["push"]({component: InputVerificationCodeView, parameters: {phoneNumber: phoneNumber}});

        /*this["refs"]["loadingToastComponent"]["show"]("加载中...");
        let sendSmsRequestParameters = {
            phoneNumber: this["state"]["phoneNumber"]
        };
        WebUtils.doPostAsync(Constants.SERVICE_NAME_PLATFORM, "sms", "sendSms", null, sendSmsRequestParameters).then((sendSmsResult) => {
            if (!sendSmsResult["successful"]) {
                return CommonUtils.reject(sendSmsResult["error"]);
            }
            this["props"]["navigator"]["push"]({component: CommonUtils});
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]("加载中...");
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });*/
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 message="重置密码"
                                 headerColor="#3A444E"
                                 leftButton={leftButton}
                                 rightButton={null}>
                </HeaderComponent>
                <View style={{flex: 1, alignItems: "center"}}>
                    <View style={{marginTop: 20, marginLeft: 20}}>
                        <Text style={{color: "black", fontSize: 25}}>请输入手机号码</Text>
                    </View>
                    <View style={styles.phoneNumberView}>
                        <TextInput style={[styles.phoneNumberInput]}
                                   underlineColorAndroid="transparent"
                                   autoFocus={true}
                                   keyboardType="numeric"
                                   onChangeText={this.handlePhoneNumberOnChangeText.bind(this)}
                                   placeholder="请输入手机号码">
                        </TextInput>
                    </View>
                    <TouchableOpacity style={[styles.nextStepButton, styles.justifyContentCenter, styles.alignItemsCenter]}
                                      onPress={this.handleNextStepOnPress.bind(this)}>
                        <Text style={{color: "#FFFFFF", fontSize: 18}}>下一步</Text>
                    </TouchableOpacity>
                </View>
                <LoadingToastComponent ref="loadingToastComponent"></LoadingToastComponent>
                <AlertDialogComponent ref="alertDialogComponent"></AlertDialogComponent>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    phoneNumberView: {
        borderBottomWidth: pixelWidth,
        borderBottomColor: "gray",
        marginTop: 20
    },
    phoneNumberInput: {
        height: 40,
        width: width - 80,
        fontSize: 18,
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    alignItemsCenter: {
        alignItems: "center"
    },
    nextStepButton: {
        backgroundColor: "#00AAEE",
        height: 40,
        width: width - 80,
        borderRadius: 4,
        marginTop: 20
    }
});