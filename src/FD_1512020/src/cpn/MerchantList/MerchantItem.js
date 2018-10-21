import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';

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
    const { main, image, infoLayout, textName, tagLayout } = styles;
    const { item } = this;
    return (
      <View style={main}>
        <Image source={{ uri: item.image }} style={image} />
        <View style={infoLayout}>
          <Text style={textName} ellipsizeMode="tail" numberOfLines={1}>
            {item.name}
          </Text>
          <Rating imageSize={20} readonly startingValue={item.rating} style={tagLayout} />
        </View>
      </View>
    );
  }
}
