import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import _ from 'lodash';
import CStyles from '../../assets/styles/styles';
import Color from '../../assets/color/color';
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
    fontSize: 12,
  },
});

export default class DishItem extends PureComponent {
  render() {
    const { textName, textDes, textTag } = styles;
    const { item, onSelect } = this.props;
    const price = _.get(item, 'price', '');
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
          <Image
            source={{ uri: item.image }}
            style={[
              CStyles.listItemThumbnail,
              {
                width: 'auto',
                height: '100%',
                minHeight: 80,
              },
            ]}
          />
          <View style={CStyles.listItem2ndLayout}>
            <Text style={textName}>{item.name}</Text>
            <Text style={textDes}>{item.sold}</Text>
            <Text style={textTag}>{utils.vndFormat(price)}</Text>
          </View>
          <View
            style={[
              CStyles.listItem3rdLayout,
              {
                justifyContent: 'center',
              },
            ]}
          >
            <Button title="+" style={{ alignSelf: 'center' }} onPress={onSelect} />
          </View>
        </View>
        <Divider
          style={{
            backgroundColor: Color.AColor.divider,
            height: 1,
            width: '80%',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }
}
