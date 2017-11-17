/**
 * Created by liuyandong on 2017/11/17.
 */
import React, {Component} from "react";
import {AppRegistry, Navigator} from "react-native";
// import {Navigator} from "react-native-deprecated-custom-components";
import LoginView from "./views/login/LoginView";

import NavigatorView from "./views/navigator/NavigatorView";
import HH from "./views/login/LoginView";

/*class MainComponent extends Component {
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
}*/

AppRegistry.registerComponent("MainComponent", () => LoginView);