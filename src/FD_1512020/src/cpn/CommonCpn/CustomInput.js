import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Color from '../../assets/color/color';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(87, 90, 91, 0.6)',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
  },
  inputStyle: {
    color: 'white',
  },
  inputStyleError: {
    color: Color.AColor.error,
  },
});
export default class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: true,
      txt: '',
    };
    this.textInput = undefined;
  }

  getValue() {
    const { txt } = this.state;
    return txt;
  }

  focus() {
    this.textInput.focus();
  }

  render() {
    const { wrapper, inputStyle, inputStyleError } = styles;
    const {
      style,
      placeholder,
      onChangeText,
      secureTextEntry,
      textContentType,
      icon,
      onSubmitEditing,
    } = this.props;
    const { isTrue, txt } = this.state;
    return (
      <View style={[wrapper, style]}>
        <Input
          ref={x => {
            this.textInput = x;
          }}
          placeholder={placeholder}
          placeholderTextColor="#fff"
          inputStyle={isTrue ? inputStyle : inputStyleError}
          inputContainerStyle={{
            borderBottomColor: 'rgba(255, 255, 255, 0)',
          }}
          value={txt}
          leftIcon={<Icon name={icon} size={24} color={isTrue ? 'white' : Color.AColor.error} />}
          onChangeText={text => {
            this.setState({
              isTrue: !onChangeText || onChangeText(text),
              txt: text,
            });
          }}
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
}
