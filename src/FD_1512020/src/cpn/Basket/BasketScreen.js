import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, FlatList } from 'react-native';

import { Header, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';

import Color from '../../assets/color/color'
import CStyles from '../../assets/styles/styles'
import BasketItem from './BasketItem';


export default class BasketScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { main } = CStyles
        const { wrapper, text1, textAddr, boxLayout } = styles
        return (
            <View style={[main, { backgroundColor: Color.PColor.city_light(1) }]}>
                <Header
                    leftComponent={
                        <Icon
                            name='times-circle'
                            color={Color.PColor.dracula_orchid(1)}
                            size={20}
                        />
                    }
                    centerComponent={
                        <Text style={{
                            fontFamily: 'Montserrat',
                            fontWeight: 'bold',
                            color: Color.PColor.dracula_orchid(1)
                        }}>CART</Text>
                    }
                    rightComponent={
                        <Icon
                            name='sync-alt'
                            color={Color.PColor.dracula_orchid(1)}
                            size={20}
                        />}
                    backgroundColor='white'
                />
                <View style={wrapper}>
                    <ScrollView>
                        <View style={[CStyles.shadowBox, boxLayout]}>
                            <Text style={text1} >Deivery To</Text>
                            <Text style={textAddr}>889 Phạm Thế Hiển</Text>
                            <TextInput
                                placeholder='Note'
                                multiline={true}
                                numberOfLines={1}
                                fontFamily='Montserrat'
                                fontSize={12}
                            />
                        </View>
                        <View style={[CStyles.shadowBox, boxLayout]}>
                            <Text style={text1}>Your oder from</Text>
                            <Text style={textAddr}>Britea - English Tea House - Ngô Đức Kế</Text>
                            <FlatList
                                data={[{
                                    name: 'A Tuấn - Cháo Ếch Singapore - Nguyễn Hữu Thọ',
                                    address: '77 Nguyễn Hữu Thọ,  Quận 7, TP. HCM',
                                    source: 'https://images.foody.vn/res/g76/750814/prof/s576x330/foody-upload-api-foody-mobile-foody-mobile-ce3-jpg-180615134706.jpg',
                                    price: '75.000đ',
                                    distance: '>3.0km',
                                    duration: '56pt'
                                },{
                                    name: 'A Tuấn - Cháo Ếch Singapore - Nguyễn Hữu Thọ',
                                    address: '77 Nguyễn Hữu Thọ,  Quận 7, TP. HCM',
                                    source: 'https://images.foody.vn/res/g76/750814/prof/s576x330/foody-upload-api-foody-mobile-foody-mobile-ce3-jpg-180615134706.jpg',
                                    price: '75.000đ',
                                    distance: '>3.0km',
                                    duration: '56pt'
                                },{
                                    name: 'A Tuấn - Cháo Ếch Singapore - Nguyễn Hữu Thọ',
                                    address: '77 Nguyễn Hữu Thọ,  Quận 7, TP. HCM',
                                    source: 'https://images.foody.vn/res/g76/750814/prof/s576x330/foody-upload-api-foody-mobile-foody-mobile-ce3-jpg-180615134706.jpg',
                                    price: '75.000đ',
                                    distance: '>3.0km',
                                    duration: '56pt'
                                }]}
                                renderItem={({ item }) => <BasketItem item={item} />}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ backgroundColor: '#fff',paddingVertical:0}}
                                nestedScrollEnabled={true}
                            />
                        </View>
                        <View style={[CStyles.shadowBox, boxLayout,{flexDirection:'row',justifyContent:'space-between'}]}>
                        <Text style={textAddr}>Total</Text>
                        <Text style={{
                            color: Color.PColor.dracula_orchid(1), fontFamily: 'Montserrat', fontSize: 20
                        }}>165.000 đ</Text>
                        </View>
                    </ScrollView>

                </View>
                <View style={{ flex: 1, backgroundColor: 'white',justifyContent:'center',alignItems:'center'}}>
                    <View style={{margin:10,backgroundColor:'#e84393',height:'80%',width:'80%',justifyContent:'center',alignItems:'center',borderRadius:10}}>
                        <Text style={{   color: 'white', fontFamily: 'Montserrat', fontSize: 20}}>Food now</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 10, backgroundColor: Color.PColor.city_light(1)
    },
    text1: {
        fontFamily: 'Montserrat', fontSize: 15
    },
    textAddr: {
        color: Color.PColor.electron_blue(1), fontFamily: 'Montserrat', fontSize: 20
    },
    boxLayout: {
        flex: 1, backgroundColor: 'white', margin: 10, padding: 10
    }
})
