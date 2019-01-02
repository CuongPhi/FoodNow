import React, { Component } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StatusBar,
  RefreshControl,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Circle, Rect } from 'react-native-svg';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import CardView from 'react-native-cardview';
import SearchBar from 'react-native-material-design-searchbar';
import Permissions from 'react-native-permissions';
import ContentLoader from '../ContentLoader';
import MerchantItem from './MerchantItem';
import MerchantItemV2 from './MerchantItemV2';
import Color from '../../assets/color/color';
import CStyles from '../../assets/styles/styles';
import * as merchantListActions from '../../feature/merchantlist/actions';

const { height } = Dimensions.get('window');

const HeaderItem = obj => (
  <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 5 }}>
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={obj.onPress}>
        <CardView
          cardElevation={1}
          cardMaxElevation={2}
          cornerRadius={50}
          style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={obj.image}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </CardView>
      </TouchableOpacity>
      <Text>{obj.name}</Text>
    </View>
  </View>
);

async function handleNearMe() {
  const granted = await Permissions.check('location');
  if (granted === 'authorized') {
    Actions.nearMe();
  } else {
    const r = await Permissions.request('location');
    if (r === 'authorized') {
      Actions.nearMe();
    }
  }
}

class MerchantListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      onLayout: false,
      viewStyle: 2,
    };
    this.count = Math.floor(height / 100);
    this.getListItem = this.getListItem.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.getListData = this.getListData.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  getHeaderList() {
    const { viewStyle } = this.state;
    return [
      {
        image: require('../../assets/image/list-button.png'),
        onPress: () => {
          this.setState({
            viewStyle: viewStyle === 1 ? 2 : 1,
          });
        },
        name: 'Change View',
      },
      {
        image: require('../../assets/image/placeholder.png'),
        onPress: () => handleNearMe(),
        name: 'Near Me',
      },
      {
        image: require('../../assets/image/order_history.png'),
        onPress: () => handleNearMe(),
        name: 'Near Me',
      },
    ];
  }

  getListItem() {
    const { actions } = this.props;
    const { type } = this.state;
    if (type !== 1) return;
    actions.getAll(this.count);
  }

  getListData() {
    const { type } = this.state;
    const { merchantlist } = this.props;
    return type === 1 ? merchantlist.itemList : merchantlist.searchList;
  }

  refreshData() {
    const { actions } = this.props;
    const { type } = this.state;
    if (type !== 1) return;
    actions.refresh();
  }

  renderItem(item) {
    const { viewStyle, type } = this.state;
    const data = type === 1 ? item.info : item;
    const onPress = () => {
      Actions.details({ item: data });
    };
    if (viewStyle === 1)
      return (
        <TouchableOpacity onPress={onPress}>
          <MerchantItem item={data} />
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity onPress={onPress}>
        <MerchantItemV2 item={data} />
      </TouchableOpacity>
    );
  }

  renderFooter() {
    const { merchantlist } = this.props;
    if (!merchantlist.loading) return null;
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

  renderHeader() {
    return (
      <FlatList
        data={this.getHeaderList()}
        renderItem={({ item }) => HeaderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    );
  }

  renderList(payments) {
    const { onLayout } = this.state;
    const { merchantlist } = this.props;
    return (
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
        refreshControl={
          <RefreshControl refreshing={merchantlist.loading} onRefresh={this.refreshData} />
        }
        data={this.getListData()}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={{ backgroundColor: 'white' }}
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
        ListHeaderComponent={this.renderHeader}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          this.getListItem();
        }}
      />
    );
  }

  render() {
    const { main } = CStyles;
    const { merchantlist, actions } = this.props;
    const payments = [];

    for (let i = 0; i < this.count; i += 1) {
      payments.push(<Loader key={i} />);
    }
    return (
      <View style={[main, { backgroundColor: Color.AColor.main }]}>
        <StatusBar backgroundColor={Color.AColor.main} barStyle="light-content" />
        <SearchBar
          placeholder="Find your restaurant..."
          onSearchChange={text => {
            const v = text.length > 0 ? 2 : 1;
            this.setState(
              {
                type: v,
              },
              () => {
                actions.search(text);
              }
            );
          }}
          autoCorrect={false}
          padding={5}
          value={merchantlist.query}
          height={40}
          iconColor="#737373"
          inputStyle={{
            borderColor: 'white',
            borderRadius: 5,
            backgroundColor: 'white',
          }}
          textStyle={{
            color: '#bdbdbd',
          }}
        />
        <View style={{ flex: 9 }}>{this.renderList(payments)}</View>
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

const mapStateToProps = state => ({
  merchantlist: state.merchantlist,
});

const mapDispatchToProps = dispacth => ({
  actions: bindActionCreators(merchantListActions, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantListScreen);
