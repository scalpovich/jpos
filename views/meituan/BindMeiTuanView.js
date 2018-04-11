/**
 * Created by liuyandong on 2018/3/26.
 */
import React, {Component} from "react";
import {StyleSheet, View, WebView, Image, InteractionManager, NativeModules} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";
import WebUtils from "../../utils/WebUtils";
import CacheUtils from "../../utils/CacheUtils";
import CommonUtils from "../../utils/CommonUtils";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";
import LoadingToastComponent from "../../commonComponent/LoadingToastComponent";

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
export default class BindMeiTuanView extends Component {
    static navigationOptions = {
        header: null
    };

    back() {
        this["props"]["navigation"]["goBack"]();
    }

    constructor(props) {
        super(props);
        this["state"] = {loaded: false, uri: null};
    }

    async handleComponentDidMount() {
        let userInfo = await CacheUtils.obtainUserInfo();
        if (!userInfo) {
            return;
        }
        this["refs"]["loadingToastComponent"].show("加载中...");
        WebUtils.doGet(CommonUtils.getServiceName(userInfo["business"]), "meiTuan", "generateBindingStoreLink", userInfo["accessToken"], {tenantId: userInfo["tenantId"], branchId: userInfo["branchId"], businessId: 2}).then((result) => {
            if (!result["successful"]) {
                return Promise.reject({code: "", message: result["error"]});
            }
            this["setState"]({loaded: true, uri: result["data"]});
        }).catch((error) => {
            this["refs"]["loadingToastComponent"].hide();
            this["refs"]["alertDialogComponent"].alert("提示", "确定", error["message"]);
        });
    }

    async componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.handleComponentDidMount();
        });
    }

    handleOnLoad() {
        this["refs"]["loadingToastComponent"].hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 title="绑定美团外卖"
                                 headerColor="#41D09B"
                                 leftButton={leftButton}
                                 rightButton={null}>
                </HeaderComponent>
                {
                    this.state.loaded ? <WebView source={{uri: this["state"]["uri"]}} onLoad={this.handleOnLoad.bind(this)} javaScriptEnabled={true}></WebView> : null
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
    }
});