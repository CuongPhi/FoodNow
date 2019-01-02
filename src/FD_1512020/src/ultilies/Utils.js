/*
 * @Author: An Nguyen 
 * @Date: 2018-11-05 01:02:51 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-01 00:16:05
 */
import { AsyncStorage } from 'react-native';

export function storeItem(key, item) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, item)
      .then(resolve)
      .catch(reject);
  });
}

export function getSafe(fn, defaultVal) {
  try {
    return fn;
  } catch (e) {
    return defaultVal;
  }
}

export function vndFormat(value) {
  const res = Number.isNaN(value)
    ? ''
    : `${value
        .toFixed()
        .replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `,${c}` : c))} đ`;
  return res;
}
