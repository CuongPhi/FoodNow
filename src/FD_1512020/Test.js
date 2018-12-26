// const { Observable, from, of, create } = require('rxjs');

// const o = of(30);
// console.log(o);
// const hello = Observable.create(observer => {
//   observer.next('Hello');
// });

// hello.subscribe(val => console.log(val));
// const testVal = {
//   mot: {
//     hai: {
//       ba: 'a',
//     },
//   },
// };

// console.log(testVal.mot.ba.ba);

const _ = require('lodash');

const a = [
  {
    t: 1,
    d: true,
  },
  {
    t: 2,
    d: true,
  },
];

const b = [
  {
    t: 1,
  },
  {
    t: 2,
  },
  {
    t: 3,
  },
];

console.log(_.unionBy(a, b, 't'));
