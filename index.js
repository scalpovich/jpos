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

const window = Dimensions.get("window");
const width = window.width;
const height = window.height;
const pixelWidth = 1 / PixelRatio.get();
const statusBarHeight = StatusBar.currentHeight;

class MainComponent extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    login() {
        this["props"]["navigation"]["navigate"]("HomeThree");
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {Platform.OS == "android" ? <StatusBar backgroundColor="#41D09B"></StatusBar> : <View style={{height: 20, backgroundColor: "#41D09B"}}></View>}
                <Swiper loop={true} autoplay={true} style={{height: 200}}>
                    <View style={styles.swiperItem}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f0005DL5ZsPBJreEWzsa0.jpg"}}></Image>
                    </View>
                    <View style={{height: 150, backgroundColor: "yellow"}}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://ubmcmm.baidustatic.com/media/v1/0f000ckyT6Y8ZgUHgku-06.jpg"}}></Image>
                    </View>
                    <View style={{height: 150, backgroundColor: "green"}}>
                        <Image resizeMode="stretch" style={{flex: 1}} source={{uri: "http://image.beekka.com/blog/2015/bg2015031302.jpg"}}></Image>
                    </View>
                </Swiper>
                <View style={{height: height - 150 - statusBarHeight, justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity style={styles.loginButton} onPress={this.login.bind(this)}>
                        <Text style={{color: "#FFFFFF", fontSize: 18}}>登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let isShowWelcomePage = false;
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
    }
}, {
    initialRouteName: isShowWelcomePage ? "HomeView" : "LoginView",
    mode: "card",
    headerMode: "screen",
});

const Tabs = TabNavigator({
    Home: {
        screen: LoginView,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
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
        screen: PersonalView,
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

AppRegistry.registerComponent("MainComponent", () => Tabs);

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