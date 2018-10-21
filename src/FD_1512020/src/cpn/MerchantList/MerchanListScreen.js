import React, { Component } from 'react';
import { View, FlatList, Dimensions, StatusBar } from 'react-native';
import { Circle, Rect } from 'react-native-svg';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import { SearchBar } from 'react-native-elements';
import ContentLoader from '../ContentLoader';
import MerchantItem from './MerchantItem';
import MerchantItemV2 from './MerchantItemV2';
import Color from '../../assets/color/color';
import CStyles from '../../assets/styles/styles';

const { height } = Dimensions.get('window');
export default class MerchantListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      searchList: [],
      type: 1,
      page: 1,
      onLayout: false,
      loading: true,
      loadmore: true,
      viewStyle: 2,
      searchType: '',
      timeCurrent: new Date().getTime(),
    };
    this.count = Math.floor(height / 100);
    this.getListItem = this.getListItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.searchListItem = this.searchListItem.bind(this);
  }

  getListItem() {
    const { itemList, page } = this.state;
    axios({
      url: `https://food-delivery-server.herokuapp.com/restaurant/getAll/${this.count}&${page}`,
      method: 'get',
    })
      .then(res => {
        if (res.status === 200) {
          try {
            const more = res.data.next_page > 0;
            this.setState({
              itemList: [...itemList, ...res.data.data],
              page: page + 1,
              loading: false,
              loadmore: more,
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

  searchListItem() {
    const { timeCurrent, searchType } = this.state;
    const curr = new Date().getTime();
    if (curr - timeCurrent > 1000) {
      // food-delivery-server.herokuapp.com/restaurant/search?name=
      this.setState(
        {
          timeCurrent: curr,
        },
        () => {
          axios({
            url: `https://food-delivery-server.herokuapp.com/restaurant/search?name=${searchType}`,
            method: 'get',
          })
            .then(res => {
              if (res.status === 200) {
                try {
                  console.log(res.data);
                  this.setState({
                    searchList: res.data,
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
      );
    }
  }

  renderFooter() {
    const { loading } = this.state;
    if (!loading) return null;
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

  render() {
    const { main } = CStyles;
    const {
      itemList,
      onLayout,
      loadmore,
      viewStyle,
      searchType,
      type,
      searchList,
      loading,
    } = this.state;
    const payments = [];

    for (let i = 0; i < this.count; i += 1) {
      payments.push(<Loader key={i} />);
    }
    return (
      <View style={[main, { backgroundColor: '#383D42' }]}>
        <StatusBar backgroundColor={Color.AColor.main} barStyle="light-content" />
        <SearchBar
          lightTheme
          placeholder="Type Here..."
          onChangeText={text => {
            if (loading) return;
            const v = text.length > 0 ? 2 : 1;
            this.setState(
              {
                searchType: text,
                type: v,
              },
              () => this.searchListItem()
            );
          }}
          noIcon
          clearIcon={null}
          value={searchType}
        />
        <View style={{ flex: 9 }}>
          <FlatList
            onLayout={event => {
              if (!onLayout) {
                this.count = Math.floor(event.nativeEvent.layout.height / 100);
                this.setState(
                  {
                    onLayout: true,
                  },
                  () => {
                    this.getListItem();
                  }
                );
              }
            }}
            data={type === 1 ? itemList : searchList}
            renderItem={({ item }) =>
              viewStyle === 1 ? (
                <MerchantItem item={type === 1 ? item.info : item} />
              ) : (
                <MerchantItemV2 item={type === 1 ? item.info : item} />
              )
            }
            keyExtractor={(item, index) => index.toString()}
            style={{ backgroundColor: '#E1E8EE' }}
            ListEmptyComponent={
              <View
                style={{
                  paddingTop: 30,
                }}
              >
                {payments}
              </View>
            }
            initialNumToRender={this.count}
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              setTimeout(() => {
                if (!loadmore) {
                  return;
                }
                this.setState(
                  {
                    loading: true,
                  },
                  this.getListItem()
                );
              }, 300);
            }}
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
