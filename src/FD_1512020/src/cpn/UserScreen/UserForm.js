/*
 * @Author: An Nguyen 
 * @Date: 2018-12-15 18:32:55 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-01 23:43:00
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Avatar, Text, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import ModalSelector from 'react-native-modal-selector';
import * as _ from 'lodash';
import Color from '../../assets/color/color';
import CustomButton from '../CommonCpn/CustomButton';
import * as userActions from '../../feature/userinfo/action';
import * as addressActions from '../../feature/address/action';
import * as updateInfoActions from '../../feature/updateInfo/action';
import * as types from '../../feature/type';
import * as Dialog from '../Modal/Dialog';

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  topbg: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
  },
  bottombg: {
    flex: 4,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 20,
    elevation: 5,
    paddingBottom: 5,
  },
  ctnbottombg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nameStyle: {
    color: 'white',
  },
  address: {
    flexDirection: 'row',
    backgroundColor: Color.PColor.dracula_orchid(0.5),
    padding: 5,
    borderRadius: 50,
    margin: 10,
  },
  locationText: {
    color: Color.PColor.city_light(1),
  },
  infoctn: {
    alignSelf: 'stretch',
  },
  addressctn: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flex: 1,
  },
  input: {
    width: '100%',
    marginVertical: 10,
  },
  inputctn: {
    height: '100%',
  },
  dropdown: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 15,
  },
});

let type = '';

class UserForm extends PureComponent {
  constructor(props) {
    super(props);
    this.selectImage = [{ key: 0, label: 'Camera' }, { key: 1, label: 'Gallery' }];
    this.updateInfo = this.updateInfo.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleStreet = this.handleStreet.bind(this);
    this.handleDistrict = this.handleDistrict.bind(this);
    this.handleWard = this.handleWard.bind(this);
    this.handleGetInfo = this.handleGetInfo.bind(this);
    this.handleImageModal = this.handleImageModal.bind(this);
    this.username = undefined;
    this.phone = undefined;
    this.email = undefined;
    this.district = undefined;
    this.ward = undefined;
    this.street = undefined;
  }

  componentDidMount() {
    this.handleGetInfo();
  }

  componentDidUpdate() {
    const { updateInfo } = this.props;
    if (
      this.succesDialog &&
      updateInfo.success &&
      (type === 'update_info' || type === 'upload_avatar')
    ) {
      this.succesDialog.show(() => {
        type = '';
      });
    }
  }

  updateInfo() {
    const { userInfo, updateInfoAcs } = this.props;
    const payload = {};
    payload.userName = _.get(userInfo, 'userName', '');
    payload.email = _.get(userInfo, 'email', '');
    payload.phone = _.get(userInfo, 'phone', '');
    payload.street = _.get(userInfo, 'address.street', '');
    payload.idDistrict = _.get(userInfo, 'address.idDistrict', undefined);
    payload.idWard = _.get(userInfo, 'address.idWard', undefined);
    updateInfoAcs.updateInfo(payload);
    type = 'update_info';
  }

  handleGetInfo() {
    const { userInfoActions, addActions } = this.props;
    userInfoActions.getUserInfo();
    addActions.getDistrict();
  }

  handleUserName(value) {
    const { userInfoActions } = this.props;
    userInfoActions.changeText(value, types.changeInfo.USERNAME);
  }

  handleEmail(value) {
    const { userInfoActions } = this.props;
    userInfoActions.changeText(value, types.changeInfo.EMAIL);
  }

  handlePhone(value) {
    const { userInfoActions } = this.props;
    userInfoActions.changeText(value, types.changeInfo.PHONE);
  }

  handleStreet(value) {
    const { userInfoActions } = this.props;
    userInfoActions.changeText(value, types.changeInfo.STREET);
  }

  handleDistrict(value) {
    const { userInfoActions, addActions } = this.props;
    userInfoActions.changeText(value, types.changeInfo.DISTRICT);
    addActions.getWard(value, false);
  }

  handleWard(value) {
    const { userInfoActions } = this.props;
    userInfoActions.changeText(value, types.changeInfo.WARD);
  }

  handleImageModal(option) {
    const { updateInfoAcs } = this.props;
    const key = _.get(option, 'key', 2);
    let prom;
    const opt = {
      width: 300,
      height: 300,
      cropping: true,
    };
    if (key === 0) {
      prom = ImagePicker.openCamera(opt);
    }
    if (key === 1) {
      prom = ImagePicker.openPicker(opt);
    }
    if (prom) {
      prom
        .then(img => {
          const path = _.get(img, 'path');
          if (path) {
            const data = new FormData();
            data.append('file', {
              uri: path,
              type: 'image/jpeg',
              name: 'tessttess',
            });
            updateInfoAcs.updateAvatar(data);
            type = 'upload_avatar';
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const { userInfo, address, style: st } = this.props;
    const {
      topbg,
      main,
      bottombg,
      nameStyle,
      ctnbottombg,
      infoctn,
      input,
      text,
      inputctn,
      addressctn,
      dropdown,
    } = style;
    return (
      <View style={[st, main]}>
        <View style={topbg}>
          <ModalSelector
            data={this.selectImage}
            supportedOrientations={['landscape']}
            cancelText="Cancel"
            accessible
            onChange={this.handleImageModal}
          >
            <Avatar
              size={70}
              rounded
              title="F"
              source={{
                uri: `http://${userInfo.avatarUrl}?temp=${new Date().getUTCMilliseconds()}`,
              }}
            />
          </ModalSelector>
          <Text h4 style={nameStyle}>
            {_.get(userInfo, 'userName', '')}
          </Text>
        </View>
        <View style={bottombg}>
          <KeyboardAwareScrollView
            contentContainerStyle={ctnbottombg}
            refreshControl={
              <RefreshControl refreshing={userInfo.loading} onRefresh={this.handleGetInfo} />
            }
          >
            <View style={infoctn}>
              <Text style={text}>Username</Text>
              <Input
                placeholder="Enter your username"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                containerStyle={input}
                inputStyle={inputctn}
                value={_.get(userInfo, 'userName', '')}
                onChangeText={this.handleUserName}
                ref={x => {
                  this.username = x;
                }}
              />
            </View>
            <View style={infoctn}>
              <Text style={text}>Email</Text>
              <Input
                placeholder="Enter your email"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                containerStyle={input}
                inputStyle={inputctn}
                value={_.get(userInfo, 'email', '')}
                textContentType="emailAddress"
                onChangeText={this.handleEmail}
                ref={x => {
                  this.email = x;
                }}
              />
            </View>
            <View style={infoctn}>
              <Text style={text}>Phone</Text>
              <Input
                placeholder="Enter your phone"
                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                containerStyle={input}
                inputStyle={inputctn}
                value={_.get(userInfo, 'phone', '')}
                textContentType="telephoneNumber"
                onChangeText={this.handlePhone}
                ref={x => {
                  this.phone = x;
                }}
              />
            </View>
            <View style={infoctn}>
              <Text style={text}>Address</Text>
            </View>
            <View style={addressctn}>
              <Dropdown
                label="District"
                data={address.district}
                containerStyle={dropdown}
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
                data={address.ward}
                containerStyle={dropdown}
                onChangeText={this.handleWard}
                value={_.get(userInfo, 'address.idWard', '')}
                labelExtractor={({ name }) => name}
                valueExtractor={({ id }) => id}
                ref={x => {
                  this.ward = x;
                }}
              />
            </View>
            <View style={infoctn}>
              <Input
                placeholder="Enter your address"
                leftIcon={{ type: 'font-awesome', name: 'location-arrow' }}
                containerStyle={input}
                inputStyle={inputctn}
                onChangeText={this.handleStreet}
                value={_.get(userInfo, 'address.street', '')}
                ref={x => {
                  this.street = x;
                }}
              />
            </View>
            <CustomButton
              text="Save"
              onPress={this.updateInfo}
              style={{
                width: '50%',
              }}
            />
          </KeyboardAwareScrollView>
        </View>
        <Dialog.SuccessDialog
          ref={x => {
            this.succesDialog = x;
          }}
          title="Success"
          message="Update successful"
          doneTitle="OK"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  address: state.address,
  updateInfo: state.updateInfo,
});

const mapDispatchToProps = dispacth => ({
  userInfoActions: bindActionCreators(userActions, dispacth),
  addActions: bindActionCreators(addressActions, dispacth),
  updateInfoAcs: bindActionCreators(updateInfoActions, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
