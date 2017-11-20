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
    PixelRatio
} from "react-native";
import LoginView from "./views/login/LoginView";
import Swiper from "react-native-swiper";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = StatusBar.currentHeight;
const pixelWidth = 1 / PixelRatio.get();
class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [{id: 100, name: "刘艳东"}, {id: 200, name: "liuyandong"}]};
    }

    renderItem(item, index, separators) {
        return (
            <View style={{borderBottomWidth: pixelWidth, marginLeft: 10}}>
                <Text key={index}>{item["item"]["name"]}</Text>
            </View>
        );
    }

    keyExtractor(item, index) {
        return item.id;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Swiper loop={true} autoplay={true} style={{height: 200}}>
                    <View style={{height: 150}}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f0005DL5ZsPBJreEWzsa0.jpg"}}></Image>
                    </View>
                    <View style={{height: 150, backgroundColor: "yellow"}}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f000ckyT6Y8ZgUHgku-06.jpg"}}></Image>
                    </View>
                    <View style={{height: 150, backgroundColor: "green"}}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://image.beekka.com/blog/2015/bg2015031302.jpg"}}></Image>
                    </View>
                </Swiper>
                <View style={{height: height - 150 - statusBarHeight}}>
                    <FlatList data={this.state.data}
                              keyExtractor={this.keyExtractor}
                              renderItem={this.renderItem}>
                    </FlatList>
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent("MainComponent", () => MainComponent);