import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Dropdown } from 'react-native-material-dropdown';
import CardView from 'react-native-cardview';
import { Actions } from 'react-native-router-flux';
import Color from '../../assets/color/color';
import TagSelect from '../CommonCpn/TagSelect';
import * as categoryAct from '../../feature/category/action';
import DishItem from '../Merchant/DishItem';
import Fade from '../CommonCpn/Fade';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  category: {
    backgroundColor: 'white',
    margin: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 10,
    padding: 20,
    flex: 1,
  },
  foods: {
    backgroundColor: 'white',
    margin: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

class CategoryListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCat: undefined,
      setCat: new Set(),
    };
    this.category = undefined;
    this.handleSelectedCat = this.handleSelectedCat.bind(this);
    this.type = '';
  }

  componentWillMount() {
    const { categoryAct: cAct } = this.props;
    cAct.category();
    this.type = 'getCategory';
  }

  componentDidUpdate() {
    const { category: ctg } = this.props;
    if (this.type === 'getCategory' && this.category) {
      this.category.setSelect(ctg.category.length > 0 ? 0 : -1);
      this.type = '';
    }
  }

  handleSelectedCat(value) {
    const { category, categoryAct: cAct } = this.props;
    const { setCat } = this.state;
    const catList = _.get(category, 'category', []);
    const item = _.find(catList, o => o.id === value);
    setCat.add(item);
    cAct.getFood(item);
    this.setState({
      selectedCat: value,
      setCat,
    });
  }

  handleRemoveCat(value) {
    const { category, categoryAct: cAct } = this.props;
    const { setCat } = this.state;
    const catList = _.get(category, 'category', []);
    const item = _.find(catList, o => o.id === value);
    setCat.delete(item);
    cAct.removeCat(item);
    this.setState({
      selectedCat: value,
      setCat,
    });
  }

  renderLoading() {
    const { category } = this.props;
    if (!category.loading) return null;
    return (
      <Progress.Bar
        width={null}
        indeterminate
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
        }}
        borderWidth={0}
      />
    );
  }

  renderTags() {
    const { setCat } = this.state;
    return (
      <TagSelect
        ref={x => {
          this.category = x;
        }}
        data={[...setCat]}
        labelAttr="name"
        containerStyle={{
          padding: 10,
        }}
        itemStyle={{
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: Color.AColor.main,
        }}
        itemLabelStyle={{
          color: Color.AColor.main,
        }}
        itemStyleSelected={{
          backgroundColor: Color.AColor.main,
          borderWidth: 0,
        }}
        onItemPress={item => {
          this.handleRemoveCat(_.get(item, 'id', ''));
        }}
      />
    );
  }

  render() {
    const { category: caProps } = this.props;
    const { selectedCat } = this.state;
    const { title, category, foods } = styles;
    const catList = _.get(caProps, 'category', []);
    const foodList = _.get(caProps, 'foodList', []);
    return (
      <ScrollView>
        <CardView style={category} cardElevation={1} cardMaxElevation={2}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={[title, { flex: 2, textAlignVertical: 'center' }]}>Categories</Text>
            <Dropdown
              data={catList}
              labelExtractor={({ name }) => name}
              value={selectedCat}
              valueExtractor={({ id }) => id}
              onChangeText={this.handleSelectedCat}
              containerStyle={{ flex: 1 }}
            />
          </View>

          {caProps.loading ? this.renderLoading() : this.renderTags()}
        </CardView>
        {foodList.length > 0 ? (
          <Fade>
            <CardView style={[foods]} cardElevation={1} cardMaxElevation={2}>
              <Text style={[title, { padding: 20 }]}>Foods</Text>
              <FlatList
                data={foodList}
                renderItem={({ item }) => (
                  <Fade>
                    <DishItem
                      item={item}
                      onSelect={() => {
                        const o = { id: _.get(item, 'idRestaurant', '') };
                        Actions.details({ item: o });
                      }}
                    />
                  </Fade>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </CardView>
          </Fade>
        ) : null}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchToProps = dispacth => ({
  categoryAct: bindActionCreators(categoryAct, dispacth),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListScreen);
