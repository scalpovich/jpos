/**
 * Created by liuyandong on 2017/10/25.
 */
import React, {Component} from "react";
import {
    Dimensions,
    Image,
    PixelRatio,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity
} from "react-native";
import Swiper from "react-native-swiper";
import HeaderComponent from "../../commonComponent/HeaderComponent";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

export default class HomeView extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent statusBarColor="#41D09B" headerColor="#41D09B" title="总部"></HeaderComponent>
                <Swiper loop={true} autoplay={true} style={styles.swiper}>
                    <View style={styles.swiperItem}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f0005DL5ZsPBJreEWzsa0.jpg"}}></Image>
                    </View>
                    <View style={styles.swiperItem}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f000ckyT6Y8ZgUHgku-06.jpg"}}></Image>
                    </View>
                    <View style={styles.swiperItem}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://image.beekka.com/blog/2015/bg2015031302.jpg"}}></Image>
                    </View>
                </Swiper>
                <View style={{height: height - 200 - statusBarHeight, justifyContent: "center", alignItems: "center"}}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    swiper: {
        height: 200
    },
    swiperItem: {
        height: 200
    },
});