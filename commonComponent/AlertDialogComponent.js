/**
 * Created by liuyandong on 2017/10/22.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    PixelRatio,
    StyleSheet,
    Platform,
    Alert
} from "react-native";

let window = Dimensions.get("window");
let width = window.width;
let pixelWidth = 1 / PixelRatio.get();

export default class AlertDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            okText: "",
            cancelText: "",
            handleOkButtonOnPress: () => {},
            handleCancelButtonOnPress: () => {},
            visible: false,
            content: "",
            type: "alert"
        };
    }

    alert(title, okText, content, handleOkButtonOnPress) {
        if (Platform.OS == "android") {
            this.setState({
                title: title,
                type: "alert",
                okText: okText,
                handleOkButtonOnPress: () => {
                    this.setState({visible: false});
                    handleOkButtonOnPress && handleOkButtonOnPress();
                },
                visible: true,
                content: content
            });
        } else {
            Alert.alert("", content, [{text: okText, onPress: handleOkButtonOnPress}]);
        }
    }

    confirm(title, okText, cancelText, content, handleOkButtonOnPress, handleCancelButtonOnPress) {
        if (Platform.OS == "android") {
            this.setState({
                title: title,
                type: "confirm",
                okText: okText,
                cancelText: cancelText,
                handleOkButtonOnPress: () => {
                    this.setState({visible: false});
                    handleOkButtonOnPress && handleOkButtonOnPress();
                },
                handleCancelButtonOnPress: () => {
                    this.setState({visible: false});
                    handleCancelButtonOnPress && handleCancelButtonOnPress();
                },
                visible: true,
                content: content
            });
        } else {
            Alert.alert("", content, [{text: okText, onPress: handleOkButtonOnPress}, {text: cancelText, onPress: handleCancelButtonOnPress}]);
        }
    }

    renderAlertDialog() {
        return (
            <View style={styles.alertButtonPanel}>
                <TouchableOpacity style={styles.alertButton} onPress={this.state.handleOkButtonOnPress} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>{this.state.okText}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderConfirmDialog() {
        return (
            <View style={styles.confirmButtonPanel}>
                <TouchableOpacity style={styles.confirmButtonLeft} onPress={this.state.handleOkButtonOnPress} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>确定</Text>
                </TouchableOpacity>
                <View style={{height: 40, width: pixelWidth, backgroundColor: "#FFFFFF"}}></View>
                <TouchableOpacity style={styles.confirmButtonRight} onPress={this.state.handleCancelButtonOnPress} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>取消</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <Modal onRequestClose={() => {}}
                   animationType="fade"
                   visible={this.state.visible}
                   transparent={true}>
                <View style={styles.mask}>
                    <View style={styles.container}>
                        <View style={styles.titlePanel}>
                            <Text style={styles.titleText}>{this.state.title}</Text>
                        </View>
                        <View style={styles.contentPanel}>
                            <Text style={styles.contentText}>{this.state.content}</Text>
                        </View>
                        {this.state.type == "alert" ? this.renderAlertDialog() : this.renderConfirmDialog()}
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    mask: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        backgroundColor: "#FFFFFF",
        width: width - 80,
        height: 160,
        borderRadius: 10
    },
    titlePanel: {
        width: width - 80,
        height: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold"
    },
    contentPanel: {
        width: width - 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20
    },
    alertButtonPanel: {
        width: width - 80,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "gray"
    },
    alertButton: {
        width: width - 80,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#41D09B",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    confirmButtonPanel: {
        width: width - 80,
        height: 40,
        borderTopColor: "gray",
        flexDirection: "row",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    confirmButtonLeft: {
        width: (width - 80 - pixelWidth) / 2,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 10,
        backgroundColor: "#41D09B",
    },
    confirmButtonRight: {
        width: (width - 80 - pixelWidth) / 2,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderLeftColor: "red",
        borderBottomRightRadius: 10,
        backgroundColor: "#41D09B"
    },
    contentText: {
        color: "#66666E",
        fontSize: 15,
        fontWeight: "bold"
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});