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
var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var pixelWidth = 1 / PixelRatio.get();

export default class HomeView extends Component {
    render() {
        return (
            <View style={styles.container}></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00AAEE"
    }
});