/**
 * Created by liuyandong on 2017/10/22.
 */
import React, {Component} from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Modal,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
let window = Dimensions.get("window");
let width = window.width;
let height = window.height;

export default class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false, height: new Animated.Value(0)}
    }
    handlePaidButtonOnPress() {
        this.setState({visible: true});
        Animated.timing(
            this.state.height,
            {toValue: 160}
        ).start();
    }

    closeShoppingCart() {
        Animated.timing(
            this.state.height,
            {toValue: 0}
        ).start();
        this.setState({visible: false, height: new Animated.Value(0)});
    }

    add() {
        Animated.timing(
            this.state.height,
            {toValue: 120}
        ).start();
    }

    renderShoppingCartItems() {
        return (
            [
                <TouchableOpacity style={{height: 40, backgroundColor: "red"}} key="1" onPress={this.add.bind(this)}></TouchableOpacity>,
                <View style={{height: 40, backgroundColor: "#00AAEE"}} key="2"></View>,
                <View style={{height: 40, backgroundColor: "red"}} key="3"></View>,
                <View style={{height: 40, backgroundColor: "#00AAEE"}} key="4"></View>,
            ]
        );
    }

    render() {
        return (
            <View style={[styles.container, styles.justifyContentCenter, styles.alignItemsCenter]}>
                <TouchableOpacity style={[styles.loginButton, styles.justifyContentCenter, styles.alignItemsCenter]} onPress={this.handlePaidButtonOnPress.bind(this)}>
                    <Text style={{color: "#FFFFFF"}}>购物车</Text>
                </TouchableOpacity>
                <Modal onRequestClose={() => {}}
                       animationType="fade"
                       visible={this.state.visible}
                       transparent={true}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)"}} activeOpacity={1} onPress={this.closeShoppingCart.bind(this)}>
                        <Animated.View style={{height: this.state.height, width: width, position: "absolute", bottom: 0}}>
                            {this.renderShoppingCartItems()}
                        </Animated.View>
                    </TouchableOpacity>
                </Modal>
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
    loginButton: {
        backgroundColor: "#00AAEE",
        height: 40,
        width: width - 80,
        borderRadius: 4,
        marginTop: 20
    }
});