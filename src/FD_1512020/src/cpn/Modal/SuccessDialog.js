import React, { Component } from 'react';
import { View, Text, TouchableOpacity, PixelRatio, Image } from 'react-native';
import Modal from 'react-native-modal';

export default class SuccessDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      message: props.message,
    };
    this.hide = this.hide.bind(this);
    this.hidecallback = undefined;
  }

  setMessage(mess) {
    this.setState({
      message: mess,
    });
  }

  show(callback) {
    this.setState({
      isShow: true,
    });
    this.hidecallback = callback;
  }

  hide() {
    this.setState({
      isShow: false,
    });
    if (this.hidecallback) {
      this.hidecallback();
    }
  }

  render() {
    const { isShow, message } = this.state;
    const { title, doneTitle } = this.props;
    return (
      <Modal isVisible={isShow}>
        <View
          style={{
            width: PixelRatio.get() * 70,
            borderRadius: PixelRatio.get() * 1,
            backgroundColor: 'white',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            padding: PixelRatio.get() * 2,
          }}
        >
          <Image
            source={require('../../assets/image/checked.png')}
            style={{
              width: PixelRatio.get() * 20,
              height: PixelRatio.get() * 20,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              fontWeight: '200',
              fontSize: 28 / PixelRatio.getFontScale(),
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 16 / PixelRatio.getFontScale(),
              padding: PixelRatio.get() * 2,
            }}
          >
            {message}
          </Text>
          <TouchableOpacity
            onPress={this.hide}
            style={{
              width: '80%',
              padding: PixelRatio.get() * 2,
              backgroundColor: '#5def7d',
              borderRadius: PixelRatio.get() * 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{doneTitle}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
