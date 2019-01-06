import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomInput from '../../CommonCpn/CustomInput';
import CustomButton from '../../CommonCpn/CustomButton';
import * as StringUtils from '../../../ultilies/StringUtils';
import * as ApiActions from '../../../feature/signIn/action';
import * as Dialog from '../../Modal/Dialog';

const styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  inputLayout: {
    marginVertical: 20,
    width: '80%',
  },
  input: {
    height: 50,
  },
  text: {
    color: '#2d3436',
  },
  textLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 10,
  },
});
class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.username = undefined;
    this.resend = this.resend.bind(this);
    this.errorDialog = undefined;
    this.succesDialog = undefined;
  }

  componentDidUpdate() {
    const { password } = this.props;
    if (password.loading) {
      this.button.disable();
      return;
    }
    this.button.enable();

    if (password.err) {
      this.errorDialog.setMessage(`${password.msg}`);
      this.errorDialog.show();
    } else {
      this.succesDialog.setMessage('Successful');
      this.succesDialog.show(() => {
        Actions.signin();
      });
    }
  }

  resend() {
    const { actions } = this.props;
    if (!this.username) return;
    const email = this.username.getValue();

    if (StringUtils.isEmptyOrNull(email)) {
      Alert.alert('Error', 'Empty Email');
      return;
    }
    if (!StringUtils.validateEmail(email)) {
      Alert.alert('Error', 'Wrong Email');
      return;
    }
    actions.forgotPassword(email);
  }

  render() {
    const { main, inputLayout, input, text, textLayout } = styles;
    const { style } = this.props;
    return (
      <View style={[main, style]}>
        <View style={textLayout}>
          <Text textAlign="justify" style={text}>
            {`Please enter your email address and we'll send you an email to reset your password`}
          </Text>
        </View>
        <View style={inputLayout}>
          <CustomInput
            ref={x => {
              this.username = x;
            }}
            style={input}
            icon="envelope-square"
            placeholder="Email"
            onChangeText={t => {
              if (StringUtils.isEmptyOrNull(t)) return true;
              return true;
            }}
          />
        </View>
        <CustomButton
          onPress={this.resend}
          style={[inputLayout, input]}
          text="Reset Password"
          ref={x => {
            this.button = x;
          }}
        />
        <Dialog.ErrorDialog
          ref={x => {
            this.errorDialog = x;
          }}
          title="Error"
          message="Unknown Error"
          doneTitle="OK"
        />
        <Dialog.SuccessDialog
          ref={x => {
            this.succesDialog = x;
          }}
          title="Successfully"
          message="Please verify your email (3 minutes left)"
          doneTitle="OK"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  password: state.password,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ApiActions, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
