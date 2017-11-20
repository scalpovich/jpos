/**
 * Created by liuyandong on 2017/11/20.
 */
import React, {Component} from "react";
import {
    View,
    StatusBar,
    Platform,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text
} from "react-native";
import Swiper from "react-native-swiper";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;

export default class WelcomeView extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    startUsing() {
        this["props"]["navigation"]["navigate"]("LoginView");
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {Platform.OS == "android" ? <StatusBar backgroundColor="#41D09B"></StatusBar> : <View style={{height: 20, backgroundColor: "#41D09B"}}></View>}
                <Swiper loop={false}>
                    <View style={{flex: 1, backgroundColor: "red"}}></View>
                    <View style={{flex: 1, backgroundColor: "yellow"}}></View>
                    <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
                        <TouchableOpacity style={styles.startUsingButton} onPress={this.startUsing.bind(this)}>
                            <Text style={styles.startUsingButtonText}>开始使用</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    startUsingButton: {
        width: width - 80,
        height: 40,
        backgroundColor: "#41D09B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        position: "absolute",
        left: 40,
        bottom: 40
    },
    startUsingButtonText: {
        color: "#FFFFFF",
        fontSize: 16
    }
});