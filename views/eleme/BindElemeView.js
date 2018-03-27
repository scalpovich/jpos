/**
 * Created by liuyandong on 2018/3/26.
 */
import React, {Component} from "react";
import {StyleSheet, View, WebView, Image} from "react-native";
import HeaderComponent from "../../commonComponent/HeaderComponent";
import WebUtils from "../../utils/WebUtils";
import CacheUtils from "../../utils/CacheUtils";
import CommonUtils from "../../utils/CommonUtils";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";

const leftButton = <Image source={require("../../resources/images/common/back.png")}></Image>;
export default class BindElemeView extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this["state"] = {loaded: false, uri: null};
    }

    componentDidMount() {
        var userInfo = CacheUtils.obtainUserInfo();
        if (!userInfo) {
            return;
        }
        WebUtils.doGetAsync(CommonUtils.getServiceName(userInfo["business"]), "eleme", "tenantAuthorize", {tenantId: userInfo["tenantId"], branchId: userInfo["branchId"], userId: userInfo["userId"]}).then((result) => {
            if (!result["successful"]) {
                return Promise.reject({code: "", message: result["error"]});
            }
            this["setState"]({uri: result["data"]});
        }).catch((error) => {
            this["refs"]["alertDialogComponent"].alert("提示", "确定", error["message"]);
        });
    }

    back() {
        this["props"]["navigation"]["goBack"]();
    }

    renderLoading() {
        console.log("renderLoading")
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent handleLeftButtonOnPress={this.back.bind(this)}
                                 title="绑定饿了么"
                                 headerColor="#41D09B"
                                 leftButton={leftButton}
                                 rightButton={null}>
                </HeaderComponent>
                {
                    this.state.loaded ? <WebView source={{uri: this["state"]["uri"]}} startInLoadingState={true} javaScriptEnabled={true} renderLoading={this.renderLoading.bind(this)}></WebView> : null
                }
                <AlertDialogComponent ref="alertDialogComponent"></AlertDialogComponent>
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