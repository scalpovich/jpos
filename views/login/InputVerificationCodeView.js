/**
 * Created by liuyandong on 2017/10/28.
 */
import React, {Component} from "react";
import {
    Dimensions,
    Image,
    PixelRatio,
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
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this["state"] = {verificationCode: ["", "", "", ""]};
    }

    back() {
        this["props"]["navigation"]["goBack"]();
    }

    handleVerificationCodeOnChangeText(text) {
        this["setState"]({verificationCode: text});
    }

    handleNextStepOnPress() {
        this["props"]["navigation"]["navigate"]("SetNewPasswordView");
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 message="重置密码"
                                 headerColor="#00AAEE"
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
                                   onChangeText={this.handleVerificationCodeOnChangeText.bind(this)}
                                   placeholder="请输入短信验证码">
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
        borderBottomWidth: pixelWidth,
        borderBottomColor: "gray",
        marginTop: 20
    },
    verificationCodeInput: {
        height: 40,
        width: width - 80,
        fontSize: 18
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