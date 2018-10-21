/*
 * @Author: An Nguyen 
 * @Date: 2018-10-21 00:31:34 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-10-21 03:32:33
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';

const styles = StyleSheet.create({
  main: {
    height: 200,
    width: null,
    marginVertical: 3,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class MerchantItemV2 extends Component {
  constructor(props) {
    super(props);
    this.item = props.item;
  }

  render() {
    const { item } = this;
    const { main } = styles;
    return (
      <ImageBackground source={{ uri: item.image }} style={main}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(0,0,0,1)']}
          style={{
            alignSelf: 'flex-end',
            width: '100%',
            height: '30%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              opacity: 1,
              fontSize: 20,
              fontWeight: '300',
              color: 'white',
              textAlign: 'center',
              width: '80%',
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <StarRating
            disabled
            maxStars={5}
            rating={item.rating}
            fullStarColor="#fdcb6e"
            emptyStar="ios-star-outline"
            fullStar="ios-star"
            halfStar="ios-star-half"
            iconSet="Ionicons"
            starSize={30}
            emptyStarColor="#fdcb6e"
            containerStyle={{
              height: 50,
            }}
            starStyle={{
              marginBottom: 20,
            }}
          />
        </LinearGradient>
      </ImageBackground>
    );
  }
}
