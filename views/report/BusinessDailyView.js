import React, {Component} from "react";
import {
    Dimensions, Image,
    PixelRatio,
    StyleSheet,
    View, WebView
} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;

export default class BusinessDailyView extends Component {
    static navigationOptions = {
        header: null
    };

    back() {
        this["refs"]["webView"]["postMessage"](width * PixelRatio.get());
    }

    constructor(props) {
        super(props);
        this["state"] = {loaded: false, uri: null};
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 title="营业日报"
                                 headerColor="#41D09B"
                                 leftButton={leftButton}
                                 rightButton={null}>
                </HeaderComponent>
                <WebView ref="webView" source={{uri: "http://192.168.31.200:8080/o2o/login/login?tenantId=1&branchId=1&type=2"}}></WebView>
                <AlertDialogComponent ref="alertDialogComponent"></AlertDialogComponent>
                <LoadingToastComponent ref="loadingToastComponent"></LoadingToastComponent>
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