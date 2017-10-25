/**
 * Created by liuyandong on 2017/10/25.
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

export default class HeaderComponent extends Component {
    render() {
        return (
            <View style={{height: 44, backgroundColor: "red"}}>
                <TouchableOpacity>
                    <Text>返回</Text>
                </TouchableOpacity>
            </View>
        );
    }
}