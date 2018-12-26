/*
 * @Author: An Nguyen 
 * @Date: 2018-12-23 08:20:44 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-23 08:32:07
 */
import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

export default class Fade extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  componentWillMount() {
    const { fadeAnim } = this.state;
    const { duration } = this.props;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
    }).start();
  }

  render() {
    const { visible, style, children, ...rest } = this.props;
    const { fadeAnim } = this.state;
    return (
      <Animated.View style={{ ...style, opacity: fadeAnim }} {...rest}>
        {children}
      </Animated.View>
    );
  }
}
