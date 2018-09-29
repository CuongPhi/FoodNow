import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';
import MerchantItem from './MerchantItem';
import Color from '../../assets/color/color';
import CStyles from '../../assets/styles/styles';

export default class MerchantListScreen extends Component {
  constructor(props) {
    super(props);
    this.itemList = [
      {
        name: 'Britea - English Tea House - Ngô Đức Kế',
        address: '60 Ngô Đức Kế, P. Bến Nghé,  Quận 1, TP. HCM',
        source: 'https://media.foody.vn/res/g68/675439/s60x60/201881814565-m1hh.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {
        name: 'Ngọc Châu - Bánh Mì & Xôi Mặn',
        address: '4 Nguyễn Thị Tần, P. 3, Quận 8, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/754026/prof/s480x300/foody-upload-api-foody-mobile-2-jpg-180628161528.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '15pt',
      },
      {
        name: 'A Tuấn - Cháo Ếch Singapore - Nguyễn Hữu Thọ',
        address: '77 Nguyễn Hữu Thọ,  Quận 7, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/750814/prof/s576x330/foody-upload-api-foody-mobile-foody-mobile-ce3-jpg-180615134706.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {
        name: 'Britea - English Tea House - Ngô Đức Kế',
        address: '60 Ngô Đức Kế, P. Bến Nghé,  Quận 1, TP. HCM',
        source: 'https://media.foody.vn/res/g68/675439/s60x60/201881814565-m1hh.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {
        name: 'Ngọc Châu - Bánh Mì & Xôi Mặn',
        address: '4 Nguyễn Thị Tần, P. 3, Quận 8, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/754026/prof/s480x300/foody-upload-api-foody-mobile-2-jpg-180628161528.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '15pt',
      },
      {
        name: 'A Tuấn - Cháo Ếch Singapore - Nguyễn Hữu Thọ',
        address: '77 Nguyễn Hữu Thọ,  Quận 7, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/750814/prof/s576x330/foody-upload-api-foody-mobile-foody-mobile-ce3-jpg-180615134706.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {
        name: 'Britea - English Tea House - Ngô Đức Kế',
        address: '60 Ngô Đức Kế, P. Bến Nghé,  Quận 1, TP. HCM',
        source: 'https://media.foody.vn/res/g68/675439/s60x60/201881814565-m1hh.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {
        name: 'Ngọc Châu - Bánh Mì & Xôi Mặn',
        address: '4 Nguyễn Thị Tần, P. 3, Quận 8, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/754026/prof/s480x300/foody-upload-api-foody-mobile-2-jpg-180628161528.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '15pt',
      },
      {
        name: 'A Tuấn - Cháo Ếch Singapore - Nguyễn Hữu Thọ',
        address: '77 Nguyễn Hữu Thọ,  Quận 7, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/750814/prof/s576x330/foody-upload-api-foody-mobile-foody-mobile-ce3-jpg-180615134706.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {
        name: 'Britea - English Tea House - Ngô Đức Kế',
        address: '60 Ngô Đức Kế, P. Bến Nghé,  Quận 1, TP. HCM',
        source: 'https://media.foody.vn/res/g68/675439/s60x60/201881814565-m1hh.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {
        name: 'Ngọc Châu - Bánh Mì & Xôi Mặn',
        address: '4 Nguyễn Thị Tần, P. 3, Quận 8, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/754026/prof/s480x300/foody-upload-api-foody-mobile-2-jpg-180628161528.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '15pt',
      },
      {
        name: 'A Tuấn - Cháo Ếch Singapore - Nguyễn Hữu Thọ',
        address: '77 Nguyễn Hữu Thọ,  Quận 7, TP. HCM',
        source:
          'https://images.foody.vn/res/g76/750814/prof/s576x330/foody-upload-api-foody-mobile-foody-mobile-ce3-jpg-180615134706.jpg',
        price: '25.000 đ - 75.000đ',
        distance: '>3.0km',
        duration: '56pt',
      },
      {},
    ];
  }

  render() {
    const { main } = CStyles;
    return (
      <View style={main}>
        <View style={{ flex: 1, backgroundColor: Color.PColor.light_grennish_blue(1) }}>
          <Text>FoodNOW - Navigation will be here</Text>
        </View>
        <View style={{ flex: 9 }}>
          <FlatList
            data={this.itemList}
            renderItem={({ item }) => {
              if (item.name != null) {
                return <MerchantItem item={item} />;
              }
              return <Loader />;
            }}
            keyExtractor={(item, index) => index.toString()}
            style={{ backgroundColor: '#fff', marginVertical: 10 }}
            nestedScrollEnabled
          />
        </View>
      </View>
    );
  }
}

// const style = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: '#fab1a0'
//   }
// })

const Loader = () => (
  <ContentLoader height={100} duration={1000}>
    <Circle cx="40" cy="30" r="30" />
    <Rect x="100" y="13" rx="4" ry="4" width="100" height="13" />
    <Rect x="100" y="37" rx="4" ry="4" width="50" height="8" />
  </ContentLoader>
);
