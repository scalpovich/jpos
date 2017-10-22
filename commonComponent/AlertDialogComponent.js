/**
 * Created by liuyandong on 2017/10/22.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions
} from "react-native";

let window = Dimensions.get("window");
let width = window.width;
let height = window.height;

export default class AlertDialogComponent extends Component {
    constructor(props) {
        super(props);
        this["state"] = {visible: false, type: "alert"};
    }

    alert() {
        this["setState"]({visible: true});
    }

    hide() {
        this["setState"]({visible: false});
    }

    renderAlertDialog() {
        return (
            <View style={{width: width - 80,position: "absolute", height: 40,
                bottom: 0, borderBottomRightRadius: 10, borderBottomLeftRadius: 10,
                alignItems: "center", justifyContent: "center", borderBottomWidth: 1}}>
                <TouchableOpacity style={{width: width - 80, height: 40, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, alignItems: "center", justifyContent: "center"}}
                                  onPress={this.hide.bind(this)}>
                    <Text style={{color: "#00AAEE", fontSize: 18}}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderConfirmDialog() {
        return (
            [
                <TouchableOpacity style={{width: (width - 80) / 2, position: "absolute", height: 40, backgroundColor: "#FFFFFF",
                    bottom: 0, borderBottomLeftRadius: 10,
                    alignItems: "center", justifyContent: "center", left: 0}}
                                  onPress={this.hide.bind(this)} key="a">
                    <Text style={{color: "#00AAEE", fontSize: 18}}>确定</Text>
                </TouchableOpacity>,
                <TouchableOpacity style={{width: (width - 80) / 2, position: "absolute", height: 40, backgroundColor: "#FFFFFF",
                    bottom: 0, borderBottomRightRadius: 10,
                    alignItems: "center", justifyContent: "center", right: 0}}
                                  onPress={this.hide.bind(this)} key="b">
                    <Text style={{color: "#00AAEE", fontSize: 18}}>取消</Text>
                </TouchableOpacity>
            ]
        );
    }

    render() {
        return (
            <Modal onRequestClose={() => {}}
                   animationType="fade"
                   visible={this.state.visible}
                   transparent={true}>
                <View style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
                    <View style={{backgroundColor: "#FFFFFF", position: "absolute", height: 160, width: width - 80, top: (height - 200) / 2, left: 40, borderRadius: 10}}>
                        <View style={{width: width - 80, height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: "center", alignItems: "center", paddingLeft: 10, paddingRight: 10}}>
                            <Text style={{fontSize: 18, color: "black"}}>保存成功！</Text>
                        </View>
                        {
                            this.state.type == "alert" ? this.renderAlertDialog(): this.renderConfirmDialog()
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}