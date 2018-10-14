import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Circle, Rect } from 'react-native-svg';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import ContentLoader from '../ContentLoader';
import MerchantItem from './MerchantItem';
import Color from '../../assets/color/color';
import CStyles from '../../assets/styles/styles';

const { width, height } = Dimensions.get('window');
export default class MerchantListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      page: 1,
    };
    this.count = Math.floor(height / 100);
    this.getListItem = this.getListItem.bind(this);
  }

  componentWillMount() {
    this.getListItem();
  }

  getListItem() {
    const { itemList, page } = this.state;
    console.log(page);
    axios({
      url: `https://food-delivery-server.herokuapp.com/restaurant/getAll/${this.count}&${page}`,
      method: 'get',
    })
      .then(res => {
        console.log(res.data.data);
        if (res.status === 200) {
          try {
            this.setState({
              itemList: [...itemList, ...res.data.data],
              page: page + 1,
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

  render() {
    const { main } = CStyles;
    const { itemList } = this.state;
    const payments = [];

    for (let i = 0; i < this.count; i += 1) {
      payments.push(<Loader key={i} />);
    }
    return (
      <View style={main}>
        <View style={{ flex: 1, backgroundColor: Color.PColor.light_grennish_blue(1) }}>
          <Text>FoodNOW - Navigation will be here</Text>
        </View>
        <View style={{ flex: 9 }}>
          <FlatList
            data={itemList}
            renderItem={({ item }) => <MerchantItem item={item.info} />}
            keyExtractor={(item, index) => index.toString()}
            style={{ backgroundColor: '#fff', marginVertical: 10 }}
            ListEmptyComponent={<View>{payments}</View>}
            onEndReached={() => this.getListItem()}
          />
        </View>
      </View>
    );
  }
}

const Loader = () => (
  <ContentLoader height={100} duration={1000}>
    <Circle cx="40" cy="30" r="30" />
    <Rect x="100" y="13" rx="4" ry="4" width="100" height="13" />
    <Rect x="100" y="37" rx="4" ry="4" width="50" height="8" />
  </ContentLoader>
);
