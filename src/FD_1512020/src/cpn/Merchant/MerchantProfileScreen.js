/*
 * @Author: An Nguyen 
 * @Date: 2018-12-27 00:04:43 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-30 15:28:23
 */
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  WebView,
  FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';
import { Header, Text, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import PhotoGrid from '../CommonCpn/PhotoGrid';
import Color from '../../assets/color/color';
import Comment from './Comment';

const navigationBtn = s => (
  <TouchableOpacity
    style={s}
    onPress={() => {
      Actions.pop();
    }}
  >
    <Icon name="angle-left" size={30} color="#ffff" />
  </TouchableOpacity>
);

const handleResource = list => {
  const res = [];
  const vid = [];
  list.forEach(item => {
    const type = _.get(item, 'type', 'image');
    if (type === 'image') {
      const obj = {
        uri: `${_.get(item, 'url')}`,
      };
      res.push(obj);
    } else {
      const obj = 'video';
      vid.push(obj);
    }
  });
  return res.concat(vid);
};

const style = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imagePreview: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  address: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    fontFamily: 'Montserrat',
    color: Color.PColor.soothing_breeze(1),
  },
  name: {
    padding: 10,
    fontSize: 25,
    fontFamily: 'Montserrat',
    color: 'black',
  },
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
  listHeader: {
    padding: 5,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: Color.PColor.electron_blue(1),
  },
  list: {
    backgroundColor: 'white',
    marginTop: 5,
  },
  loadmore: {
    fontSize: 14,
    color: Color.PColor.electron_blue(1),
    padding: 5,
    textAlign: 'center',
  },
});

const renderPreviewItem = e => {
  const type = _.get(e, 'type', 'image');
  const { imageContainer, imagePreview } = style;
  if (type === 'image') {
    return (
      <View style={imageContainer} key={e.url}>
        <Image source={{ uri: `${_.get(e, 'url')}` }} style={imagePreview} resizeMode="contain" />
      </View>
    );
  }
  if (type === 'video') {
    return (
      <WebView
        style={{ flex: 1 }}
        javaScriptEnabled
        source={{ uri: `${_.get(e, 'url')}` }}
        key={e.url}
      />
    );
  }
  return null;
};

const renderComment = item => {
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

class MerchantProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleLoadMore = this.toggleLoadMore.bind(this);
  }

  toggleModal() {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  }

  toggleLoadMore() {
    const { item } = this.props;
    const id = _.get(item, 'restaurant.id');
    if (id) {
      Actions.comments({ resID: id });
    }
  }

  render() {
    const { isModalVisible } = this.state;
    const { item: merchantItem, cmts } = this.props;
    const { address: adS, name, listHeader, list, loadmore } = style;
    const address = _.get(merchantItem, 'address');
    const restaurant = _.get(merchantItem, 'restaurant');
    const init = {
      latitude: _.get(address, 'latitude', 0),
      longitude: _.get(address, 'longitude', 0),
      latitudeDelta: 0.015,
      longitudeDelta: 0.03,
    };
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Header
            outerContainerStyles={{ height: 45, backgroundColor: Color.AColor.main }}
            leftComponent={navigationBtn()}
          />
          <View style={{ height: 200 }}>
            <MapView style={{ ...StyleSheet.absoluteFillObject }} initialRegion={init}>
              <Marker coordinate={init} />
            </MapView>
          </View>
          <View style={{ backgroundColor: 'white', marginVertical: 5 }}>
            <Text style={name}>{_.get(restaurant, 'name', 'Empty Name')}</Text>
            <Text style={adS}>{_.get(address, 'address', '')}</Text>
          </View>
          <PhotoGrid
            source={handleResource(_.get(merchantItem, 'resource', []))}
            onPressImage={this.toggleModal}
          />
          <FlatList
            data={cmts}
            renderItem={({ item }) => <Comment item={item} />}
            keyExtractor={cmt => cmt.id.toString()}
            ListHeaderComponent={() => <Text style={listHeader}>Comments:</Text>}
            ListFooterComponent={() => (
              <TouchableOpacity onPress={this.toggleLoadMore}>
                <Text style={loadmore}>Load More ...</Text>
              </TouchableOpacity>
            )}
            style={list}
          />
        </ScrollView>
        <Modal isVisible={isModalVisible} onBackButtonPress={this.toggleModal} backdropOpacity={1}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.toggleModal}>
              <Icon name="angle-left" size={30} color="#ffff" />
            </TouchableOpacity>
            <Swiper>{_.get(merchantItem, 'resource', []).map(e => renderPreviewItem(e))}</Swiper>
          </View>
        </Modal>
      </View>
    );
  }
}

export default MerchantProfileScreen;
