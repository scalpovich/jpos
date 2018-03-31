/**
 * Created by liuyandong on 2018/3/25.
 */
import React, {Component} from "react";
import {Dimensions, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AuthUtils from "../../utils/AuthUtils";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";

var window = Dimensions.get("window");
var width = window.width;
var pixelWidth = 1 / PixelRatio.get();

export default class PersonalView extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

    }

    logout() {
        this["refs"]["alertDialogComponent"]["confirm"]("提示", "确定", "取消", "确定退出？", () => {
            AuthUtils.logout().then((result) => {

            }).catch((error) => {
                this["refs"]["alertDialogComponent"]["alert"]("提示", "确定", error["message"]);
            });
        });
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={[{height: 56}, styles.justifyContentCenter]}>
                    <Text style={{fontSize: 25, fontWeight: "bold", color: "black", marginLeft: 16}}>刘艳东</Text>
                </View>
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