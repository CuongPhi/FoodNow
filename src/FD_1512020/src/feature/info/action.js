import * as types from './type';

export const netConnection = isConnected => ({
  type: types.NET_CONNTECTION,
  isConnected,
});
