import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';

const DeliveryButton = props => {
  const { userInfo } = props;
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
        <Text>{userInfo.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(DeliveryButton);
