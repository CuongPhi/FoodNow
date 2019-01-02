import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Color from '../../assets/color/color';

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { value, onUpdate, onRemove } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.minus.bounceIn(300);
            onRemove();
          }}
        >
          <Animatable.View
            ref={x => {
              this.minus = x;
            }}
          >
            <Icon name="minus-circle" size={30} color={Color.PColor.chigong(1)} />
          </Animatable.View>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, color: 'black' }}>{value}</Text>
        <TouchableOpacity
          onPress={() => {
            this.plus.bounceIn(300);
            onUpdate();
          }}
        >
          <Animatable.View
            ref={x => {
              this.plus = x;
            }}
          >
            <Icon name="plus-circle" size={30} color={Color.PColor.electron_blue(1)} />
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  }
}
