import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CustomInput from '../../CommonCpn/CustomInput';
import CustomButton from '../../CommonCpn/CustomButton';

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  inputLayout: {
    marginVertical: 10,
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

export default class SignUp extends PureComponent {
  render() {
    const { main, inputLayout, input, text, textLayout } = styles;
    const { style } = this.props;
    return (
      <View style={[main, style]}>
        <View style={inputLayout}>
          <CustomInput style={input} icon="user" placeholder="Username" />
        </View>

        <View style={inputLayout}>
          <CustomInput
            style={input}
            icon="envelope-square"
            placeholder="Email"
            textContentType="emailAddress"
          />
        </View>

        <View style={inputLayout}>
          <CustomInput style={input} icon="key" placeholder="Password" secureTextEntry={!false} />
        </View>

        <View style={inputLayout}>
          <CustomInput
            style={input}
            icon="key"
            placeholder="Re-Password"
            secureTextEntry={!false}
          />
        </View>

        <CustomButton style={[inputLayout, input]} text="Sign up" />
        <View style={textLayout}>
          <TouchableOpacity onPress={() => Actions.signin()}>
            <Text style={text}>Have an account already?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.forgotpassword()}>
            <Text style={text}>Need help?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
