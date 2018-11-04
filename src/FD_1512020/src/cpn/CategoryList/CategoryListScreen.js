import React, { Component } from 'react';
import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import _ from 'lodash';
import Color from '../../assets/color/color';
import TagSelect from '../CommonCpn/TagSelect';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  category: {
    backgroundColor: 'white',
    margin: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 10,
  },
  foods: {
    backgroundColor: 'white',
    margin: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default class CategoryListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      categoriesData: [],
      foodData: [],
      listData: [],
    };
    this.category = undefined;
    this.getFoodList = this.getFoodList.bind(this);
    this.removeFoodList = this.removeFoodList.bind(this);
  }

  componentWillMount() {
    axios({
      url: `https://food-delivery-server.herokuapp.com/categories/getAll`,
      method: 'get',
    })
      .then(res => {
        if (res.status === 200) {
          try {
            this.setState(
              {
                categoriesData: res.data,
                isLoading: false,
              },
              () => {
                this.category.setSelect(res.data.length > 0 ? 1 : 0);
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFoodList(item) {
    const { listData } = this.state;
    axios({
      url: `http://food-delivery-server.herokuapp.com/food/searchtype?categoryname=${item}`,
      method: 'get',
    })
      .then(res => {
        if (res.status === 200) {
          try {
            const obj = {
              name: item,
              data: res.data,
            };
            const list = listData;
            list.push(obj);
            const foodData = _.flatten(_.map(list, 'data'));
            console.log(foodData.length);
            this.setState({ listData: list, foodData });
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeFoodList(item) {
    const { listData } = this.state;
    const list = listData;
    const foodData = [];
    _.remove(list, i => i.name === item);
    listData.forEach(e => foodData.push(e.data));
    this.setState({ listData: list, foodData });
  }

  renderLoading() {
    const { isLoading } = this.state;
    if (!isLoading) return null;
    return (
      <Progress.Bar
        width={null}
        indeterminate
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
        }}
        borderWidth={0}
      />
    );
  }

  renderTags() {
    const { categoriesData } = this.state;
    return (
      <TagSelect
        ref={x => {
          this.category = x;
        }}
        data={categoriesData}
        labelAttr="name"
        containerStyle={{
          padding: 10,
        }}
        itemStyle={{
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: Color.AColor.main,
        }}
        itemLabelStyle={{
          color: Color.AColor.main,
        }}
        itemStyleSelected={{
          backgroundColor: Color.AColor.main,
          borderWidth: 0,
        }}
        onItemPress={(item, isDelete) => {
          if (isDelete) {
            this.removeFoodList(item.name);
            return;
          }
          this.getFoodList(item.name);
        }}
      />
    );
  }

  render() {
    const { isLoading } = this.state;
    const { title, category, foods } = styles;
    return (
      <View>
        <View style={category}>
          <Text style={title}>Categories</Text>
          {isLoading ? this.renderLoading() : this.renderTags()}
        </View>
        <View style={foods}>
          <Text style={title}>Foods</Text>
        </View>
      </View>
    );
  }
}
