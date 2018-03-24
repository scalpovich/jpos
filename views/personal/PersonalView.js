/**
 * Created by liuyandong on 2018/3/25.
 */
import React, {Component} from "react";
import {
    View,
    TouchableOpacity,
    Text, StyleSheet,
    Dimensions,
    PixelRatio
} from "react-native";
import AuthUtils from "../../utils/AuthUtils";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";

var window = Dimensions.get("window");
var width = window.width;
var pixelWidth = 1 / PixelRatio.get();

export default class PersonalView extends Component {
    logout() {
        this["refs"]["alertDialogComponent"].confirm("提示", "确定", "取消", "确定退出？", () => {
            AuthUtils.logout().then((result) => {

            })
        });
    }

    render() {
        return (
            <View style={[styles.container, styles.alignItemsCenter]}>
                <View style={{backgroundColor: "#41D09B", height: 140}}></View>
                <TouchableOpacity style={[styles.logoutButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.logout.bind(this)}>
                    <Text style={{color: "#FFFFFF", fontSize: 18}}>退出</Text>
                </TouchableOpacity>
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
    },
    logoutButton: {
        backgroundColor: "#41D09B",
        height: 40,
        width: width - 40,
        borderRadius: 4,
        marginTop: 20
    }
});