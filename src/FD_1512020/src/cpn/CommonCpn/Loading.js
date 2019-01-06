import React from 'react';
import { View, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import Color from '../../assets/color/color';

const { width } = Dimensions.get('window');
const Loading = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: Color.PColor.faded_poster(1),
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Progress.Pie size={width * 0.2} indeterminate color={Color.AColor.main} />
  </View>
);

export default Loading;
