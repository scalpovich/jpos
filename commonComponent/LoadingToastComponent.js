/**
 * Created by liuyandong on 2017/10/21.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Dimensions
} from "react-native";

var window = Dimensions.get("window");
var width = window.width;
var left = (width - 120) / 2;

export default class LoadingToastComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "加载中", left: 20000};
    }

    show(text) {
        var state = {};
        if (text) {
            state["text"] = text;
        }
        state["left"] = left;
        this.setState(state);
    }

    render() {
        return (
            <View style={[styles.loadingToastPanel, styles.justifyContentCenter, styles.alignItemsCenter, {opacity: 0.9, left: this.state.left}]}>
                <ActivityIndicator color="#FFFFFF" size={30}></ActivityIndicator>
                <View>
                    <Text style={{color: "#FFFFFF"}}>{this.state.text}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    loadingToastPanel: {
        width: 120,
        height: 120,
        position: "absolute",
        backgroundColor: "#656565",
        borderRadius: 4
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    alignItemsCenter: {
        alignItems: "center"
    }
});