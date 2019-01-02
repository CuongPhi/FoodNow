/*
 * @Author: An Nguyen 
 * @Date: 2018-12-31 15:28:48 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 19:58:53
 */
import _ from 'lodash';
import * as types from '../type';

const init = {
  data: new Map(),
  sending: false,
};

function addNewItem(arr, item) {
  const index = _.findIndex(arr, e => _.get(e, 'item.id') === _.get(item, 'id', true));
  if (index >= 0) {
    return [
      ...arr.slice(0, index),
      {
        ...arr[index],
        count: arr[index].count + 1,
      },
      ...arr.slice(index + 1),
    ];
  }
  return [
    ...arr,
    {
      item,
      count: 1,
    },
  ];
}

function removeItem(arr, item) {
  const index = _.findIndex(arr, e => _.get(e, 'item.id') === _.get(item, 'id', true));
  if (index >= 0) {
    const count = arr[index].count - 1;
    if (count > 0) {
      return [
        ...arr.slice(0, index),
        {
          ...arr[index],
          count,
        },
        ...arr.slice(index + 1),
      ];
    }
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  return arr;
}

function addItem(map, id, item) {
  const m = map || new Map();
  const basket = m.get(id);
  if (basket) {
    const b = addNewItem(basket, item);
    m.set(id, b);
    return m;
  }
  const arr = addNewItem([], item);
  m.set(id, arr);
  return m;
}

function remove(map, id, item) {
  const m = map || new Map();
  const basket = m.get(id);
  if (basket) {
    const b = removeItem(basket, item);
    if (b.length > 0) {
      m.set(id, b);
    } else {
      m.delete(id);
    }
    return m;
  }
  return m;
}

export default function order(prevState = init, action) {
  switch (action.type) {
    case types.PUSH_ITEM_LIST:
      return {
        ...prevState,
        data: addItem(
          prevState.data,
          _.get(action, 'payload.resID'),
          _.get(action, 'payload.item')
        ),
      };
    case types.REMOVE_ITEM_LIST:
      return {
        ...prevState,
        data: remove(prevState.data, _.get(action, 'payload.resID'), _.get(action, 'payload.item')),
      };
    case types.postOrder.TYPE:
      return { ...prevState, sending: true, sendFail: false };
    case types.postOrder.SUCCESS:
      return { ...prevState, sending: false, sendFail: false };
    case types.postOrder.FAILURE:
      return { ...prevState, sending: false, sendFail: true };
    default:
      return prevState;
  }
}
