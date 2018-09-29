import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
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
  },
});
export default class SignIn extends PureComponent {
  render() {
    const { main, inputLayout, input, text, textLayout } = styles;
    const { style } = this.props;
    return (
      <View style={[main, style]}>
        <View style={inputLayout}>
          <CustomInput style={input} icon="user" placeholder="Username" />
        </View>

        <View style={inputLayout}>
          <CustomInput style={input} icon="key" placeholder="Password" secureTextEntry />
        </View>

        <CustomButton style={[inputLayout, input]} text="Sign in" />

        <View style={textLayout}>
          <TouchableOpacity onPress={() => Actions.signup()}>
            <Text style={text}>Create new account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.forgotpassword()}>
            <Text style={text}>Need help?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
