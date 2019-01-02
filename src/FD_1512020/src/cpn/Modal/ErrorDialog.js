import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';

export default class ErrorDialog extends Component {
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
            source={require('../../assets/image/cancel.png')}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              fontWeight: '200',
              fontSize: 28,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              padding: 10,
            }}
          >
            {message}
          </Text>
          <TouchableOpacity
            onPress={this.hide}
            style={{
              width: '80%',
              padding: 5,
              backgroundColor: '#f44242',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: 'white',
              }}
            >
              {doneTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
