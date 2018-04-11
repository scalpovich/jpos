import React, {Component} from "react";
import {StyleSheet, View, Text, Image, InteractionManager, PixelRatio, Dimensions, TouchableOpacity, FlatList} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";
import WebUtils from "../../utils/WebUtils";
import CacheUtils from "../../utils/CacheUtils";
import CommonUtils from "../../utils/CommonUtils";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
let window = Dimensions.get("window");
let width = window.width;
let pixelWidth = 1 / PixelRatio.get();
export default class BranchListView extends Component {
    static navigationOptions = {
        header: null
    };

    back() {
        this["props"]["navigation"]["goBack"]();
    }

    constructor(props) {
        super(props);
        this["state"] = {loaded: true, branches: [{}, {}]};
    }

    async handleComponentDidMount() {
        /*let userInfo = await CacheUtils.obtainUserInfo();
        if (!userInfo) {
            return;
        }*/
        this["refs"]["loadingToastComponent"].show("加载中...");
        var serviceName = CommonUtils.getServiceName("1");
        var listBranchesRequestParameters = {
            serviceName: serviceName,
            controllerName: "branch",
            actionName: "listBranches",
            access_token: "",
            tenantId: 1,
            page: 1,
            rows: 20
        };
        WebUtils.doGet(listBranchesRequestParameters).then((result) => {
            if (!result["successful"]) {
                return Promise.reject({code: "", message: result["error"]});
            }
            this["refs"]["loadingToastComponent"].hide();
            this["setState"]({loaded: true, branches: result["data"]["rows"]});
        }).catch((error) => {
            this["refs"]["loadingToastComponent"].hide();
            this["refs"]["alertDialogComponent"]["alert"]("提示", "确定", error["message"]);
        });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.handleComponentDidMount();
        });
    }

    toBranchDetailView(branch) {
        alert(JSON.stringify(branch));
    }

    renderItem(row) {
        var item = row["item"];
        return (
            <TouchableOpacity style={styles.branchInfo} onPress={this.toBranchDetailView.bind(this, item)}>
                <View style={styles.branchCodeAndName}>
                    <Text style={{flex: 2}}>名称：{item["name"]}</Text>
                    <Text style={{flex: 3}}>编码：{item["code"]}</Text>
                </View>
                <View style={styles.linkmanAndContactPhone}>
                    <Text style={{flex: 2}}>联系人：{item["linkman"]}</Text>
                    <Text style={{flex: 3}}>联系电话：{item["contactPhone"]}</Text>
                </View>
                <Image style={styles.intoIcon} source={require("../../resources/images/common/into.png")}></Image>
            </TouchableOpacity>
        );
    }

    keyExtractor(item, index) {
        return index;
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 title="门店管理"
                                 headerColor="#41D09B"
                                 leftButton={leftButton}
                                 rightButton={null}>
                </HeaderComponent>
                {
                    this.state.loaded ? <FlatList style={{flex: 1}} data={this.state.branches} renderItem={this.renderItem.bind(this)} keyExtractor={this.keyExtractor.bind(this)}></FlatList> : null
                }
                <AlertDialogComponent ref="alertDialogComponent"></AlertDialogComponent>
                <LoadingToastComponent ref="loadingToastComponent"></LoadingToastComponent>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAF1",
    },
    justifyContentCenter: {
        justifyContent: "center"
    },
    alignItemsCenter: {
        alignItems: "center"
    },
    branchInfo: {
        marginLeft: 10,
        marginRight: 10,
        height: 80,
        borderBottomWidth: pixelWidth
    },
    branchCodeAndName: {
        flexDirection: "row",
        height: 40,
        flex: 1,
        alignItems: "center"
    },
    linkmanAndContactPhone: {
        flexDirection: "row",
        height: 40,
        flex: 1,
        alignItems: "center"
    },
    intoIcon: {
        position: "absolute",
        right: 0,
        top: 25,
        width: 30,
        height: 30
    }
});