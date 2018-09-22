import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  Text
} from 'react-native'
import CustomInput from '../CommonCpn/CustomInput'
import CustomButton from '../CommonCpn/CustomButton'

export default class SignIn extends PureComponent {
  render() {
    const { main, inputLayout, input, text, textLayout } = styles
    return (
      <View
        style={[main,this.props.style]}
      >
        <View style={inputLayout} >
          <CustomInput style={input} icon='user' placeholder='Username' />
        </View>

        <View style={inputLayout} >
          <CustomInput style={input} icon='key' placeholder='Password'  secureTextEntry={true}/>
        </View>

        <CustomButton style={[inputLayout, input]} text='Sign in' />

        <View 
        style={textLayout}
        >
          <Text style={text}>Create new account</Text>
          <Text style={text}>Need help?</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch', alignItems: 'center'
  },
  inputLayout: {
    marginVertical: 20, width: '80%'
  },
  input: {
    height: 50
  },
  text:{
    color:'#2d3436'
  },
  textLayout:{
    flexDirection:'row',justifyContent:'space-between',width:'80%'
  }
})