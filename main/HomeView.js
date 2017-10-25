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
    DeviceEventEmitter,
    StatusBar
} from "react-native";
import HeaderComponent from "../commonComponent/HeaderComponent";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var pixelWidth = 1 / PixelRatio.get();

const leftButton = <Text style={{color: "#FFFFFF"}}>返回</Text>;
const rightButton = <Text style={{color: "#FFFFFF"}}>返回</Text>;
export default class HomeView extends Component {
    back() {
        this["props"]["navigator"]["pop"]();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#3A444E"></StatusBar>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 message="总部"
                                 headerColor="#3A444E"
                                 leftButton={leftButton}
                                 rightButton={rightButton}>
                </HeaderComponent>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    }
});