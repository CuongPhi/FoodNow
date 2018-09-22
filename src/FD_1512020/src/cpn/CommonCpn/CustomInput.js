import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements';

export default class CustomInput extends Component {

    render() {
        const { wrapper, inputStyle } = styles
        return (
            <View
                style={[wrapper,this.props.style]}
            >
                <Input
                    placeholder={this.props.placeholder}
                    placeholderTextColor='#fff'
                    inputStyle={inputStyle}
                    inputContainerStyle={{
                        borderBottomColor: 'rgba(255, 255, 255, 0)',
                    }}
                    leftIcon={
                        <Icon
                            name={this.props.icon}
                            size={24}
                            color='white'
                        />
                    }
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                    textContentType={this.props.textContentType}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(87, 90, 91, 0.6)',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30
    },
    inputStyle: {
        color: 'white'
    }
})