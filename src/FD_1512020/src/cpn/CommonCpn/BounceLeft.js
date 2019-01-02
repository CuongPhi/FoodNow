/*
 * @Author: An Nguyen 
 * @Date: 2019-01-02 21:53:45 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 21:56:34
 */
import React, { PureComponent } from 'react';
import * as Ani from 'react-native-animatable';

export default class BounceLeft extends PureComponent {
  render() {
    const { visible, style, children, ...rest } = this.props;
    return (
      <Ani.View style={{ ...style }} {...rest} animation="bounceInLeft">
        {children}
      </Ani.View>
    );
  }
}
