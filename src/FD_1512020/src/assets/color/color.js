import tinycolor from 'tinycolor2';
/* eslint-disable */

// https://flatuicolors.com/palette/us
function parseColor(c, a) {
  const color = tinycolor(c);
  if (color.isValid()) {
    if (!isNaN(a)) {
      color.setAlpha(a);
      return color.toRgbString();
    }
  } else {
    return '#fff';
  }
  return '#fff';
}
const PColor = {
  light_grennish_blue: a => parseColor('#55efc4', a),
  faded_poster: a => parseColor('#81ecec'.a),
  green_danner_tail: a => parseColor('#74b9ff'.a),
  shy_moment: a => parseColor('#a29bfe', a),
  pico_8_pink: a => parseColor('#fd79a8', a),
  soothing_breeze: a => parseColor('#b2bec3', a),
  electron_blue: a => parseColor('#0984e3', a),
  dracula_orchid: a => parseColor('#2d3436', a),
  city_light: a => parseColor('#dfe6e9', a),
  chigong: a=> parseColor("#d63031",a),
  mint_leaf: a=>parseColor("#00b894",a),
  first_date: a=>parseColor('#fab1a0',a),
  american_driver: a=>parseColor("#636e72",a),
  pink_glamour: a=>parseColor('#ff7675',a)
};

const AColor = {
  main: PColor.pico_8_pink(1),
  divider: PColor.soothing_breeze(0.5),
  error: PColor.chigong(1)
};

export default ( Color= {
  PColor,
  AColor,
});
