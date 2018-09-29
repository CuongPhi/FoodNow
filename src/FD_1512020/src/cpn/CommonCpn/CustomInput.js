import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

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
});
export default class CustomInput extends PureComponent {
  render() {
    const { wrapper, inputStyle } = styles;
    const { style, placeholder, onChangeText, secureTextEntry, textContentType, icon } = this.props;
    return (
      <View style={[wrapper, style]}>
        <Input
          placeholder={placeholder}
          placeholderTextColor="#fff"
          inputStyle={inputStyle}
          inputContainerStyle={{
            borderBottomColor: 'rgba(255, 255, 255, 0)',
          }}
          leftIcon={<Icon name={icon} size={24} color="white" />}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
        />
      </View>
    );
  }
}
