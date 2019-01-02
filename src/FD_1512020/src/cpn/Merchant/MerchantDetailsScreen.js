import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header } from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Modal from 'react-native-modalbox';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import Fade from '../CommonCpn/Fade';
import * as merchantActions from '../../feature/merchant/action';
import Color from '../../assets/color/color';
import CStyles from '../../assets/styles/styles';
import DishItem from './DishItem';
import IconBadge from '../CommonCpn/IconBadge';
import * as orderAction from '../../feature/order/action';
import BasketItem from '../Basket/BasketItem';
import * as utils from '../../ultilies/Utils';

const style = StyleSheet.create({
  DetailLayoutContainer: {
    flex: 9,
    padding: 10,
  },
  DeatailLayout: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    borderRadius: 2,
    paddingBottom: 2,
    zIndex: 0,
    marginHorizontal: 10,
  },
  snackbar: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    position: 'absolute',
    elevation: 6,
    opacity: 0.8,
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBrand: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
  },
  textAddr: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 12,
    padding: 5,
    paddingLeft: 10,
  },
  brandLayout: {
    height: 'auto',
    backgroundColor: Color.PColor.soothing_breeze(0.5),
    alignItems: 'flex-end',
  },
  profile: {
    color: Color.PColor.mint_leaf(1),
    fontFamily: 'Montserrat',
    fontSize: 12,
    padding: 5,
    paddingLeft: 10,
  },
  headerBkg: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
  },
  iconSnackCtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconSnackMain: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSnack: {
    width: 20,
    height: 20,
    backgroundColor: Color.AColor.main,
  },
  modalText: {
    color: 'white',
  },
  deliveryBtn: {
    backgroundColor: Color.AColor.main,
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  modal: {
    height: 400,
    borderRadius: 8,
  },
});
const HEADER_HEIGHT = 45;
const { width, height } = Dimensions.get('window');

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

const Loading = () => (
  <View
    style={{
      height: height - HEADER_HEIGHT,
      backgroundColor: Color.PColor.faded_poster(1),
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Progress.Pie size={width * 0.2} indeterminate color={Color.AColor.main} />
  </View>
);

class MerchantDetailsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      header: 1,
    };
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    this.renderStickyHeader = this.renderStickyHeader.bind(this);
    this.renderForeground = this.renderForeground.bind(this);
    this.handlePressProfile = this.handlePressProfile.bind(this);
    this.handleDishSelect = this.handleDishSelect.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const { merchantActions: acts, item } = this.props;
    acts.get(_.get(item, 'id', ''));
  }

  static getTotalOrder(list) {
    if (list) {
      let total = 0;
      list.forEach(e => {
        total += _.get(e, 'count', 0);
      });
      return total;
    }
    return 0;
  }

  static getAmountTotal(list) {
    if (list) {
      let total = 0;
      list.forEach(e => {
        const price = _.get(e, 'item.price', 0);
        const count = _.get(e, 'count', 0);
        total += price * count;
      });
      return total;
    }
    return 0;
  }

  handleScrollEvent(e) {
    if (e.nativeEvent.contentOffset.y <= 0) {
      this.setState({
        header: 0,
      });
    } else {
      this.setState({
        header: HEADER_HEIGHT,
      });
    }
  }

  handlePressProfile() {
    const { merchant } = this.props;
    Actions.profile({ item: _.get(merchant, 'data'), cmts: _.get(merchant, 'firstCmt', []) });
  }

  handleDishSelect(item) {
    const { signIn, orderActions, item: i } = this.props;
    const resID = _.get(i, 'id', '');
    if (signIn.token && signIn.token.length > 0) {
      orderActions.addNewItem({ item, resID });
      if (this.icon) {
        this.icon.tada(500);
      }
    } else Actions.auth();
  }

  toggleModal() {
    this.modal.open();
  }

  renderStickyHeader() {
    const { merchant } = this.props;
    const restaurant = _.get(merchant, 'data.restaurant');
    return (
      <Header
        outerContainerStyles={{ height: 45, backgroundColor: Color.AColor.main }}
        leftComponent={navigationBtn()}
        centerComponent={{
          text: _.get(restaurant, 'name', 'Empty Name'),
          style: { color: '#fff' },
        }}
      />
    );
  }

  renderForeground() {
    const { textBrand, textAddr, brandLayout, profile, headerBkg } = style;
    const { merchant } = this.props;
    const restaurant = _.get(merchant, 'data.restaurant');
    const address = _.get(merchant, 'data.address');
    return (
      <ImageBackground
        source={{
          uri: _.get(restaurant, 'image'),
        }}
        style={headerBkg}
        resizeMode="cover"
      >
        {navigationBtn({
          position: 'absolute',
          top: 10,
          left: 10,
        })}
        <View style={brandLayout}>
          <Text style={textBrand}>{_.get(restaurant, 'name', 'Empty Name')}</Text>
          <Text style={textAddr}>{_.get(address, 'address', '')}</Text>
          <TouchableOpacity onPress={this.handlePressProfile}>
            <Text style={profile}>See restaurant profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  renderMain() {
    const {
      DeatailLayout,
      snackbar,
      iconSnackCtn,
      iconSnackMain,
      iconSnack,
      modalText,
      deliveryBtn,
      modal,
    } = style;
    const { header } = this.state;
    const { merchant, order, orderActions, item: i, signIn } = this.props;
    const menu = _.get(merchant, 'data.menu', []);
    const orderData = _.get(order, 'data', new Map());
    const resID = _.get(i, 'id', '');
    const orderList = orderData.get(resID);
    const totalOrder = MerchantDetailsScreen.getTotalOrder(orderList);
    const amountTotal = MerchantDetailsScreen.getAmountTotal(orderList);
    return (
      <View style={{ flex: 1 }}>
        <ParallaxScrollView
          backgroundColor={Color.AColor.main}
          contentBackgroundColor="pink"
          parallaxHeaderHeight={200}
          stickyHeaderHeight={header}
          scrollEvent={this.handleScrollEvent}
          renderForeground={this.renderForeground}
          renderStickyHeader={this.renderStickyHeader}
        >
          <View style={[CStyles.shadowBox, DeatailLayout]}>
            <FlatList
              data={menu}
              renderItem={({ item }) => (
                <Fade>
                  <DishItem item={item} onSelect={() => this.handleDishSelect(item)} />
                </Fade>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ParallaxScrollView>
        {signIn.token && signIn.token.length > 0 && totalOrder > 0 ? (
          <TouchableOpacity style={snackbar} onPress={this.toggleModal}>
            <Animatable.View
              style={iconSnackCtn}
              ref={x => {
                this.icon = x;
              }}
            >
              <IconBadge
                MainElement={<Icon name="shopping-basket" color="white" size={25} />}
                MainViewStyle={iconSnackMain}
                BadgeElement={<Text style={modalText}>{totalOrder}</Text>}
                IconBadgeStyle={iconSnack}
                Hidden={totalOrder === 0}
              />
              <Text style={modalText}>{utils.vndFormat(amountTotal)}</Text>
            </Animatable.View>
            <TouchableOpacity
              onPress={() => {
                Actions.order({ res: merchant });
              }}
              style={deliveryBtn}
            >
              <Text style={{ color: 'white' }}>Giao Hàng</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ) : null}

        <Modal
          style={modal}
          position="bottom"
          ref={x => {
            this.modal = x;
          }}
          swipeToClose
          backdropPressToClose={false}
          backButtonClose
        >
          <FlatList
            data={orderList}
            renderItem={({ item }) => (
              <BasketItem
                item={_.get(item, 'item')}
                count={_.get(item, 'count')}
                onUpdate={() => {
                  orderActions.addNewItem({ item: _.get(item, 'item'), resID });
                }}
                onRemove={() => {
                  orderActions.removeItem({ item: _.get(item, 'item'), resID });
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Modal>
      </View>
    );
  }

  render() {
    const { merchant } = this.props;
    return merchant.data ? (
      this.renderMain()
    ) : (
      <View>
        {this.renderStickyHeader()}
        <Loading />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  merchant: state.merchant,
  order: state.order,
  signIn: state.signIn,
});

const mapDispatchToProps = dispacth => ({
  merchantActions: bindActionCreators(merchantActions, dispacth),
  orderActions: bindActionCreators(orderAction, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailsScreen);
