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
var left = (width - 160) / 2;

export default class LoadingToastComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "", left: 20000};
    }

    show(text) {
        this.setState({left: left, text: text});
    }

    showAsync(text) {
        return new Promise((resolve, reject) => {
            var state = {};
            if (text) {
                state["text"] = text;
            }
            state["left"] = left;
            this.setState(state);
            resolve();
        });
    }

    hide() {
        this.setState({left: 20000});
    }

    render() {
        return (
            <View style={[styles.loadingToastPanel, styles.justifyContentCenter, styles.alignItemsCenter, {opacity: 0.9, left: this.state.left, flexDirection: "row"}]}>
                <ActivityIndicator color="#FFFFFF" size={30}></ActivityIndicator>
                <Text style={{color: "#FFFFFF", marginLeft: 10}}>{this.state.text}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    loadingToastPanel: {
        width: 160,
        height: 60,
        position: "absolute",
        backgroundColor: "#3A444E",
        borderRadius: 4
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    alignItemsCenter: {
        alignItems: "center"
    }
});