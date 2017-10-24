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
    PixelRatio
} from "react-native";

let window = Dimensions.get("window");
let width = window.width;
let height = window.height;
var pixelWidth = 1 / PixelRatio.get();

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
            <View style={{width: width - 80, height: 40, alignItems: "center", justifyContent: "center", borderTopColor: "gray", borderTopWidth: pixelWidth}}>
                <TouchableOpacity style={{width: width - 80, height: 40 - pixelWidth, alignItems: "center", justifyContent: "center"}}
                                  onPress={this.state.handleOkButtonOnPress}>
                    <Text style={{color: "#0074FA"}}>{this.state.okText}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderConfirmDialog() {
        return (
            <View style={{width: width - 80, height: 40, alignItems: "center", justifyContent: "center", borderTopColor: "gray", borderTopWidth: pixelWidth, flexDirection: "row"}}>
                <TouchableOpacity style={{width: (width - 80 - pixelWidth) / 2, height: 40 - pixelWidth, alignItems: "center", justifyContent: "center"}}
                                  onPress={this.state.handleOkButtonOnPress}>
                    <Text style={{color: "#0074FA"}}>确定</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: (width - 80 - pixelWidth) / 2 + pixelWidth, height: 40 - pixelWidth, alignItems: "center", justifyContent: "center", borderLeftWidth: pixelWidth, borderLeftColor: "gray"}}
                                  onPress={this.state.handleCancelButtonOnPress}>
                    <Text style={{color: "#0074FA"}}>取消</Text>
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
                    <View style={{backgroundColor: "#FFFFFF", height: 160, width: width - 80, borderRadius: 10}}>
                        <View style={{width: width - 80, height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: "center", alignItems: "center", paddingLeft: 10, paddingRight: 10}}>
                            <Text style={{color: "black"}}>{this.state.content}</Text>
                        </View>
                        {this.state.type == "alert" ? this.renderAlertDialog() : this.renderConfirmDialog()}
                    </View>
                </View>
            </Modal>
        );
    }
}