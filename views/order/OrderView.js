import React, {Component} from "react";
import {
    Dimensions,
    Image,
    PixelRatio,
    StatusBar,
    StyleSheet,
    View
} from "react-native";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

import HeaderComponent from "../../commonComponent/HeaderComponent";

export default class OrderView extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent statusBarColor="#41D09B"
                                 headerColor="#41D09B"
                                 title="订单管理"
                                 leftButton={<Image source={require("../../resources/images/common/back.png")}></Image>}
                                 handleLeftButtonOnPress={() => {this["props"]["navigation"]["goBack"]()}}>
                </HeaderComponent>
                <View style={styles.contentWrapper}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: "yellow"
    }
});