import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  IconBadge: {
    position: 'absolute',
    top: 1,
    right: 1,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
  },
});

export default class IconBadge extends PureComponent {
  render() {
    const { MainViewStyle, MainElement, Hidden, IconBadgeStyle, BadgeElement } = this.props;
    return (
      <View style={[MainViewStyle || {}]}>
        {MainElement}
        {!Hidden && <View style={[styles.IconBadge, IconBadgeStyle || {}]}>{BadgeElement}</View>}
      </View>
    );
  }
}

IconBadge.propTypes = {
  MainElement: PropTypes.element.isRequired,
  BadgeElement: PropTypes.element.isRequired,
  MainViewStyle: PropTypes.object, //eslint-disable-line
  IconBadgeStyle: PropTypes.object, //eslint-disable-line
  Hidden: PropTypes.bool,
};

IconBadge.defaultProps = {
  MainViewStyle: {},
  IconBadgeStyle: {},
  Hidden: true,
};
