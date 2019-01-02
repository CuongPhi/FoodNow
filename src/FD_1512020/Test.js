// // const { Observable, from, of, create } = require('rxjs');

// // const o = of(30);
// // console.log(o);
// // const hello = Observable.create(observer => {
// //   observer.next('Hello');
// // });

// // hello.subscribe(val => console.log(val));
// // const testVal = {
// //   mot: {
// //     hai: {
// //       ba: 'a',
// //     },
// //   },
// // };

// // console.log(testVal.mot.ba.ba);

// const obj = {
//   id: 1304,
//   name: 'Pizza Hải sản Pesto sành điệu kiểu Ý - Đế đặc biệt viền phô mai xúc xích (Size vừa)',
//   idFoodCategory: 6,
//   idRestaurant: 13,
//   image:
//     'https://images.foody.vn/res/g72/713617/prof/s480x300/foody-upload-api-foody-mobile-bacon-super-delight--180823115720.jpg',
//   price: 469000,
//   sold: 54,
// };

// const obj2 = {
//   id: 1305,
//   name: 'Pizza Hải sản Pesto sành điệu kiểu Ý',
//   idFoodCategory: 6,
//   idRestaurant: 13,
//   image:
//     'https://images.foody.vn/res/g72/713617/prof/s480x300/foody-upload-api-foody-mobile-bacon-super-delight--180823115720.jpg',
//   price: 469000,
//   sold: 54,
// };

// const _ = require('lodash');

// let list = [
//   {
//     item: obj,
//     count: 1,
//   },
//   {
//     item: obj2,
//     count: 1,
//   },
// ];

// const index = _.findIndex(list, e => e.item.id === obj.id);
// // if (index >= 0) {
// //   list = [
// //     ...list.slice(0, index),
// //     {
// //       ...list[index],
// //       count: list[index].count + 1,
// //     },
// //     ...list.slice(index + 1),
// //   ];
// //   console.log(list);
// // }
// list = _.slice(list, index, 1);
// console.log(list);
let x = 1000;
x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
console.log(x);
