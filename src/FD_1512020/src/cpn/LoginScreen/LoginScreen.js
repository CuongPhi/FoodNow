import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    Animated
} from 'react-native'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { Router, Scene } from 'react-native-router-flux';

export default class LoginScreen extends PureComponent {
    constructor(props) {
        super(props)
    }
    renderTypeView(params) {
        console.log(params)
        switch (params) {
            case 'signup':
                return <SignUp style={{ flex: 3 }} switch={this.handle} />
            case 'signin':
                return <SignIn style={{ flex: 1 }} switch={this.handle} />
            case 'forgotpassword':
                return <ForgotPassword style={{ flex: 1 }} />
        }
    }
    render() {
        const { main, brand, brandWrapper, inputLayout, input } = styles
        return (
            <ImageBackground
                source={require('../../assets/image/FD_background.jpg')}
                style={main}
                blurRadius={0.5}
            >
                <View
                    style={brandWrapper}
                >
                    <Image
                        source={require('../../assets/image/logo.png')}
                        style={brand}
                    />
                </View>
                {this.renderTypeView(this.props.type)}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brand: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    brandWrapper: {
        flex: 1,
        width: '80%',
    },
    inputLayout: {
        marginVertical: 20, width: '80%'
    },
    input: {
        height: 50
    }
})