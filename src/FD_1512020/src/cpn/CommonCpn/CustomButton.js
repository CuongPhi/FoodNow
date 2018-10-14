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
  wrapperDisable: {
    backgroundColor: '#b2bec3',
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
});

export default class CustomButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDisable: props.disabled,
    };
  }

  disable() {
    this.setState({
      isDisable: true,
    });
  }

  enable() {
    this.setState({
      isDisable: false,
    });
  }

  render() {
    const { wrapper, textStyle, wrapperDisable } = styles;
    const { style, text } = this.props;
    const { isDisable } = this.state;
    return (
      <TouchableOpacity
        {...this.props}
        disabled={isDisable}
        style={[isDisable ? wrapperDisable : wrapper, style]}
      >
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
