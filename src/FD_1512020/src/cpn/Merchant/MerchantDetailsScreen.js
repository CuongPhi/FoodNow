import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, SectionList } from 'react-native';
import Color from '../../assets/color/color'
import CStyles from '../../assets/styles/styles'
import DishItem from './DishItem'

let item = {
  source: 'https://media.foody.vn/res/g68/675439/s600x600/201866105610-122.jpg',
  name: 'Sữa Tươi Trân Châu Đường Nâu Classic - Size Prince',
  hint: 'Hổng thích để đá',
  price: '42.000 đ',
  sale: '20.000đ'
}

export default class MerchantDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.data = [
      {
        title: "SỮA TƯƠI TRÂN CHÂU ĐƯỜNG NÂU",
        data: [{
          source: 'https://media.foody.vn/res/g68/675439/s600x600/201866105610-122.jpg',
          name: 'Sữa Tươi Trân Châu Đường Nâu Classic - Size Prince',
          hint: 'Hổng thích để đá',
          price: '42.000 đ',
          sale: '20.000đ'
        }, {
          source: 'https://media.foody.vn/res/g68/675439/s600x600/201866105635-1211.jpg',
          name: 'Sữa Tươi Cheese TCĐN Giòn - Size Prince',
          hint: '',
          price: '59.000 đ',
          sale: ''
        }, {
          source: 'https://media.foody.vn/res/g68/675439/s600x600/2018816224713-sd.jpg',
          name: 'Sữa Tươi Trân Châu Hoàng Gia Đường Nâu - Size Prince',
          hint: '',
          price: '55,000 đ',
          sale: '30.000đ'
        }]
      },
      {
        title: "TRÀ SỮA",
        data: [{
          source: 'https://media.foody.vn/res/g68/675439/s600x600/2018426174454-foody-britea-english-tea-house-540-636581154287853435.jpg',
          name: 'Trà Sữa Kem Phô Mai Hoàng Gia',
          hint: 'Không thể để đá riêng',
          price: '48,000 đ',
          sale: ''
        }, {
          source: 'https://media.foody.vn/res/g68/675439/s600x600/2018426174454-foody-britea-english-tea-house-540-636581154287853435.jpg',
          name: 'Trà Sữa Hoàng Gia Anh TC Hoàng Gia',
          hint: 'thêm cheese foam mới có thể thêm cheese sợi/ Không thể để đá riêng',
          price: '45,000đ',
          sale: ''
        }]
      }
    ]
  }
  render() {
    const { DetailLayoutContainer, DeatailLayout } = style
    return (
      <View style={CStyles.main}>
        <View style={{ flex: 1, backgroundColor: Color.PColor.light_grennish_blue(1), }}>
          <Text>FoodNOW - Navigation will be here</Text>
        </View>
        <View style={DetailLayoutContainer}>
          <View style={[DeatailLayout, CStyles.shadowBox]}>
            <ImageBackground
              source={{ uri: 'https://vuakhuyenmai.vn/wp-content/uploads/2017/11/britea-english-tea-house-sale-16-11-2017.jpg' }}
              style={{ flex: 1, justifyContent: 'flex-end' }}
              imageStyle={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
            >
              <View
                style={{
                  height: 'auto',
                  backgroundColor: Color.PColor.soothing_breeze(0.5),
                }}
              >
                <Text style={{
                  color: 'white',
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                  fontSize: 14,
                  padding: 5,
                  paddingLeft: 10
                }}>Britea - English Tea House - Ngô Đức Kế</Text>
                <Text style={{
                  color: 'white',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                  padding: 5,
                  paddingLeft: 10
                }}>60 Ngô Đức Kế, P. Bến Nghé,  Quận 1, TP. HCM</Text>
              </View>
            </ImageBackground>
            <View style={{ flex: 4 }}>
              <SectionList
                sections={this.data}
                renderItem={({ item, index, section }) => <DishItem item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={{ fontWeight: 'bold', paddingLeft: 10 }}>{title}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  DetailLayoutContainer: {
    flex: 9, padding: 10
  },
  DeatailLayout: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    borderRadius: 2,
    paddingBottom: 2,
  }
})