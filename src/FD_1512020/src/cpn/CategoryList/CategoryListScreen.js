import React, { Component } from 'react';
import { View, Text, FlatList, SectionList } from 'react-native';
import axios from 'axios';
import { TagSelect } from 'react-native-tag-select';
import * as Progress from 'react-native-progress';
import Color from '../../assets/color/color';

export default class CategoryListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      categoriesData: [],
      foodData: [],
      selectCategories: [],
    };
  }

  componentWillMount() {
    axios({
      url: `https://food-delivery-server.herokuapp.com/categories/getAll`,
      method: 'get',
    })
      .then(res => {
        if (res.status === 200) {
          try {
            this.setState({
              categoriesData: res.data,
              isLoading: false,
            });
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFoodList(item) {}

  renderLoading() {
    const { isLoading } = this.state;
    if (!isLoading) return null;
    return (
      <Progress.Bar
        width={null}
        indeterminate
        style={{
          backgroundColor: '#fff',
        }}
        borderWidth={0}
      />
    );
  }

  renderTags() {
    const { categoriesData } = this.state;
    return (
      <TagSelect
        data={categoriesData}
        labelAttr="name"
        containerStyle={{
          backgroundColor: Color.AColor.main,
          padding: 10,
        }}
        onItemPress={item => {
          console.log(item);
        }}
      />
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View>
        <Text>Categories</Text>
        {isLoading ? this.renderLoading() : this.renderTags()}
        <Text>Foods</Text>
      </View>
    );
  }
}
