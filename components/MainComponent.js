/**
 * Created by liuyandong on 2017/9/16.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from "react-native";

var window = Dimensions.get("window");
var width = window.width;
var height = window.height;
var itemWidth = (width - 2) / 3;
var itemHeight = width / 3;

export default class MainComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{height: 150, backgroundColor: "black"}}></View>
                <View style={{height: height - 150}}>
                    <View style={{height: width / 3, flexDirection: "row"}}>
                        <View style={{width: itemWidth + 1, height: itemHeight, borderRightWidth: 1, borderRightColor: "gray"}}></View>
                        <View style={{width: itemWidth + 1, height: itemHeight, borderRightWidth: 1, borderRightColor: "gray"}}></View>
                        <View style={{width: itemWidth + 1, height: itemHeight}}></View>
                    </View>
                    <View style={{height: width / 3, flexDirection: "row"}}>
                        <View style={{width: itemWidth + 1, height: itemHeight, borderRightWidth: 1, borderRightColor: "gray", borderTopWidth: 1, borderTopColor: "gray"}}></View>
                        <View style={{width: itemWidth + 1, height: itemHeight, borderRightWidth: 1, borderRightColor: "gray", borderTopWidth: 1, borderTopColor: "gray"}}></View>
                        <View style={{width: itemWidth, height: itemHeight, borderTopWidth: 1, borderTopColor: "gray", borderBottomWidth: 1, borderBottomColor: "gray"}}></View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});