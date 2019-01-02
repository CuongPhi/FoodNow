/*
 * @Author: An Nguyen 
 * @Date: 2018-12-02 16:14:53 
 * @Last Modified by: An Nguyen
 * @Last Modified time: 2019-01-02 02:36:27
 */
export const client = 'https://food-delivery-server.herokuapp.com/';
export const restaurantGetAll = (count, page) => `${client}restaurant/getAll/${count}&${page}`;
export const merchantSearch = query => `${client}restaurant/search?name=${query}`;
export const login = `${client}login`;
export const contentTypeJson = {
  'Content-Type': 'application/json',
};
export const getinfo = `${client}getinfo`;
export const getdistrict = `${client}district/getAll`;
export const getWard = id => `${client}ward/getAllByDistrict?id=${id}`;
export const token = tk => `Bearer ${tk}`;
export const updateinfo = `${client}updateInfo`;
export const updateavatar = `${client}updateAvatar`;
export const updatePassword = `${client}updatePassword`;
export const category = `${client}categories/getAll`;
export const nearme = (lat, long) => `${client}restaurant/nearMe/${lat}&${long}`;
export const notifs = `${client}getNoti`;
export const restaurant = id => `${client}restaurant/getMenu/${id}`;
export const firstComment = id => `${client}restaurant/getFirst3CommentById/${id}`;
export const getAllComment = id => `${client}restaurant/getAllCommentById/${id}`;
export const postComment = `${client}restaurant/addComment`;
export const postOrder = `${client}order/create`;
