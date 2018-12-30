import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Color from '../../assets/color/color';

export default class ChangePasswordDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      password: true,
      text: '',
    };
    this.hide = this.hide.bind(this);
    this.hidecallback = undefined;
    this.handleShowPass = this.handleShowPass.bind(this);
    this.handleText = this.handleText.bind(this);
    this.exit = this.exit.bind(this);
  }

  show(callback) {
    this.setState({
      isShow: true,
    });
    this.hidecallback = callback;
  }

  hide() {
    const { text } = this.state;
    this.setState({
      isShow: false,
    });
    if (this.hidecallback) {
      this.hidecallback(text);
    }
  }

  exit() {
    this.setState({
      isShow: false,
    });
  }

  handleShowPass() {
    const { password } = this.state;
    this.setState({
      password: !password,
    });
  }

  handleText(text) {
    this.setState({
      text,
    });
  }

  render() {
    const { isShow, password, text } = this.state;
    return (
      <Modal
        isVisible={isShow}
        onBackdropPress={this.exit}
        onBackButtonPress={this.exit}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
      >
        <View
          style={{
            width: 280,
            borderRadius: 8,
            backgroundColor: 'white',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <Image
            source={require('../../assets/image/logo.png')}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              fontWeight: '200',
              fontSize: 24,
            }}
          >
            Update Password
          </Text>
          <Input
            containerStyle={{
              width: '80%',
              marginVertical: 20,
              borderRadius: 8,
              borderWidth: 1,
              paddingRight: 5,
            }}
            inputContainerStyle={{
              borderBottomColor: 'rgba(255, 255, 255, 0)',
            }}
            secureTextEntry={password}
            rightIcon={
              <Icon
                name={password ? 'eye-slash' : 'eye'}
                type="font-awesome"
                size={18}
                onPress={this.handleShowPass}
              />
            }
            value={text}
            onChangeText={this.handleText}
          />
          <TouchableOpacity
            onPress={this.hide}
            style={{
              width: '80%',
              padding: 5,
              backgroundColor: Color.AColor.main,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

// const mapStateToProps = state => ({
//   updatePass: state.updatePass,
// });

// const mapDispatchToProps = dispacth => ({
//   actions: bindActionCreators(actions, dispacth),
// });
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ChangePasswordDialog);
