/*
 * @Author: An Nguyen 
 * @Date: 2018-12-23 18:10:33 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2018-12-24 22:54:59
 */
import React, { PureComponent } from 'react';
import { View, Switch, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import _ from 'lodash';
import * as actions from '../../feature/notifations/action';

class NotificationsScreen extends PureComponent {
  componentDidMount() {
    const { actions: acts } = this.props;
    acts.getAll();
  }

  componentDidUpdate() {
    const { notif, actions: acts } = this.props;
    const notifs = _.get(notif, 'notifications', []);
    if (notif.getnotif)
      notifs.forEach(e => {
        if (e.done) return;
        PushNotification.localNotification({
          id: _.get(e, 'id', '01'),
          vibrate: true,
          vibration: 100,
          priority: 'normal',
          title: _.get(e, 'title', ''),
          message: _.get(e, 'content'),
          playSound: false,
          soundName: 'default',
          number: '10',
        });
        acts.pushNotif(_.get(e, 'id', '01'));
      });
  }

  render() {
    const { notif, actions: acts } = this.props;
    const notifs = _.get(notif, 'notifications', []);
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text h4>Get notifications?</Text>
          <Switch value={notif.getnotif} onValueChange={value => acts.isGetNotif(value)} />
        </View>
        {notifs.map(e => (
          <ListItem
            key={_.get(e, 'id', '01')}
            leftAvatar={{ source: { uri: _.get(e, 'image', '') } }}
            title={_.get(e, 'title', '')}
            subtitle={_.get(e, 'content')}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  notif: state.notifs,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
