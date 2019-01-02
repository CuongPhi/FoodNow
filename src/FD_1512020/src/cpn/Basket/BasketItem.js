import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
import { Divider } from 'react-native-elements';
import CStyles from '../../assets/styles/styles';
import NumberPicker from '../CommonCpn/NumberPicker';
import * as utils from '../../ultilies/Utils';

const styles = StyleSheet.create({
  textName: {
    fontFamily: 'Montserrat',
    color: '#2d3436',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textDes: {
    fontFamily: 'Montserrat',
    fontSize: 10,
  },
  textTag: {
    fontFamily: 'Montserrat',
    color: '#2f2f2f',
    fontSize: 10,
  },
});

export default class BasketItem extends PureComponent {
  render() {
    const { textName, textTag } = styles;
    const { item, count, onUpdate, onRemove } = this.props;
    const price = _.get(item, 'price', 0);
    const name = _.get(item, 'name', '');
    return (
      <View>
        <View
          style={[
            CStyles.listItemLayout,
            {
              height: 'auto',
              padding: 5,
              paddingRight: 0,
            },
          ]}
        >
          <View style={[CStyles.listItem2ndLayout, { justifyContent: 'center' }]}>
            <Text style={textName}>{name}</Text>
            <Text style={[textTag]}>{utils.vndFormat(price)}</Text>
          </View>
          <View
            style={[
              CStyles.listItem3rdLayout,
              {
                justifyContent: 'flex-end',
                flex: 3,
              },
            ]}
          >
            <Text
              style={[
                textTag,
                {
                  textAlign: 'center',
                  fontSize: 15,
                },
              ]}
            >
              {`${utils.vndFormat(price * count)}`}
            </Text>
            <NumberPicker value={count} onUpdate={onUpdate} onRemove={onRemove} />
          </View>
        </View>
        <Divider />
      </View>
    );
  }
}
