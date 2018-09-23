import tinycolor from 'tinycolor2'

//https://flatuicolors.com/palette/us
PColor = {
    light_grennish_blue: (a)=>parseColor('#55efc4',a),
    faded_poster: a=>parseColor('#81ecec'.a),
    green_danner_tail: a=>parseColor('#74b9ff'.a),
    shy_moment: a=>parseColor('#a29bfe',a),
    pico_8_pink: a=>parseColor("#fd79a8",a),
    soothing_breeze: a=>parseColor('#b2bec3',a),
    electron_blue: a=>parseColor("#0984e3",a),
    dracula_orchid: a=>parseColor("#2d3436",a),
    city_light: a=>parseColor("#dfe6e9",a)
};

AColor = {
    main: PColor.pico_8_pink(1),
    divider: PColor.soothing_breeze(0.5)
}

export default Color = {
    PColor,AColor
}
function parseColor(color,a){
    var color = tinycolor(color)
    if(color.isValid()){
        if(!isNaN(a)){
            color.setAlpha(a)
            return color.toRgbString()
        }
    }else{
        return '#fff'
    }
}