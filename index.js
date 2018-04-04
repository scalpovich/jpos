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
    PixelRatio,
    Platform,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import Swiper from "react-native-swiper";
import LoginView from "./views/login/LoginView";
import {StackNavigator, TabNavigator} from "react-navigation";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import WelcomeView from "./views/welcome/WelcomeView";
import HomeView from "./views/main/HomeView";
import GoodsView from "./views/goods/GoodsView";
import GoodsListView from "./views/goods/GoodsListView";
import RequireGoodsOrderDetailView from "./views/goods/RequireGoodsOrderDetailView";
import OrderView from "./views/order/OrderView";
import ForgetPasswordView from "./views/login/ForgetPasswordView";
import RegisterView from "./views/login/RegisterView";
import InputVerificationCodeView from "./views/login/InputVerificationCodeView";
import SetNewPasswordView from "./views/login/SetNewPasswordView";
import PersonalView from "./views/personal/PersonalView";
import AgreementView from "./views/agreement/AgreementView";
import BindElemeView from "./views/eleme/BindElemeView";
import BindMeiTuanView from "./views/meituan/BindMeiTuanView";
import BusinessDailyView from "./views/report/BusinessDailyView";

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

const Tab = TabNavigator({
    Home: {
        screen: HomeView,
        navigationOptions: {
            tabBarLabel: "点餐",
            tabBarIcon: ({tintColor}) => (<Image source={require("./resources/images/common/order.png")} style={[{tintColor: tintColor}, {height: 25, width: 25}]}/>),
        }
    },
    Bill: {
        screen: LoginView,
        navigationOptions: {
            tabBarLabel: "订单",
            tabBarIcon: ({tintColor}) => (<Image source={require("./resources/images/common/order.png")} style={[{tintColor: tintColor}, {height: 25, width: 25}]}/>),
        }
    },
    AA: {
        screen: LoginView,
        navigationOptions: {
            tabBarLabel: "菜品",
            tabBarIcon: ({tintColor}) => (<Image source={require("./resources/images/common/order.png")} style={[{tintColor: tintColor}, {height: 25, width: 25}]}/>),
        }
    },
    Personal: {
        screen: BusinessDailyView,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor}) => (<Image source={require("./resources/images/common/order.png")} style={[{tintColor: tintColor}, {height: 25, width: 25}]}/>),
        }
    }
}, {
    animationEnabled: false,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    backBehavior: "none",
    tabBarOptions: {
        activeTintColor: "#41D09B",
        inactiveTintColor: "#999999",
        showIcon: true,
        indicatorStyle: {
            height: 0
        },
        style: {
            backgroundColor: "#FFFFFF",
            height: 50
        },
        labelStyle: {
            fontSize: 10,
            marginTop: 3
        },
    },
});

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scene } = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        const transition = params.transition || "forHorizontal";
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});

const Navigator = StackNavigator({
    WelcomeView: {
        screen: WelcomeView
    },
    LoginView: {
        screen: LoginView
    },
    HomeView: {
        screen: HomeView
    },
    GoodsView: {
        screen: GoodsView
    },
    OrderView: {
        screen: OrderView
    },
    GoodsListView: {
        screen: GoodsListView
    },
    RequireGoodsOrderDetailView: {
        screen: RequireGoodsOrderDetailView
    },
    ForgetPasswordView: {
        screen: ForgetPasswordView
    },
    RegisterView: {
        screen: RegisterView
    },
    InputVerificationCodeView: {
        screen: InputVerificationCodeView
    },
    SetNewPasswordView: {
        screen: SetNewPasswordView
    },
    Tab: {
        screen: Tab
    },
    AgreementView: {
        screen: AgreementView
    },
    BindElemeView: {
        screen: BindElemeView
    },
    BindMeiTuanView: {
        screen: BindMeiTuanView
    },
    BusinessDailyView: {
        screen: BusinessDailyView
    }
}, {
    initialRouteName: "LoginView",
    mode: "card",
    headerMode: "screen",
    transitionConfig: TransitionConfiguration
});

AppRegistry.registerComponent("MainComponent", () => Navigator);

const styles = StyleSheet.create({
    swiperItem: {
        height: 150
    },
    loginButton: {
        width: width - 80,
        height: 40,
        backgroundColor: "#41D09B",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    }
});