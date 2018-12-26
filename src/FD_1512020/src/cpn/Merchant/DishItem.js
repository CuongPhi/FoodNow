import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import CStyles from '../../assets/styles/styles';
import Color from '../../assets/color/color';

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

// 12-26 22:57:13.248 18215 24868 I ReactNativeJS:         { id: 1306,
// 12-26 22:57:13.248 18215 24868 I ReactNativeJS:           name: 'Pizza Hải sản cao cấp (Size nhỏ)',
// 12-26 22:57:13.248 18215 24868 I ReactNativeJS:           idFoodCategory: 6,
// 12-26 22:57:13.248 18215 24868 I ReactNativeJS:           idRestaurant: 13,
// 12-26 22:57:13.248 18215 24868 I ReactNativeJS:           image: 'http://a9.vietbao.vn/images/vn899/120/2018/04/20180419-huong-vi-bien-ca-trong-pizza-vien-tom-nuong-hai-san-cao-cap-1.jpg',
// 12-26 22:57:13.248 18215 24868 I ReactNativeJS:           price: 265000,
// 12-26 22:57:13.248 18215 24868 I ReactNativeJS:           sold: 130 }
export default class DishItem extends PureComponent {
  render() {
    const { textName, textDes, textTag } = styles;
    const { item } = this.props;
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
            <Text style={textTag}>{item.price}</Text>
          </View>
          <View
            style={[
              CStyles.listItem3rdLayout,
              {
                justifyContent: 'center',
              },
            ]}
          >
            <Button title="+" style={{ alignSelf: 'center' }} />
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
