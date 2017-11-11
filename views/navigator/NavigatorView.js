/**
 * Created by liuyandong on 2017/11/11.
 */
import React, {Component} from "react";
import {
    Image,
    View,
    Text,
    StyleSheet
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

    renderBadge() {
        return (
            <View style={styles.badgeView}>
                <Text style={styles.badgeText}>15</Text>
            </View>
        );
    }

    renderTabView(title, tabName, tabContent, isBadge) {
        var tabNomal;
        var tabPress;
        switch (tabName) {
            case "Home":
                tabNomal = TAB_NORMAL_1;
                tabPress = TAB_PRESS_1;
                break;
            case "Video":
                tabNomal = TAB_NORMAL_2;
                tabPress = TAB_PRESS_2;
                break;
            case "Follow":
                tabNomal = TAB_NORMAL_3;
                tabPress = TAB_PRESS_3;
                break;
            case "Mine":
                tabNomal = TAB_NORMAL_4;
                tabPress = TAB_PRESS_4;
                break;
            default:
                break;
        }
        return (
            <TabNavigator.Item
                title={title}
                renderIcon={() => <Image style={styles.tabIcon} source={tabNomal}></Image>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={tabPress}></Image>}
                selected={this.state.selectedTab === tabName}
                selectedTitleStyle={{color: "#F85959"}}
                onPress={() => this.handleOnPress(tabName)}
                renderBadge={this.renderBadge.bind(this)}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text>{tabContent}</Text></View>
            </TabNavigator.Item>
        );
    }

    renderTabBarView() {
        return (
            <TabNavigator
                tabBarStyle={styles.tab}>
                {this.renderTabView('头条', 'Home', '头条板块', true)}
                {this.renderTabView('视频', 'Video', '视频板块', false)}
                {this.renderTabView('关注', 'Follow', '关注板块', false)}
                {this.renderTabView('我的', 'Mine', '我的板块', false)}
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