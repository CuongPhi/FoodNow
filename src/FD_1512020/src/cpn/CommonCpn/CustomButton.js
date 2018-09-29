import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fd79a8',
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'Montserrat',
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default class CustomButton extends PureComponent {
  render() {
    const { wrapper, textStyle } = styles;
    const { style, text } = this.props;
    return (
      <TouchableOpacity style={[wrapper, style]}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
