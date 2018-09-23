import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button, Divider } from 'react-native-elements';

export default class MerchantItem extends Component {
    render() {
        const { textName, textDes, textTag } = styles
        const { item } = this.props
        return (
            <View>
                <View style={[CStyles.listItemLayout, {
                    height: 'auto',
                    padding: 5,
                    paddingRight: 0,
                }]}>
                    <Image
                        source={{ uri: item.source }}
                        style={[CStyles.listItemThumbnail, {
                            width: 'auto',
                            height: '100%',
                            minHeight: 80,
                        }]}
                    />
                    <View
                        style={[CStyles.listItem2ndLayout, { justifyContent: 'center', }]}>
                        <Text style={textName}>{item.name}</Text>
                        <Text style={[textTag,]}>{item.price}</Text>
                    </View>
                    <View style={[CStyles.listItem3rdLayout, {
                        justifyContent: 'flex-end',
                        flex: 3
                    }]}>
                        <Text style={[textTag,{
                            textAlign:'center',
                            fontSize:15
                        }]}>{item.price}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center'
                            }}
                        >
                            <TempButton icon='-' color='red' />
                            <Text style={{
                                color: 'black',
                                fontSize: 16,
                                textAlignVertical: 'center'
                            }}>1</Text>
                            <TempButton icon='+' color='blue' />
                        </View>

                    </View>
                </View>
            </View>

        );
    }
}

const TempButton = (props) =>
    <View
        style={{ height: 20, width: 20, backgroundColor: props.color, borderRadius: 50, justifyContent: 'center', alignContent: 'center', margin: 5 }}
    ><Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', fontSize: 15 }}>{props.icon}</Text>
    </View>

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
        fontSize: 10,
    }
})