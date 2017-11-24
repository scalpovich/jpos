/**
 * Created by liuyandong on 2017/11/25.
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
    FlatList
} from "react-native";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

import HeaderComponent from "../../commonComponent/HeaderComponent";

export default class GoodsListView extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {goodsInfos: [
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
            {requireGoodsOrderNumber: "YH12345678910", createTime: "2017-11-24 11:59:32", status: "已审核"},
        ]};
    }

    toRequireGoodsOrderDetailView(requireGoodsOrderId) {
        this["props"]["navigation"]["navigate"]("RequireGoodsOrderDetailView");
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.goodsItemView} onPress={this.toRequireGoodsOrderDetailView.bind(this)}>
                <Text style={styles.requireGoodsOrderNumber}>{item["requireGoodsOrderNumber"]}</Text>
                <Text style={styles.createTime}>{item["createTime"]}</Text>
                <Text style={styles.status}>{item["status"]}</Text>
            </TouchableOpacity>
        );
    }

    keyExtractor(item, index) {
        return index;
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent statusBarColor="#41D09B"
                                 headerColor="#41D09B"
                                 title="菜品档案"
                                 leftButton={<Image source={require("../../resources/images/common/back.png")}></Image>}
                                 handleLeftButtonOnPress={() => {this["props"]["navigation"]["goBack"]()}}
                                 rightButton={<Image source={require("../../resources/images/common/search.png")}></Image>}
                                 handleRightButtonOnPress={() => {this["props"]["navigation"]["goBack"]()}}>
                </HeaderComponent>
                <View style={styles.titleView}>
                    <Text style={styles.requireGoodsOrderNumberTitle}>单据号</Text>
                    <Text style={styles.createTimeTitle}>制单时间</Text>
                    <Text style={styles.statusTitle}>状态</Text>
                </View>
                <FlatList style={styles.menuView}
                          data={this.state.goodsInfos}
                          renderItem={this.renderItem.bind(this)}
                          keyExtractor={this.keyExtractor.bind(this)}>
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentWrapper: {
        flex: 1
    },
    titleView: {
        flexDirection: "row",
        backgroundColor: "#3A444E",
        height: 30,
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10
    },
    requireGoodsOrderNumberTitle: {
        width: (width - 20) / 3,
        color: "#FFFFFF",
        textAlign: "center"
    },
    createTimeTitle: {
        width: (width - 20) / 3,
        color: "#FFFFFF",
        textAlign: "center"
    },
    statusTitle: {
        width: (width - 20) / 3,
        color: "#FFFFFF",
        textAlign: "center"
    },
    goodsListView: {
        flex: 1
    },
    goodsItemView: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: pixelWidth,
        borderBottomColor: "gray",
        minHeight: 60,
        marginLeft: 10,
        marginRight: 10
    },
    requireGoodsOrderNumber: {
        width: (width - 20) / 3,
        textAlign: "center"
    },
    createTime: {
        width: (width - 20) / 3,
        textAlign: "center"
    },
    status: {
        width: (width - 20) / 3,
        textAlign: "center"
    }
});