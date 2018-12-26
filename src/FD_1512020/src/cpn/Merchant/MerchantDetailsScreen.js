import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SectionList,
  StatusBar,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Badge, Header } from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Fade from '../CommonCpn/Fade';
import * as merchantActions from '../../feature/merchant/action';
import Color from '../../assets/color/color';
import CStyles from '../../assets/styles/styles';
import DishItem from './DishItem';

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
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
});
const HEADER_HEIGHT = 45;

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

class MerchantDetailsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      header: 1,
    };
    this.handleScrollEvent = this.handleScrollEvent.bind(this);
    this.renderStickyHeader = this.renderStickyHeader.bind(this);
    this.renderForeground = this.renderForeground.bind(this);
  }

  componentDidMount() {
    const { merchantActions: acts, item } = this.props;
    acts.get(_.get(item, 'id', ''));
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
          <TouchableOpacity
            onPress={() => {
              console.log('Profile');
            }}
          >
            <Text style={profile}>See restaurant profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  render() {
    const { DeatailLayout } = style;
    const { header } = this.state;
    const { merchant } = this.props;
    const menu = _.get(merchant, 'data.menu', []);
    return (
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
                <DishItem item={item} />
              </Fade>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ParallaxScrollView>
    );
  }

  // render() {
  //   const {
  //     DetailLayoutContainer,
  //     DeatailLayout,
  //     snackbar,
  //     textBrand,
  //     textAddr,
  //     brandLayout,
  //   } = style;
  //   return (
  //     <View style={CStyles.main}>
  //       <View style={DetailLayoutContainer}>
  //         <View style={[CStyles.shadowBox, DeatailLayout]}>
  //           <ImageBackground
  //             source={{
  //               uri:
  //                 'https://vuakhuyenmai.vn/wp-content/uploads/2017/11/britea-english-tea-house-sale-16-11-2017.jpg',
  //             }}
  //             style={{ flex: 1, justifyContent: 'flex-end' }}
  //             imageStyle={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
  //           >
  //             <View style={brandLayout}>
  //               <Text style={textBrand}>Britea - English Tea House - Ngô Đức Kế</Text>
  //               <Text style={textAddr}>60 Ngô Đức Kế, P. Bến Nghé, Quận 1, TP. HCM</Text>
  //             </View>
  //           </ImageBackground>
  //           <View style={{ flex: 4, zIndex: 0 }}>
  //             <SectionList
  //               sections={this.data}
  //               renderItem={({ item }) => <DishItem item={item} />}
  //               renderSectionHeader={({ section: { title } }) => (
  //                 <Text style={{ fontWeight: 'bold', paddingLeft: 10 }}>{title}</Text>
  //               )}
  //               keyExtractor={(item, index) => index.toString()}
  //               nestedScrollEnabled
  //               contentContainerStyle={{ paddingBottom: 50 }}
  //             />
  //           </View>
  //         </View>
  //       </View>
  //       <View style={snackbar}>
  //         <Icon
  //           name="shopping-basket"
  //           size={20}
  //           color={Color.PColor.electron_blue(0.9)}
  //           style={{
  //             textAlignVertical: 'center',
  //           }}
  //         />
  //         <Badge
  //           containerStyle={{ backgroundColor: Color.PColor.electron_blue(0.9), marginLeft: 10 }}
  //           textStyle={{ color: 'orange' }}
  //           value={2}
  //         />
  //         <Text
  //           style={{
  //             color: Color.PColor.electron_blue(0.9),
  //             paddingLeft: 10,
  //           }}
  //         >
  //           72.000 đ
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }
}

const mapStateToProps = state => ({
  merchant: state.merchant,
});

const mapDispatchToProps = dispacth => ({
  merchantActions: bindActionCreators(merchantActions, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailsScreen);
