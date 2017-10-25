/**
 * Created by liuyandong on 2017/10/25.
 */
import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }
    handleLeftButtonOnPress() {
        let handleLeftButtonOnPress = this["props"]["handleLeftButtonOnPress"];
        handleLeftButtonOnPress && handleLeftButtonOnPress();
    }

    handleRightButtonOnPress() {
        let handleRightButtonOnPress = this["props"]["handleRightButtonOnPress"];
        handleRightButtonOnPress && handleRightButtonOnPress();
    }

    render() {
        return (
            <View style={[styles.headerView, {backgroundColor: this["props"]["headerColor"]}]}>
                <TouchableOpacity style={styles.leftButton} onPress={this.handleLeftButtonOnPress.bind(this)}>
                    {this["props"]["leftButton"]}
                </TouchableOpacity>
                <Text style={styles.message}>{this["props"]["message"]}</Text>
                <TouchableOpacity style={styles.rightButton} onPress={this.handleRightButtonOnPress.bind(this)}>
                    {this["props"]["rightButton"]}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerView: {
        height: 44,
        justifyContent: "center",
        alignItems: "center"
    },
    message: {
        color: "#FFFFFF",
        fontSize: 18
    },
    leftButton: {
        position: "absolute",
        top: 2,
        left: 10,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    rightButton: {
        position: "absolute",
        top: 2,
        right: 10,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center"
    }
});