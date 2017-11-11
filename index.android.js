/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {AppRegistry} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import LoginView from "./views/login/LoginView";

import NavigatorView from "./views/navigator/NavigatorView";

class MainComponent extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{component: LoginView, parameters: {}}}
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

AppRegistry.registerComponent("MainComponent", () => NavigatorView);
