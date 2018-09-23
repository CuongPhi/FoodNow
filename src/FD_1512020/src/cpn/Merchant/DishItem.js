import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons'
import CStyles from '../../assets/styles/styles'
import Color from '../../assets/color/color'
import { Button, Divider } from 'react-native-elements';

export default class DishItem extends Component {
    render() {
        const { textName, textDes, textTag } = styles
        const {item} = this.props
        return (
            <View>
                <View style={[CStyles.listItemLayout, {
                    height: 'auto',
                    padding: 5,
                    paddingRight: 0
                }]}>
                    <Image
                        source={{ uri: item.source}}
                        style={[CStyles.listItemThumbnail, {
                            width: 'auto',
                            height: '100%',
                            minHeight: 80
                        }]}
                    />
                    <View
                        style={CStyles.listItem2ndLayout}>
                        <Text style={textName}>{item.name}</Text>
                        <Text style={textDes}>{item.hint}</Text>
                        <Text style={textTag}>{item.price}</Text>
                    </View>
                    <View style={[CStyles.listItem3rdLayout, {
                        justifyContent: 'center'
                    }]}>
                        <Button
                            title='+'
                            style={{ alignSelf: 'center' }}
                        />
                    </View>
                </View>
                <Divider style={{ backgroundColor: Color.AColor.divider,height:1, width:'80%',alignSelf:'center' }}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    textName: {
        fontFamily: 'Montserrat',
        color: '#2d3436',
        fontSize: 12,
        fontWeight: 'bold'
    },
    textDes: {
        fontFamily: 'Montserrat',
        fontSize: 10
    },
    textTag: {
        fontFamily: 'Montserrat',
        color: '#2f2f2f',
        fontSize: 12,
    }
})