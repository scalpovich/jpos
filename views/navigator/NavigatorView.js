/**
 * Created by liuyandong on 2017/11/11.
 */
import React, {Component} from "react";
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    PixelRatio
} from "react-native";
import TabNavigator from "react-native-tab-navigator";

const TAB_NORMAL_1 = require("../../resources/images/common/add.png");
const TAB_NORMAL_2 = require("../../resources/images/common/add.png");
const TAB_NORMAL_3 = require("../../resources/images/common/add.png");
const TAB_NORMAL_4 = require("../../resources/images/common/add.png");

const TAB_PRESS_1 = require("../../resources/images/common/back.png");
const TAB_PRESS_2 = require("../../resources/images/common/back.png");
const TAB_PRESS_3 = require("../../resources/images/common/back.png");
const TAB_PRESS_4 = require("../../resources/images/common/back.png");

var window = Dimensions.get("window");
var width = window.width;
var pixelWidth = 1 / PixelRatio.get();

export default class NavigatorView extends Component {
    constructor(props) {
        super(props);
        this["state"] = {selectedTab: "home"};
    }

    handleOnPress(tabName) {
        if (tabName) {
            this.setState({selectedTab: tabName});
        }
    }

    renderView() {
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={{borderBottomWidth: pixelWidth, borderBottomColor: "red", marginLeft: 20}}>
                    <View>
                        <Image></Image>
                    </View>
                    <View>
                        <Text>采购进货</Text>
                        <Text>门店采购进货</Text>
                    </View>
                    <View>
                        <Image></Image>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderTabView(title, tabName) {
        var tabNormal;
        var tabPress;
        switch (tabName) {
            case "home":
                tabNormal = TAB_NORMAL_1;
                tabPress = TAB_PRESS_1;
                break;
            case "video":
                tabNormal = TAB_NORMAL_2;
                tabPress = TAB_PRESS_2;
                break;
            case "follow":
                tabNormal = TAB_NORMAL_3;
                tabPress = TAB_PRESS_3;
                break;
            case "mine":
                tabNormal = TAB_NORMAL_4;
                tabPress = TAB_PRESS_4;
                break;
            default:
                break;
        }
        return (
            <TabNavigator.Item
                title={title}
                renderIcon={() => <Image style={styles.tabIcon} source={tabNormal}></Image>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={tabPress}></Image>}
                selected={this.state.selectedTab === tabName}
                selectedTitleStyle={{color: "#F85959"}}
                onPress={() => this.handleOnPress(tabName)}>
                {this.renderView()}
            </TabNavigator.Item>
        );
    }

    renderTabBarView() {
        return (
            <TabNavigator tabBarStyle={styles.tab}>
                {this.renderTabView("头条", "home", "头条板块", true)}
                {this.renderTabView("视频", "video", "视频板块", false)}
                {this.renderTabView("关注", "follow", "关注板块", false)}
                {this.renderTabView("我的", "mine", "我的板块", false)}
            </TabNavigator>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTabBarView()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tab: {
        height: 52,
        alignItems: 'center',
        backgroundColor: '#f4f5f6',
    },
    tabIcon: {
        width: 25,
        height: 25,
    },
    badgeView: {
        width: 22,
        height: 14,
        backgroundColor: '#f85959',
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 3,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 8,
    }
});