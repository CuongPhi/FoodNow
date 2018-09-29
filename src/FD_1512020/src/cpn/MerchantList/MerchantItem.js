import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  main: {
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    flex: 2,
    resizeMode: 'contain',
    height: 100,
    width: 100,
    borderRadius: 1,
  },
  infoLayout: {
    flex: 6,
    marginHorizontal: 10,
    alignSelf: 'stretch',
  },
  distanceLayout: {
    flex: 1,
    alignSelf: 'stretch',
  },
  textName: {
    fontFamily: 'Montserrat',
    color: '#2d3436',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textAddr: {
    fontFamily: 'Montserrat',
    fontSize: 11,
  },
  tagLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textTag: {
    fontFamily: 'Montserrat',
    color: '#2d3436',
    fontSize: 13,
    paddingLeft: 10,
  },
});
export default class MerchantItem extends Component {
  constructor(props) {
    super(props);
    this.item = props.item;
  }

  render() {
    const {
      textTag,
      main,
      image,
      infoLayout,
      distanceLayout,
      textName,
      textAddr,
      tagLayout,
    } = styles;
    const { item } = this;
    return (
      <View style={main}>
        <Image source={{ uri: item.source }} style={image} />
        <View style={infoLayout}>
          <Text style={textName} ellipsizeMode="tail" numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={textAddr} ellipsizeMode="tail" numberOfLines={1}>
            {item.address}
          </Text>
          <View style={tagLayout}>
            <Icon name="tag" color="#2d3436" />
            <Text style={textTag}>{item.price}</Text>
          </View>
        </View>
        <View style={distanceLayout}>
          <Text style={{ fontSize: 10 }}>{item.distance}</Text>
          <View style={tagLayout}>
            <Icon name="clock-o" color="#2d3436" />
            <Text style={{ fontSize: 12, marginLeft: 2 }}>{item.duration}</Text>
          </View>
        </View>
      </View>
    );
  }
}
