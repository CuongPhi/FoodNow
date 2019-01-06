/*
 * @Author: An Nguyen 
 * @Date: 2018-12-23 08:20:42 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-07 00:18:49
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
import MapView, { Marker, Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Color from '../../assets/color/color';
import * as nearMeActions from '../../feature/nearme/action';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height * 0.25;
const CARD_WIDTH = width * 0.8;

const gps = require('../../assets/image/placeholder.png');

const styles = StyleSheet.create({
  loadingMain: {
    flex: 1,
    backgroundColor: Color.PColor.faded_poster(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: Color.PColor.pico_8_pink(0.5),
    borderRadius: 50,
    width: 10,
    height: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius: 10,
  },
  currentLocation: {
    position: 'absolute',
    top: 30,
    right: 10,
    padding: 5,
    backgroundColor: Color.PColor.city_light(0.8),
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});

const Loading = () => (
  <View style={styles.loadingMain}>
    <Progress.Pie size={width * 0.2} indeterminate color={Color.AColor.main} />
  </View>
);

const scrollItem = value => {
  const name = _.get(value, 'RESTAURANT.name', '');
  const feeShip = _.get(value, 'RESTAURANT.feeShip', '');
  const image = _.get(value, 'RESTAURANT.image', '');
  return (
    <TouchableOpacity
      style={styles.card}
      key={value.id}
      onPress={() => Actions.details({ item: value })}
    >
      <View>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontStyle: 'italic',
            fontSize: 15,
          }}
        >
          {`Shipping Fee: ${feeShip} đ`}
        </Text>
        <Image
          source={{ uri: image }}
          style={{
            width: '100%',
            height: 100,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
class NearMeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      init: null,
      showPointer: false,
    };
    this.handlerMarkerPress = this.handlerMarkerPress.bind(this);
    this.handlerShowPointer = this.handlerShowPointer.bind(this);
    this.handlerDissablePointer = this.handlerDissablePointer.bind(this);
    this.handlerCurrentLocation = this.handlerCurrentLocation.bind(this);
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        this.setState({
          init: region,
        });
      },
      err => console.log(err),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  handlerMarkerPress(value) {
    const { nearMe } = this.props;
    const index = _.findIndex(nearMe.itemList, { id: value.id });
    if (this.scrollView)
      this.scrollView.getNode().scrollTo({ x: index * CARD_WIDTH, y: 0, animated: true });
  }

  handlerShowPointer() {
    this.setState({ showPointer: true });
  }

  handlerDissablePointer() {
    this.setState({ showPointer: false });
  }

  handlerCurrentLocation() {
    const { init } = this.state;
    this.map.animateToRegion({
      latitude: init.latitude,
      longitude: init.longitude,
      latitudeDelta: init.latitudeDelta,
      longitudeDelta: init.longitudeDelta,
    });
  }

  renderMap() {
    const { region, init, showPointer } = this.state;
    const { nearMe, nearMeAct } = this.props;
    const { mapView, main, scrollView, endPadding, bubble, currentLocation } = styles;
    return (
      <View style={main}>
        <MapView
          ref={x => {
            this.map = x;
          }}
          initialRegion={init}
          style={mapView}
          showsMyLocationButton={false}
          showsUserLocation
          onRegionChangeComplete={value => {
            this.setState({ region: value });
            nearMeAct.getAll(value.latitude, value.longitude);
          }}
          onTouchMove={this.handlerShowPointer}
          onTouchEnd={this.handlerDissablePointer}
        >
          {region ? (
            <Circle
              center={region}
              radius={900}
              fillColor="rgba(129, 236, 236,0.5)"
              zIndex={2}
              strokeWidth={1}
              strokeColor="rgba(129, 236, 236,1)"
            />
          ) : null}
          {nearMe.itemList.map(value => (
            <Marker
              coordinate={{ latitude: value.latitude, longitude: value.longitude }}
              key={value.id}
              onPress={() => this.handlerMarkerPress(value)}
              title={_.get(value, 'RESTAURANT.name', '')}
            />
          ))}
        </MapView>
        {showPointer && <View style={bubble} />}
        <TouchableOpacity style={currentLocation} onPress={this.handlerCurrentLocation}>
          <Image
            source={gps}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            padding: 5,
            width: 40,
            height: 40,
            borderRadius: 5,
          }}
          onPress={() => {
            Actions.pop();
          }}
        >
          <Icon name="angle-left" size={40} color={Color.PColor.dracula_orchid(1)} />
        </TouchableOpacity>
        <Animated.ScrollView
          ref={x => {
            this.scrollView = x;
          }}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={scrollView}
          snapToInterval={CARD_WIDTH}
          contentContainerStyle={endPadding}
        >
          {nearMe.itemList.map(value => scrollItem(value))}
        </Animated.ScrollView>
      </View>
    );
  }

  render() {
    const { init } = this.state;
    return init ? this.renderMap() : <Loading />;
  }
}

const mapStateToProps = state => ({
  nearMe: state.nearMe,
});

const mapDispatchToProps = dispacth => ({
  nearMeAct: bindActionCreators(nearMeActions, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMeScreen);
