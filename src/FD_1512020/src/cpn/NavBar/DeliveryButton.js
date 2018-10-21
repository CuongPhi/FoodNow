import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class DeliveryButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    return (
      <TouchableOpacity style={{}}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '200',
            fontSize: 16,
            paddingLeft: 10,
            opacity: 0.8,
          }}
        >
          DELIVERY TO
        </Text>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Icon name="map-marker-alt" size={20} color="#fff" />
          <Text>{location}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
