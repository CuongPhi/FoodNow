import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../CommonCpn/CustomInput'
import CustomButton from '../CommonCpn/CustomButton'

export default class SignUp extends PureComponent {

    render() {
        const { main, inputLayout, input, text, textLayout } = styles

        return (
            <View style={[main, this.props.style]}>
                <View style={inputLayout} >
                    <CustomInput style={input} icon='user' placeholder='Username' />
                </View>

                <View style={inputLayout} >
                    <CustomInput style={input} icon='envelope-square' placeholder='Email' textContentType='emailAddress' />
                </View>

                <View style={inputLayout} >
                    <CustomInput style={input} icon='key' placeholder='Password' secureTextEntry={true} />
                </View>

                <View style={inputLayout} >
                    <CustomInput style={input} icon='key' placeholder='Re-Password' secureTextEntry={true} />
                </View>

                <CustomButton style={[inputLayout, input]} text='Sign up' />
                <View
                    style={textLayout}
                >
                    <Text style={text}>Have an account already?</Text>
                    <Text style={text}>Need help?</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        alignSelf: 'stretch', alignItems: 'center'
    },
    inputLayout: {
        marginVertical: 10, width: '80%'
    },
    input: {
        height: 50
    },
    text: {
        color: '#2d3436'
    },
    textLayout: {
        flexDirection: 'row', justifyContent: 'space-between', width: '80%'
    }
})