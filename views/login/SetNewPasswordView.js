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

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var pixelWidth = 1 / PixelRatio.get();

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
export default class SetNewPasswordView extends Component {
    back() {
        this["props"]["navigator"]["pop"]();
    }

    handleNextStepOnPress() {
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
                        <Text style={{color: "black", fontSize: 25}}>请设置新密码</Text>
                    </View>
                    <View style={styles.passwordView}>
                        <TextInput style={styles.password} underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({loginName: text})} placeholder="请输入密码"></TextInput>
                    </View>
                    <View style={styles.confirmPasswordView}>
                        <TextInput style={styles.confirmPassword} underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} placeholder="请再次输入密码"></TextInput>
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
    passwordView: {
        marginTop: 20,
        borderBottomWidth: pixelWidth,
        borderBottomColor: "gray"
    },
    password: {
        height: 40,
        width: width - 80,
        fontSize: 18
    },
    confirmPasswordView: {
        marginTop: 20,
        borderBottomWidth: pixelWidth,
        borderBottomColor: "gray"
    },
    confirmPassword: {
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