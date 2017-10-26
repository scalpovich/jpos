/**
 * Created by liuyandong on 2017/10/25.
 */
import React, {Component} from "react";
import {
    Dimensions,
    Image,
    PixelRatio,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";
import CommonUtils from "../../utils/CommonUtils";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var pixelWidth = 1 / PixelRatio.get();

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
const rightButton = <Image source={require("../../resources/images/common/add.png")}></Image>;
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
                <View style={{flex: 1, backgroundColor: "#00AAEE"}}></View>
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