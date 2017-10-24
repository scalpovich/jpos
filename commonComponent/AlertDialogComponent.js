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
    StyleSheet
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

    alert(okText, content, handleOkButtonOnPress) {
        this.setState({
            type: "alert",
            okText: okText,
            handleOkButtonOnPress: () => {
                this.setState({visible: false});
                handleOkButtonOnPress && handleOkButtonOnPress();
            },
            visible: true,
            content: content
        });
    }

    confirm(okText, cancelText, content, handleOkButtonOnPress, handleCancelButtonOnPress) {
        this.setState({
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
    }

    renderAlertDialog() {
        return (
            <View style={styles.alertButtonPanel}>
                <TouchableOpacity style={styles.alertButton} onPress={this.state.handleOkButtonOnPress}>
                    <Text style={styles.buttonText}>{this.state.okText}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderConfirmDialog() {
        return (
            <View style={styles.confirmButtonPanel}>
                <TouchableOpacity style={styles.confirmButtonLeft} onPress={this.state.handleOkButtonOnPress}>
                    <Text style={styles.buttonText}>确定</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButtonRight} onPress={this.state.handleCancelButtonOnPress}>
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
                <View style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)", alignItems: "center", justifyContent: "center"}}>
                    <View style={{backgroundColor: "#FFFFFF", height: 120, width: width - 160, borderRadius: 10}}>
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
    contentPanel: {
        width: width - 160,
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10
    },
    alertButtonPanel: {
        width: width - 160,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "gray",
        borderTopWidth: pixelWidth
    },
    alertButton: {
        width: width - 160,
        height: 40 - pixelWidth,
        alignItems: "center",
        justifyContent: "center"
    },
    confirmButtonPanel: {
        width: width - 160,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: "gray",
        borderTopWidth: pixelWidth,
        flexDirection: "row"
    },
    confirmButtonLeft: {
        width: (width - 160 - pixelWidth) / 2,
        height: 40 - pixelWidth,
        alignItems: "center",
        justifyContent: "center"
    },
    confirmButtonRight: {
        width: (width - 160 - pixelWidth) / 2 + pixelWidth,
        height: 40 - pixelWidth,
        alignItems: "center",
        justifyContent: "center",
        borderLeftWidth: pixelWidth,
        borderLeftColor: "gray"
    },
    contentText: {
        color: "black"
    },
    buttonText: {
        color: "#0074FA"
    }
});