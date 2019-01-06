/*
 * @Author: An Nguyen 
 * @Date: 2019-01-02 22:03:28 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-06 15:30:14
 */
import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modalbox';
import { Divider } from 'react-native-elements';
import * as historyActions from '../../feature/orderHistory/action';
import BounceLeft from '../CommonCpn/BounceLeft';
import Color from '../../assets/color/color';
import Loading from '../CommonCpn/Loading';
import * as utils from '../../ultilies/Utils';

const style = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  textChild1: {
    flex: 1,
  },
  textChild2: {
    flex: 2,
  },
  itemCtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  },
  date: {
    textAlign: 'center',
    backgroundColor: Color.AColor.main,
    color: 'white',
    padding: 2,
    borderRadius: 5,
    fontSize: 13,
  },
  modal: {
    height: 400,
    borderRadius: 8,
  },
});

class OrderHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { historyActions: historyActs } = this.props;
    historyActs.getAll();
  }

  handleItemClick(item) {
    const { historyActions: hActs } = this.props;
    hActs.getDetail(_.get(item, 'id', ''));
    if (this.modal) this.modal.open();
  }

  renderItem(item) {
    return (
      <BounceLeft>
        <TouchableOpacity style={style.itemCtn} onPress={() => this.handleItemClick(item)}>
          <View style={{ flex: 1 }}>
            <Text style={style.date}>{new Date(_.get(item, 'date')).toLocaleDateString()}</Text>
          </View>

          <CardView
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}
            style={{ flex: 4, padding: 10, margin: 5 }}
          >
            <View style={style.textWrapper}>
              <Text style={style.textChild1}>Restaunrant ID:</Text>
              <Text style={style.textChild2}>{_.get(item, 'idRestaurant', '')}</Text>
            </View>
            <View style={style.textWrapper}>
              <Text style={style.textChild1}>Deliver to:</Text>
              <Text style={style.textChild2}>{_.get(item, 'address', '')}</Text>
            </View>
            <View style={style.textWrapper}>
              <Text style={style.textChild1}>Phone:</Text>
              <Text style={style.textChild2}>{_.get(item, 'phone', '')}</Text>
            </View>
            <View style={style.textWrapper}>
              <Text style={style.textChild1}>Total:</Text>
              <Text style={style.textChild2}>{utils.vndFormat(_.get(item, 'totalPrice', ''))}</Text>
            </View>
          </CardView>
        </TouchableOpacity>
      </BounceLeft>
    );
  }

  renderModalDetails() {
    const { orderHistory } = this.props;
    if (_.get(orderHistory, 'loadDetail', true)) {
      return <Loading />;
    }
    const { restaurant, detail, detailList } = orderHistory;
    const total =
      detailList &&
      detailList.reduce(
        (a, b) =>
          _.get(a, 'price', 0) * _.get(a, 'quantity', 0) +
          _.get(b, 'price', 0) * _.get(b, 'quantity', 0)
      );
    return (
      <View style={{ flex: 1, paddingVertical: 10, backgroundColor: Color.PColor.city_light(1) }}>
        <View style={{ flexDirection: 'row', padding: 5, backgroundColor: 'white' }}>
          <Image
            source={{ uri: _.get(restaurant, 'image', '') }}
            style={{ flex: 1, height: 50, width: null, borderRadius: 5 }}
            resizeMode="center"
          />
          <View style={{ flex: 4, paddingLeft: 5 }}>
            <Text>
              Order ID:
              <Text style={{ fontWeight: 'bold', color: Color.PColor.mint_leaf(1) }}>
                {_.get(detail, 'id', '')}
              </Text>
            </Text>
            <Text style={{ fontSize: 16, color: Color.AColor.main }} numberOfLines={1}>
              {_.get(restaurant, 'name', '')}
            </Text>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
              {_.get(restaurant, 'address', '')}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'white', marginTop: 10, flex: 4 }}>
          <FlatList
            data={detailList}
            renderItem={({ item }) => (
              <View>
                <View style={{ flexDirection: 'row', padding: 5 }}>
                  <Text style={{ flex: 4, fontWeight: 'bold' }}>{_.get(item, 'name', '')}</Text>
                  <Text style={{ flex: 1, textAlign: 'center' }}>{_.get(item, 'quantity', 0)}</Text>
                  <Text style={{ flex: 2, textAlign: 'right' }}>
                    {utils.vndFormat(_.get(item, 'price', 0))}
                  </Text>
                </View>
                <Divider />
              </View>
            )}
            ListFooterComponent={() => (
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                  }}
                >
                  <Text style={{ flex: 1, color: Color.PColor.dracula_orchid(1) }}>Subtotal:</Text>
                  <Text
                    style={{
                      flex: 2,
                      fontWeight: 'bold',
                      color: Color.PColor.dracula_orchid(1),
                      textAlign: 'right',
                    }}
                  >
                    {utils.vndFormat(total)}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                  }}
                >
                  <Text style={{ flex: 1, color: Color.PColor.dracula_orchid(1) }}>Fee Ship:</Text>
                  <Text
                    style={{
                      flex: 2,
                      fontWeight: 'bold',
                      color: Color.PColor.dracula_orchid(1),
                      textAlign: 'right',
                    }}
                  >
                    {utils.vndFormat(_.get(restaurant, 'feeShip', 0))}
                  </Text>
                </View>
                <Divider />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                  }}
                >
                  <Text style={{ flex: 1, color: Color.PColor.electron_blue(1) }}>Total Price</Text>
                  <Text
                    style={{
                      flex: 2,
                      fontWeight: 'bold',
                      color: Color.PColor.electron_blue(1),
                      textAlign: 'right',
                    }}
                  >
                    {utils.vndFormat(_.get(detail, 'totalPrice', 0))}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{ backgroundColor: 'white', marginTop: 10, flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>Phone Number:</Text>
            <Text style={{ flex: 2, fontWeight: 'bold', color: 'black' }}>
              {_.get(detail, 'phone', '')}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>Address:</Text>
            <Text style={{ flex: 2, fontWeight: 'bold', color: 'black' }}>
              {_.get(detail, 'address', '')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { orderHistory } = this.props;
    const list = _.get(orderHistory, 'list', []);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderItem(item)}
          style={{ backgroundColor: 'white' }}
        />
        <Modal
          position="bottom"
          ref={x => {
            this.modal = x;
          }}
          swipeToClose
          backdropPressToClose={false}
          backButtonClose
          coverScreen
        >
          {this.renderModalDetails()}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  orderHistory: state.orderHistory,
});

const mapDispatchToProps = dispatch => ({
  historyActions: bindActionCreators(historyActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
