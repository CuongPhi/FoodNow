/*
 * @Author: An Nguyen 
 * @Date: 2018-11-04 18:11:35 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-01 22:39:44
 */
/*eslint-disable*/
import React, { PureComponent } from 'react';
import { Dimensions, Text, Image, View, NetInfo } from 'react-native';
import { Router, Scene, Stack, ActionConst, Actions, Tabs, Animations, Modal } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './cpn/LoginScreen/LoginScreen';
import MerchanListScreen from './cpn/MerchantList/MerchanListScreen';
import BasketScreen from './cpn/Basket/BasketScreen';
import Splash from './cpn/Splash/SplashScreen';
import CategoryListScreen from './cpn/CategoryList/CategoryListScreen';
import UserScreen from './cpn/UserScreen/UserScreen';
import NearMeScreen from './cpn/NearMe/NearMeScreen';
import NotificationsScreen from './cpn/NotificationsScreen/NotificationsScreen';
import MerchantDetailsScreen from './cpn/Merchant/MerchantDetailsScreen';
import MerchantProfileScreen from './cpn/Merchant/MerchantProfileScreen';
import MerchantComments from './cpn/Merchant/MerchantComments';
import OrderScreen from './cpn/OrderScreen/OrderScreen';

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
const notifUri = require('./assets/image/notification.png');
const notifTintUri = require('./assets/image/notification_disable.png');


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
            <Image source={focused ? iconUri : iconTintUri} style={{ width: 18, height: 18 }} />
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
        const { actions } = this.props;
        if (!isConnected) this.errorDialog.show()
        actions.netConnection(isConnected)
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
                    <Scene key="root" hideNavBar="true" animationEnabled={true}>
                        <Scene key="splash" component={() => <Splash />}  type='reset'/>
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
                            animationEnabled={true}
                            lazy={false}
                        >
                            <Scene
                                key="merchantlist"
                                component={() => <MerchanListScreen />}
                                title="Merchant List"
                                onBack={() => {
                                    Actions.refresh();
                                }}
                                hideNavBar={true}
                                iconUri={storeUri}
                                iconTintUri={storeTintUri}
                                icon={TabIcon}
                            />
                            <Scene
                                key="categorylist"
                                component={() => <CategoryListScreen />}
                                title="Category"
                                hideNavBar={true}
                                iconUri={categoryUri}
                                iconTintUri={categoryTintUri}
                                icon={TabIcon}
                            />
                            <Scene
                                key="userscreen"
                                component={() => <UserScreen />}
                                title="Account"
                                iconUri={userUri}
                                iconTintUri={userTintUri}
                                icon={TabIcon}
                                hideNavBar={true}
                            />
                            <Scene
                                key="notification"
                                component={() => <NotificationsScreen />}
                                title="Notification"
                                iconUri={notifUri}
                                iconTintUri={notifTintUri}
                                icon={TabIcon}
                            />
                        </Tabs>
                        <Scene 
                        key="nearMe"
                        component={()=><NearMeScreen />}
                        title="Near Me"
                        />
                        <Scene
                        key="details"
                        component={MerchantDetailsScreen}
                        title="Details"
                        />
                        <Scene 
                        key="profile"
                        component={MerchantProfileScreen}
                        title="Profile"
                        hideNavBar={true}
                        modal={true}
                        />
                        <Scene 
                        key="comments"
                        component={MerchantComments}
                        title="Comments"
                        modal={true}
                        headerMode="float"
                        hideNavBar={false}
                        />
                        <Scene 
                        key="order"
                        component={OrderScreen}
                        title="Basket"
                        hideNavBar={false}
                        navigationBarStyle={{
                            backgroundColor: Color.AColor.main,
                        }}
                        titleStyle={{
                            color:'white'
                        }}
                        navBarButtonColor='white'
                        />
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseApp)
