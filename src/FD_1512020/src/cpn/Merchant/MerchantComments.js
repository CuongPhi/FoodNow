import React, { Component } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as cmActions from '../../feature/comments/action';
import Comment from './Comment';

const style = StyleSheet.create({
  input: {
    marginLeft: 5,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#74b9ff',
  },
  button: { height: '100%', justifyContent: 'center', alignItems: 'center', width: '20%' },
  inputContain: {
    flex: 1,
    flexDirection: 'row',
  },
});

class MerchantComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    const { resID, commentActs } = this.props;
    commentActs.get(resID);
  }

  onChangeText(value) {
    this.setState({ inputValue: value });
  }

  render() {
    const { comments, commentActs, signIn, resID } = this.props;
    const { input, button, inputContain } = style;
    const { inputValue } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 9 }}>
          <FlatList
            data={_.get(comments, 'cmts', [])}
            renderItem={({ item }) => <Comment item={item} />}
            keyExtractor={cmt => cmt.id.toString()}
          />
        </View>
        {_.get(signIn, 'token', '').length > 0 ? (
          <View style={inputContain}>
            <TextInput
              ref={x => {
                this.textinput = x;
              }}
              style={input}
              value={inputValue}
              onChangeText={this.onChangeText}
            />
            <TouchableOpacity
              style={button}
              onPress={() => {
                if (inputValue.length > 0) {
                  commentActs.postCmt({ id: resID, content: inputValue });
                  this.textinput.clear();
                }
              }}
            >
              <Text style={{ color: '#74b9ff' }}>Send</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  signIn: state.signIn,
});

const mapDispatchToProps = dispacth => ({
  commentActs: bindActionCreators(cmActions, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantComments);
