/*
 * @Author: An Nguyen 
 * @Date: 2018-11-04 18:11:35 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-11-05 00:05:43
 */
/*eslint-disable*/
import React, { PureComponent } from 'react';
import { Dimensions, Text, Image, View, NetInfo } from 'react-native';
import { Router, Scene, Stack, ActionConst, Actions, Tabs } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginScreen from './cpn/LoginScreen/LoginScreen';
import MerchanListScreen from './cpn/MerchantList/MerchanListScreen';
import MerchantDetailsScreen from './cpn/Merchant/MerchantDetailsScreen';
import BasketScreen from './cpn/Basket/BasketScreen';
import Splash from './cpn/Splash/SplashScreen';
import CategoryListScreen from './cpn/CategoryList/CategoryListScreen';
import UserScreen from './cpn/UserScreen/UserScreen';

import * as InfoActions from './feature/info/action';
import * as Dialog from './cpn/Modal/Dialog';
import DeliveryButton from './cpn/NavBar/DeliveryButton';
import Color from './assets/color/color';

import store from './store';

const storeUri = require('./assets/image/store.png');
const storeTintUri = require('./assets/image/store_disable.png');
const categoryUri = require('./assets/image/category.png');
const categoryTintUri = require('./assets/image/category_disable.png');
const userUri = require('./assets/image/user.png');
const userTintUri = require('./assets/image/user_disable.png');

function TabIcon(props) {
    const { focused, iconUri, iconTintUri } = props;
    return (
        <View
            style={
                focused
                    ? {
                        height: '100%',
                        aspectRatio: 1,
                        backgroundColor: 'white',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                    : {}
            }
        >
            <Image source={focused ? iconUri : iconTintUri} style={{ width: 22, height: 25 }} />
        </View>
    );
}

const ConnectedRouter = connect()(Router);

class BaseApp extends PureComponent {
    constructor(props) {
        super(props);
        this.errorDialog = undefined;
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    componentDidMount() {
        const { actions } = this.props;
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().then(isConnected => {
            if(!isConnected) this.errorDialog.show()
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange(isConnected) {
        if (!isConnected) this.errorDialog.show()
    }

    render() {
        const { height, width } = Dimensions.get('window');
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <ConnectedRouter>
                    <Scene key="root" hideNavBar="true">
                        <Scene key="splash" component={() => <Splash />} initial />
                        <Scene key="auth" hideNavBar="true">
                            <Scene
                                key="signin"
                                component={() => <LoginScreen type="signin" />}
                                title="Sign In"
                                initial
                            />
                            <Scene
                                key="signup"
                                component={() => <LoginScreen type="signup" />}
                                title="Sign Up"
                            />
                            <Scene
                                key="forgotpassword"
                                component={() => <LoginScreen type="forgotpassword" />}
                                title="Forgot Password"
                            />
                        </Scene>
                        <Tabs
                            key="main"
                            onBack={() => {
                                init = 'true';
                            }}
                            navigationBarStyle={{
                                backgroundColor: Color.AColor.main,
                            }}
                            titleStyle={{
                                color: 'white',
                            }}
                            tabStyle={{
                                backgroundColor: Color.PColor.pico_8_pink(0.8),
                            }}
                            showLabel={false}
                            tabBarPosition="bottom"
                        >
                            <Scene
                                key="merchantlist"
                                component={() => <MerchanListScreen />}
                                title="Merchant List"
                                onBack={() => {
                                    Actions.refresh();
                                }}
                                renderTitle={<DeliveryButton location="" />}
                                iconUri={storeUri}
                                iconTintUri={storeTintUri}
                                icon={TabIcon}
                            />
                            <Scene
                                key="categorylist"
                                component={() => <CategoryListScreen />}
                                title="Category"
                                renderTitle={<DeliveryButton location="" />}
                                iconUri={categoryUri}
                                iconTintUri={categoryTintUri}
                                icon={TabIcon}
                            />
                            <Scene
                                key="userscreen"
                                component={() => <UserScreen />}
                                title="Forgot Password"
                                iconUri={userUri}
                                iconTintUri={userTintUri}
                                icon={TabIcon}
                            />
                        </Tabs>
                    </Scene>
                </ConnectedRouter>
                <Dialog.ErrorDialog
                    ref={x => {
                        this.errorDialog = x;
                    }}
                    title="Error"
                    message="No internet connection!"
                    doneTitle="OK"
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    info: state.info
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(InfoActions, dispatch),
});
export default BaseApp;
