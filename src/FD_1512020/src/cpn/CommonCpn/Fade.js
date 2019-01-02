/*
 * @Author: An Nguyen 
 * @Date: 2018-12-23 08:20:44 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 02:32:00
 */
import React, { PureComponent } from 'react';
import * as Animatable from 'react-native-animatable';

export default class Fade extends PureComponent {
  render() {
    const { visible, style, children, ...rest } = this.props;
    return (
      <Animatable.View style={{ ...style }} {...rest} animation="fadeInUp">
        {children}
      </Animatable.View>
    );
  }
}
