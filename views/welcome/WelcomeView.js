/**
 * Created by liuyandong on 2017/11/20.
 */
import React, {Component} from "react";
import {
    View,
    StatusBar,
    Platform,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    NativeModules
} from "react-native";
import Swiper from "react-native-swiper";
import CacheUtils from "../../utils/CacheUtils";
import DateFormatUtils from "../../utils/DateFormatUtils";
import DateTimePicker from "react-native-datetime";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;

export default class WelcomeView extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    async startUsing() {
        // this["props"]["navigation"]["navigate"]("LoginView");
        let methodChain = {
            obtainUserInfo: (parameters) => {
                return new Promise((resolve, reject) => {
                    NativeModules["CustomNativeModule"]["obtainUserInfo"]((userInfo) => {
                        let nextFunctionNameAndParameters = {};
                        if (userInfo["loginName"] == "61011888") {
                            nextFunctionNameAndParameters = {functionName: "obtainIpAddress", parameters: parameters};
                        } else {
                            nextFunctionNameAndParameters = {functionName: "obtainAppAuthorities", parameters: parameters};
                        }
                        resolve(nextFunctionNameAndParameters);
                    }, (error) => {
                        reject(error);
                    })
                });
            },
            obtainAppAuthorities: (parameters) => {
                return new Promise((resolve, reject) => {
                    NativeModules["CustomNativeModule"]["obtainAppAuthorities"]((appAuthorities) => {
                        resolve(undefined);
                    }, (error) => {
                        reject(error);
                    })
                });
            },
            obtainIpAddress: (parameters) => {
                return new Promise((resolve, reject) => {
                    NativeModules["CustomNativeModule"]["obtainIpAddress"]((ipAddress) => {
                        resolve(undefined);
                    }, (error) => {
                        reject(error);
                    })
                });
            }
        };

        let nextFunctionNameAndParameters = await methodChain["obtainUserInfo"]({actionName: "login"});
        while (nextFunctionNameAndParameters) {
            nextFunctionNameAndParameters = await methodChain[nextFunctionNameAndParameters["functionName"]](nextFunctionNameAndParameters["parameters"]);
        }
        this["refs"]["dateTimePicker"]["showDatePicker"](new Date(), (date) => {
            alert(DateFormatUtils.formatDate(date));
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {Platform.OS == "android" ? <StatusBar backgroundColor="#41D09B"></StatusBar> : <View style={{height: 20, backgroundColor: "#41D09B"}}></View>}
                <Swiper loop={false}>
                    <View style={{flex: 1, backgroundColor: "red"}}></View>
                    <View style={{flex: 1, backgroundColor: "yellow"}}></View>
                    <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
                        <TouchableOpacity style={styles.startUsingButton} onPress={this.startUsing.bind(this)}>
                            <Text style={styles.startUsingButtonText}>开始使用</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
                <DateTimePicker ref="dateTimePicker"></DateTimePicker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    startUsingButton: {
        width: width - 80,
        height: 40,
        backgroundColor: "#41D09B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        position: "absolute",
        left: 40,
        bottom: 40
    },
    startUsingButtonText: {
        color: "#FFFFFF",
        fontSize: 16
    }
});