/**
 * Created by liuyandong on 2017/11/17.
 */
import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    Image,
    Dimensions,
    StatusBar,
    FlatList,
    PixelRatio,
    Platform,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import LoginView from "./views/login/LoginView";
import Swiper from "react-native-swiper";
import {StackNavigator} from "react-navigation";
import ApplicationHandler from "./utils/ApplicationHandler";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = StatusBar.currentHeight;
const pixelWidth = 1 / PixelRatio.get();

class MainComponent extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null
    }

    login() {
        this["props"]["navigation"]["navigate"]("HomeThree");
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {Platform.OS == "android" ? <StatusBar backgroundColor="#41D09B"></StatusBar> : <View style={{height: 20, backgroundColor: "#41D09B"}}></View>}
                <Swiper loop={true} autoplay={true} style={{height: 200}}>
                    <View style={styles.swiperItem}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f0005DL5ZsPBJreEWzsa0.jpg"}}></Image>
                    </View>
                    <View style={{height: 150, backgroundColor: "yellow"}}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f000ckyT6Y8ZgUHgku-06.jpg"}}></Image>
                    </View>
                    <View style={{height: 150, backgroundColor: "green"}}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://image.beekka.com/blog/2015/bg2015031302.jpg"}}></Image>
                    </View>
                </Swiper>
                <View style={{height: height - 150 - statusBarHeight, justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity style={styles.loginButton} onPress={this.login.bind(this)}>
                        <Text style={{color: "#FFFFFF", fontSize: 18}}>登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const Navigator = StackNavigator({
    Home: {screen: MainComponent},
    HomeThree: {screen: LoginView}
}, {
    initialRouteName: "Home",
    mode: "card",
    headerMode: "screen",
});

AppRegistry.registerComponent("MainComponent", () => Navigator);

const styles = StyleSheet.create({
    swiperItem: {
        height: 150
    },
    loginButton: {
        width: width - 80,
        height: 40,
        backgroundColor: "#00AAEE",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    }
});