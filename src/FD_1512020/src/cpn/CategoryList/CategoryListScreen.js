import React, { Component } from 'react';
import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Color from '../../assets/color/color';
import TagSelect from '../CommonCpn/TagSelect';
import * as categoryAct from '../../feature/category/action';

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

class CategoryListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: new Map(),
    };
    this.category = undefined;
    this.getFoodList = this.getFoodList.bind(this);
    this.removeFoodList = this.removeFoodList.bind(this);
    this.type = '';
  }

  componentWillMount() {
    const { categoryAct: cAct } = this.props;
    cAct.category();
    this.type = 'getCategory';
  }

  componentDidUpdate() {
    const { category: ctg } = this.props;
    if (this.type === 'getCategory' && this.category) {
      this.category.setSelect(ctg.category.length > 0 ? 0 : -1);
      this.type = '';
    }
  }

  getFoodList(item) {
    const { listData } = this.state;
    axios({
      url: `http://food-delivery-server.herokuapp.com/food/searchtype?categoryname=${item.name}`,
      method: 'get',
    })
      .then(res => {
        if (res.status === 200) {
          try {
            const obj = {
              name: item,
              data: res.data,
            };
            // let list = listData;
            const list = new Map(listData);
            list.set(item.id, res.data);
            this.setState({ listData: list });
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
    // _.remove(list, i => i.name === item);
    const list = new Map(listData);
    list.delete(item.id);
    // listData.forEach(e => foodData.push(e.data));
    this.setState({ listData: list }, () => {
      console.log(this.state);
    });
  }

  renderLoading() {
    const { category } = this.props;
    if (!category.loading) return null;
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
    const { category } = this.props;
    return (
      <TagSelect
        ref={x => {
          this.category = x;
        }}
        data={_.get(category, 'category', [])}
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
            this.removeFoodList(item);
            return;
          }
          this.getFoodList(item);
        }}
      />
    );
  }

  render() {
    const { category: caProps } = this.props;
    const { title, category, foods } = styles;
    return (
      <View>
        <View style={category}>
          <Text style={title}>Categories</Text>
          {caProps.loading ? this.renderLoading() : this.renderTags()}
        </View>
        <View style={foods}>
          <Text style={title}>Foods</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchToProps = dispacth => ({
  categoryAct: bindActionCreators(categoryAct, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListScreen);
