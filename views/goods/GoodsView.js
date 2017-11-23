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
    ScrollView
} from "react-native";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

import HeaderComponent from "../../commonComponent/HeaderComponent";

export default class GoodsView extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    toSecondLevelMenu(secondLevelMenuName) {
        this["props"]["navigation"]["navigate"](secondLevelMenuName);
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent statusBarColor="#41D09B"
                                 headerColor="#41D09B"
                                 title="产品管理"
                                 leftButton={<Image source={require("../../resources/images/common/back.png")}></Image>}
                                 handleLeftButtonOnPress={() => {this["props"]["navigation"]["goBack"]()}}>
                </HeaderComponent>
                <ScrollView style={styles.menuView}>
                    <View style={{width: width, height: width / 3, flexDirection: "row"}}>
                        <View style={styles.leftMenuView}>
                            <TouchableOpacity style={styles.menu} onPress={this.toSecondLevelMenu.bind(this, "GoodsView")}>
                                <Image source={require("../../resources/images/common/goods.png")}></Image>
                                <Text style={styles.menuText}>菜品档案</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerMenuView}>
                            <TouchableOpacity style={styles.menu}>
                                <Image source={require("../../resources/images/common/order.png")}></Image>
                                <Text style={styles.menuText}>菜品单位</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightMenuView}>
                            <TouchableOpacity style={styles.menu} onPress={this.toSecondLevelMenu.bind(this, "OrderView")}>
                                <Image source={require("../../resources/images/common/package.png")}></Image>
                                <Text style={styles.menuText}>套餐管理</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    menuView: {
        flex: 1
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