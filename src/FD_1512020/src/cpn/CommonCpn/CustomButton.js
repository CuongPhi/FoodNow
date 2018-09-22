import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class CustomButton extends PureComponent {

    render() {
        const { wrapper, text } = styles
        return (
            <TouchableOpacity style={[wrapper,this.props.style]}>
                <Text
                    style={text}
                >
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fd79a8',
        alignItems: 'center',
        borderRadius: 30,
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
    }
})
