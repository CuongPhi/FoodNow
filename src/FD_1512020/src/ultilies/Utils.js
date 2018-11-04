/*
 * @Author: An Nguyen 
 * @Date: 2018-11-05 01:02:51 
 * @Last Modified by:   An Nguyen 
 * @Last Modified time: 2018-11-05 01:02:51 
 */
import { AsyncStorage } from 'react-native';

export function storeItem(key, item) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, item)
      .then(resolve)
      .catch(reject);
  });
}
