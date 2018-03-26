/**
 * Created by liuyandong on 2018/3/26.
 */
import React, {Component} from "react";
import {StyleSheet, View, WebView, Image} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
export default class AgreementView extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    back() {
        this["props"]["navigation"]["goBack"]();
    }

    renderLoading() {
        console.log("renderLoading")
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 title="服务协议"
                                 headerColor="#41D09B"
                                 leftButton={leftButton}
                                 rightButton={null}>
                </HeaderComponent>
                <WebView source={{uri: "http://192.168.31.200:8090/portal/agreement/index"}} startInLoadingState={true} javaScriptEnabled={true} renderLoading={this.renderLoading.bind(this)}></WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAF1",
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    alignItemsCenter: {
        alignItems: "center"
    }
});