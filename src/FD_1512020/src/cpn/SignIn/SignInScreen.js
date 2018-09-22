import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
} from 'react-native'
import SignIn from './SignIn'

export default class SignInScreen extends PureComponent {
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
                <SignIn style={{flex:1}}/>
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