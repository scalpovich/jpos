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
    TouchableOpacity,
    ScrollView,
    FlatList
} from "react-native";
import Swiper from "react-native-swiper";
import HeaderComponent from "../../commonComponent/HeaderComponent";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

export default class HomeView extends Component {
    constructor(props){
        super(props);
        this.menus = [
            [
                {name: "菜品管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/goods.png")},
                {name: "机构管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/store.png")},
                {name: "订单管理", componentName: "OrderView", iconSource: require("../../resources/images/common/order.png")},
            ],
            [
                {name: "菜品管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/goods.png")},
                {name: "机构管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/store.png")},
                {name: "订单管理", componentName: "OrderView", iconSource: require("../../resources/images/common/order.png")},
            ],
            [
                {name: "菜品管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/goods.png")},
                {name: "机构管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/store.png")},
                {name: "订单管理", componentName: "OrderView", iconSource: require("../../resources/images/common/order.png")},
            ],
            [
                {name: "菜品管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/goods.png")},
                {name: "机构管理", componentName: "GoodsView", iconSource: require("../../resources/images/common/store.png")},
                {name: "订单管理", componentName: "OrderView", iconSource: require("../../resources/images/common/order.png")},
            ],
        ];
    }
    static navigationOptions = {
        header: null
    }

    toSecondLevelMenu(secondLevelMenuName) {
        this["props"]["navigation"]["navigate"](secondLevelMenuName);
    }

    renderItem(row) {
        let menus = row["item"];
        let menuViews = [];
        let length = menus.length;
        for (let menuIndex = 0; menuIndex < length; menuIndex++) {
            let menu = menus[menuIndex];
            let styleKey = null;
            if (menuIndex == 0) {
                styleKey = "leftMenuView";
            } else if (menuIndex == 1) {
                styleKey = "centerMenuView";
            } else if (menuIndex == 2) {
                styleKey = "rightMenuView";
            }
            menuViews.push(
                <View style={styles[styleKey]} key={menuIndex}>
                    <TouchableOpacity style={styles.menu} onPress={this.toSecondLevelMenu.bind(this, menu["componentName"])}>
                        <Image source={menu["iconSource"]}></Image>
                        <Text style={styles.menuText}>{menu["name"]}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.menuRowView}>
                {menuViews}
            </View>
        );
    }

    keyExtractor(item, index) {
        return index;
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent statusBarColor="#41D09B" headerColor="#41D09B" title="总部"></HeaderComponent>
                <View style={styles.swiperView}>
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
                </View>
                <FlatList style={styles.menuView} data={this.menus} renderItem={this.renderItem.bind(this)} keyExtractor={this.keyExtractor.bind(this)}></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    swiperView: {
        height: 200
    },
    swiperItem: {
        height: 200
    },
    menuView: {
        flex: 1
    },
    menuRowView: {
        width: width,
        height: width / 3,
        flexDirection: "row"
    },
    leftMenuView: {
        width: width / 3 - 2 * pixelWidth / 3,
        height: width / 3,
        borderBottomColor: "gray",
        borderBottomWidth: pixelWidth
    },
    centerMenuView: {
        width: width / 3 + 4 * pixelWidth / 3,
        height: width / 3,
        borderLeftColor: "gray",
        borderLeftWidth: pixelWidth,
        borderRightColor: "gray",
        borderRightWidth: pixelWidth,
        borderBottomColor: "gray",
        borderBottomWidth: pixelWidth
    },
    rightMenuView: {
        width: width / 3 - 2 * pixelWidth / 3,
        height: width / 3,
        borderBottomColor: "gray",
        borderBottomWidth: pixelWidth
    },
    menu: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    menuText: {
        color: "#3A444E",
        fontSize: 16,
        marginTop: 5
    }
});