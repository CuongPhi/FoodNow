import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomInput from '../../CommonCpn/CustomInput';
import CustomButton from '../../CommonCpn/CustomButton';

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  inputLayout: {
    marginVertical: 20,
    width: '80%',
  },
  input: {
    height: 50,
  },
  text: {
    color: '#2d3436',
  },
  textLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 10,
  },
});
export default class ForgotPassword extends PureComponent {
  render() {
    const { main, inputLayout, input, text, textLayout } = styles;
    const { style } = this.props;
    return (
      <View style={[main, style]}>
        <View style={textLayout}>
          <Text textAlign="justify" style={text}>
            {`Please enter your email address and we'll send you an email to reset your password`}
          </Text>
        </View>
        <View style={inputLayout}>
          <CustomInput style={input} icon="envelope-square" placeholder="Email" />
        </View>

        <CustomButton style={[inputLayout, input]} text="Reset Password" />
      </View>
    );
  }
}
