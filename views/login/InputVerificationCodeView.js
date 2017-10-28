/**
 * Created by liuyandong on 2017/10/28.
 */
import React, {Component} from "react";
import {
    Dimensions,
    Image,
    PixelRatio,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import SetNewPasswordView from "./SetNewPasswordView";
import WebUtils from "../../utils/WebUtils";
import Constants from "../../constants/Constants";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var pixelWidth = 1 / PixelRatio.get();

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
export default class InputVerificationCodeView extends Component {
    constructor(props) {
        super(props);
        this["state"] = {verificationCode: ["", "", "", ""]};
    }
    back() {
        this["props"]["navigator"]["pop"]();
    }

    handleVerificationCodeOnChangeText(index, text) {
        if (text) {
            switch(index) {
                case 0:
                    this["refs"]["secondVerificationCode"]["focus"]();
                    break;
                case 1:
                    this["refs"]["thirdVerificationCode"]["focus"]();
                    break;
                case 2:
                    this["refs"]["fourthVerificationCode"]["focus"]();
                    break;
            }
        } else {
            switch(index) {
                case 1:
                    this["refs"]["firstVerificationCode"]["focus"]();
                    break;
                case 2:
                    this["refs"]["secondVerificationCode"]["focus"]();
                    break;
                case 3:
                    this["refs"]["thirdVerificationCode"]["focus"]();
                    break;
            }
        }
        let verificationCode = this["state"]["verificationCode"];
        verificationCode[index] = text;
        this["setState"]({verificationCode: verificationCode});
    }

    handleNextStepOnPress() {
        let checkVerificationCodeRequestParameters = {
            phoneNumber: this["props"]["phoneNumber"],
            verificationCode: this["state"]["verificationCode"]["join"]("")
        };
        alert(JSON.stringify(checkVerificationCodeRequestParameters));
        this["refs"]["loadingToastComponent"]["show"]("加载中...");
        WebUtils.doGetAsync(Constants.SERVICE_NAME_PLATFORM, "", "", null, checkVerificationCodeRequestParameters).then((checkVerificationCodeResult) => {
            alert(JSON.stringify(checkVerificationCodeResult));
            this["props"]["navigator"]["push"]({component: SetNewPasswordView});
        }).catch((error) => {
            this["refs"]["loadingToastComponent"]["hide"]();
            this["refs"]["alertDialogComponent"]["alert"]("确定", error["code"]);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#3A444E"></StatusBar>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 message="重置密码"
                                 headerColor="#3A444E"
                                 leftButton={leftButton}
                                 rightButton={null}>
                </HeaderComponent>
                <View style={{flex: 1, alignItems: "center"}}>
                    <View style={{marginTop: 20, marginLeft: 20}}>
                        <Text style={{color: "black", fontSize: 25}}>请输短信验证码</Text>
                    </View>
                    <View style={styles.verificationCodeView}>
                        <TextInput style={[styles.verificationCodeInput]}
                                   underlineColorAndroid="transparent"
                                   autoFocus={true}
                                   keyboardType="numeric"
                                   ref="firstVerificationCode"
                                   maxLength={1}
                                   onChangeText={this.handleVerificationCodeOnChangeText.bind(this, 0)}>
                        </TextInput>
                        <TextInput style={[styles.verificationCodeInput]}
                                   underlineColorAndroid="transparent"
                                   keyboardType="numeric"
                                   ref="secondVerificationCode"
                                   maxLength={1}
                                   onChangeText={this.handleVerificationCodeOnChangeText.bind(this, 1)}>
                        </TextInput>
                        <TextInput style={[styles.verificationCodeInput]}
                                   underlineColorAndroid="transparent"
                                   keyboardType="numeric"
                                   ref="thirdVerificationCode"
                                   maxLength={1}
                                   onChangeText={this.handleVerificationCodeOnChangeText.bind(this, 2)}>
                        </TextInput>
                        <TextInput style={[styles.verificationCodeInput]}
                                   underlineColorAndroid="transparent"
                                   keyboardType="numeric"
                                   ref="fourthVerificationCode"
                                   maxLength={1}
                                   onChangeText={this.handleVerificationCodeOnChangeText.bind(this, 3)}>
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
    verificationCodeView: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        width: width - 80
    },
    verificationCodeInput: {
        height: 40,
        width: (width - 80) * 2 / 11,
        borderWidth: pixelWidth,
        borderColor: "gray",
        fontSize: 18,
        textAlign: "center",
        borderRadius: 4
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