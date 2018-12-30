/*
 * @Author: An Nguyen 
 * @Date: 2018-12-30 15:31:20 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 15:32:12
 */
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text, Divider } from 'react-native-elements';
import _ from 'lodash';
import Color from '../../assets/color/color';

const style = StyleSheet.create({
  cmtHeader: {
    backgroundColor: '#74b9ff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cmtName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.PColor.dracula_orchid(1),
  },
  cmtDate: {
    fontSize: 13,
    fontStyle: 'italic',
    color: Color.PColor.american_driver(1),
  },
  cmtContent: { fontSize: 12, color: 'black', padding: 10 },
});

const Comment = props => {
  const { item } = props;
  const d = new Date(_.get(item, 'createAt'));
  const { cmtHeader, cmtName, cmtDate, cmtContent } = style;
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={cmtHeader}>
        <Text style={cmtName}>{item.name}</Text>
        <Text style={cmtDate}>{d.toDateString()}</Text>
      </View>
      <Divider />
      <Text style={cmtContent}>{item.content}</Text>
    </View>
  );
};

export default Comment;
