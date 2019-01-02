/*
 * @Author: An Nguyen 
 * @Date: 2019-01-01 21:53:46 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 20:23:04
 */
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Input, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as OrderActions from '../../feature/order/action';
import * as UserInfoActions from '../../feature/userinfo/action';
import * as addressActions from '../../feature/address/action';
import Color from '../../assets/color/color';
import BasketItem from '../Basket/BasketItem';
import MerchantDetailsScreen from '../Merchant/MerchantDetailsScreen';
import * as utils from '../../ultilies/Utils';
import CustomButton from '../CommonCpn/CustomButton';
import * as Dialog from '../Modal/Dialog';

const style = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    padding: 10,
  },
  deliverText: {
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  address: {
    fontSize: 20,
    fontFamily: 'Montserrat',
    color: Color.PColor.light_grennish_blue(1),
  },
  addressCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown: {
    flex: 1,
    padding: 10,
  },
  orderText: {
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
  resText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 13,
    marginBottom: 10,
  },
  moneyText: {
    textAlign: 'right',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    color: 'black',
  },
  noteInput: {
    borderBottomColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.PColor.american_driver(1),
    marginBottom: 80,
  },
  button: {
    height: 40,
    position: 'absolute',
    bottom: 10,
    width: '80%',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
});
class OrderScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changeAdd: false,
      displayBtn: true,
      address: '',
      note: '',
    };
    this.handleDistrict = this.handleDistrict.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleRemoveAddress = this.handleRemoveAddress.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleHideButton = this.handleHideButton.bind(this);
    this.handleShowButton = this.handleRemoveAddress.bind(this);
    this.action = '';
  }

  componentDidMount() {
    const { userInfo, UserInfoActions: userinfoActs } = this.props;
    const address = _.get(userInfo, 'address');
    if (address === undefined) {
      userinfoActs.getUserInfo();
    }
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentDidUpdate() {
    const { order } = this.props;
    if (this.action === 'postOrder' && order.sendFail) {
      this.errorDialog.show(() => {
        this.handleShowButton();
      });
    }
    if (this.action === 'postOrder' && !order.sendFail && !order.sending) {
      this.succesDialog.show(() => {
        setTimeout(() => {
          Actions.replace('main');
        });
      });
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  setupOrder() {
    const { changeAdd, address: addState, note: noteState } = this.state;
    const { order, res, userInfo } = this.props;
    const orderData = _.get(order, 'data', new Map());
    const resId = _.get(res, 'data.restaurant.id', '');
    const orderList = orderData.get(resId);
    const amountTotal = MerchantDetailsScreen.getAmountTotal(orderList);
    let feeShip = _.get(res, 'data.restaurant.feeShip', 0);
    feeShip = feeShip || 0;
    const totalPrice = amountTotal + feeShip;
    let o = Object.assign(
      { totalPrice },
      { idRestaurant: resId },
      { phone: _.get(userInfo, 'phone', '') }
    );
    if (changeAdd && this.ward && this.district && addState.length > 0) {
      o = Object.assign(
        o,
        { Street: addState },
        { idWard: this.ward.value() },
        { idDistrict: this.district.value() }
      );
    } else {
      const Street = _.get(userInfo, 'address.street', '');
      const idWard = _.get(userInfo, 'address.idWard', '');
      const idDistrict = _.get(userInfo, 'address.idDistrict', '');
      o = Object.assign(o, { Street }, { idWard }, { idDistrict });
    }
    const item = orderList.map(e =>
      Object.assign(
        { idFood: _.get(e, 'item.id', '') },
        { quantity: _.get(e, 'count', 0) },
        { note: noteState }
      )
    );
    o = Object.assign(o, { item });
    return o;
  }

  keyboardDidShow() {
    this.handleHideButton();
  }

  handleHideButton() {
    if (this.orderButton)
      this.orderButton.bounceOutRight(500).then(endState => {
        if (endState.finished) {
          this.setState({
            displayBtn: false,
          });
        }
      });
  }

  keyboardDidHide() {
    this.handleShowButton();
  }

  handleShowButton() {
    this.setState(
      {
        displayBtn: true,
      },
      () => {
        if (this.orderButton) this.orderButton.bounceInRight(500);
      }
    );
  }

  handleDistrict(value) {
    const { addActions } = this.props;
    addActions.getWard(value, false);
  }

  handleChangeAddress() {
    const { changeAdd } = this.state;
    this.setState(
      {
        changeAdd: !changeAdd,
      },
      () => {
        this.rChangeAddress.bounceInLeft(500);
      }
    );
  }

  handleRemoveAddress() {
    const { changeAdd } = this.state;
    this.setState(
      {
        changeAdd: !changeAdd,
      },
      () => {
        this.rAddress.bounceInRight(500);
      }
    );
  }

  renderAddress() {
    const { userInfo } = this.props;
    const street = _.get(userInfo, 'address.street', '');
    const { address, addressCtn } = style;
    return (
      <Animatable.View
        style={addressCtn}
        ref={x => {
          this.rAddress = x;
        }}
      >
        <Text style={address}>{street}</Text>
        <TouchableOpacity onPress={this.handleChangeAddress}>
          <Icon name="pencil" size={18} />
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  renderChangeAddress() {
    const { userInfo, address: addProps } = this.props;
    const { addressCtn, dropdown } = style;
    return (
      <Animatable.View
        ref={x => {
          this.rChangeAddress = x;
        }}
      >
        <View style={addressCtn}>
          <Input
            onChangeText={value => {
              this.setState({
                address: value,
              });
            }}
            placeholder="Enter your address"
            leftIcon={{ type: 'font-awesome', name: 'location-arrow' }}
          />
          <TouchableOpacity onPress={this.handleRemoveAddress}>
            <Icon name="times" size={18} />
          </TouchableOpacity>
        </View>
        <View style={addressCtn}>
          <Dropdown
            label="District"
            containerStyle={dropdown}
            data={addProps.district}
            onChangeText={this.handleDistrict}
            value={_.get(userInfo, 'address.idDistrict', '')}
            labelExtractor={({ name }) => name}
            valueExtractor={({ id }) => id}
            ref={x => {
              this.district = x;
            }}
          />
          <Dropdown
            label="Ward"
            containerStyle={dropdown}
            data={addProps.ward}
            value={_.get(userInfo, 'address.idWard', '')}
            labelExtractor={({ name }) => name}
            valueExtractor={({ id }) => id}
            ref={x => {
              this.ward = x;
            }}
          />
        </View>
      </Animatable.View>
    );
  }

  renderFooter() {
    const { order, res } = this.props;
    const { addressCtn, dropdown, moneyText, totalText, noteInput } = style;
    const resId = _.get(res, 'data.restaurant.id', '');
    const orderData = _.get(order, 'data', new Map());
    const orderList = orderData.get(resId);
    const amountTotal = MerchantDetailsScreen.getAmountTotal(orderList);
    let feeShip = _.get(res, 'data.restaurant.feeShip', 0);
    feeShip = feeShip || 0;
    return (
      <View>
        <View style={addressCtn}>
          <Text style={dropdown}>Subtotal:</Text>
          <Text style={[dropdown, moneyText]}>{utils.vndFormat(amountTotal)}</Text>
        </View>
        <View style={addressCtn}>
          <Text style={dropdown}>Fee Ship:</Text>
          <Text style={[dropdown, moneyText]}>{utils.vndFormat(feeShip)}</Text>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View style={addressCtn}>
          <Text style={[dropdown, totalText]}>Total:</Text>
          <Text style={[dropdown, moneyText, totalText]}>
            {utils.vndFormat(feeShip + amountTotal)}
          </Text>
        </View>
        <Input
          inputContainerStyle={noteInput}
          containerStyle={{
            width: '100%',
          }}
          onChangeText={value => {
            this.setState({ note: value });
          }}
        />
      </View>
    );
  }

  render() {
    const { res, order, orderAction } = this.props;
    const { changeAdd, displayBtn } = this.state;
    const { main, deliverText, orderText, resText, addressText, button } = style;
    const resName = _.get(res, 'data.restaurant.name', '');
    const resAddress = _.get(res, 'data.address.address', '');
    const resId = _.get(res, 'data.restaurant.id', '');
    const orderData = _.get(order, 'data', new Map());
    const orderList = orderData.get(resId);
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={main}>
          <Text style={deliverText}> Deliver to </Text>
          {changeAdd ? this.renderChangeAddress() : this.renderAddress()}
          <Text numberOfLines={0} style={orderText}>
            Your order from
            <Text style={resText}>{` ${resName}`}</Text>
          </Text>
          <Text style={addressText}>{resAddress}</Text>
          <Divider />
          <FlatList
            data={orderList}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => (
              <View>
                <BasketItem
                  item={_.get(item, 'item')}
                  count={_.get(item, 'count')}
                  onUpdate={() => {
                    orderAction.addNewItem({ item: _.get(item, 'item'), resID: resId });
                  }}
                  onRemove={() => {
                    orderAction.removeItem({ item: _.get(item, 'item'), resID: resId });
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
          />
        </KeyboardAwareScrollView>
        {displayBtn ? (
          <Animatable.View
            ref={x => {
              this.orderButton = x;
            }}
            style={button}
            animation="bounceInUp"
            delay={300}
          >
            <CustomButton
              text="Place Order"
              onPress={() => {
                const o = this.setupOrder();
                this.action = 'postOrder';
                orderAction.postOrder(o);
                this.handleHideButton();
              }}
            />
          </Animatable.View>
        ) : null}
        <Dialog.ErrorDialog
          ref={x => {
            this.errorDialog = x;
          }}
          title="Error"
          message="Send order fail! Please try again later!"
          doneTitle="OK"
        />
        <Dialog.SuccessDialog
          ref={x => {
            this.succesDialog = x;
          }}
          title="Success"
          message="Send order successful! Please wait for your food"
          doneTitle="OK"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  userInfo: state.userInfo,
  address: state.address,
});

const mapDispatchToProps = dispatch => ({
  orderAction: bindActionCreators(OrderActions, dispatch),
  UserInfoActions: bindActionCreators(UserInfoActions, dispatch),
  addActions: bindActionCreators(addressActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreen);
