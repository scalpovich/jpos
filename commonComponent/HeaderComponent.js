/**
 * Created by liuyandong on 2017/10/25.
 */
import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";

export default class HeaderComponent extends Component {
    render() {
        return (
            <View style={{height: 44, backgroundColor: "#0074FA", justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={{position: "absolute", top: 2, left: 10, height: 40, width: 40, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#FFFFFF"}}>返回</Text>
                </TouchableOpacity>
                <Text style={{color: "#FFFFFF"}}>你好</Text>
                <TouchableOpacity style={{position: "absolute", top: 2, right: 10, height: 40, width: 40, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "#FFFFFF"}}>返回</Text>
                </TouchableOpacity>
            </View>
        );
    }
}