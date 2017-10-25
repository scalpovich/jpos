/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {AppRegistry} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import LoginComponent from "./login/LoginComponent";

class MainComponent extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{component: LoginComponent, parameters: {}}}
                renderScene={(route, navigator) =>
                    <route.component route={route} navigator={navigator} {...route.parameters}></route.component>
                }
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight
                }}>
            </Navigator>
        );
    }
}
AppRegistry.registerComponent("MainComponent", () => MainComponent);
