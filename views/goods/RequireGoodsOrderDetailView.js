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
    ScrollView
} from "react-native";

import HeaderComponent from "../../commonComponent/HeaderComponent";
import AlertDialogComponent from "../../commonComponent/AlertDialogComponent";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

export default class RequireGoodsOrderDetailView extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
    }

    examineRequireGoodsOrder() {
        this["refs"]["alertDialogComponent"]["confirm"]("提示", "确定", "取消", "确定审核该要货单？");
    }

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
                <ScrollView style={styles.contentWrapper}>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>单据号：</Text>
                        <Text style={styles.itemValue}>YH12345678910</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>制单时间：</Text>
                        <Text style={styles.itemValue}>2017-11-11 11:11:11</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>制单人：</Text>
                        <Text style={styles.itemValue}>刘艳东</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>状态：</Text>
                        <Text style={styles.itemValue}>未提交</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>门店：</Text>
                        <Text style={styles.itemValue}>总部</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>付款方式：</Text>
                        <Text style={styles.itemValue}>微信支付</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>合计金额：</Text>
                        <Text style={styles.itemValue}>125.30</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemName}>已付金额：</Text>
                        <Text style={styles.itemValue}>125.30</Text>
                    </View>

                    <TouchableOpacity style={styles.operationButton} onPress={this.examineRequireGoodsOrder.bind(this)}>
                        <Text style={styles.operationButtonText}>审核</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.operationButton}>
                        <Text style={styles.operationButtonText}>删除</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.operationButton}>
                        <Text style={styles.operationButtonText}>付款</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.paidView}>
                    <View style={styles.totalView}>
                        <Text style={styles.totalText}>付款金额：¥1230.00</Text>
                    </View>
                    <TouchableOpacity style={styles.paidButton}>
                        <Text style={styles.paidButtonText}>付款</Text>
                    </TouchableOpacity>
                </View>
                <AlertDialogComponent ref="alertDialogComponent"></AlertDialogComponent>
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
    itemView: {
        flexDirection: "row",
        borderBottomWidth: pixelWidth,
        borderBottomColor: "gray",
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        alignItems: "center"
    },
    itemName: {
        flex: 1
    },
    itemValue: {
        flex: 3
    },
    operationButton: {
        width: width - 80,
        height: 40,
        marginLeft: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#41D09B",
        borderRadius: 4,
        marginTop: 10
    },
    operationButtonText: {
        color: "#FFFFFF",
        fontSize: 18
    },
    paidView: {
        flexDirection: "row",
        height: 40
    },
    totalView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "gray"
    },
    totalText: {
        textAlign: "center",
        color: "orange",
        fontSize: 16
    },
    paidButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#41D09B"
    },
    paidButtonText: {
        color: "#FFFFFF",
        fontSize: 18
    }
});