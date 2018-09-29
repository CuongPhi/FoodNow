/* eslint-disable */

import {StyleSheet} from 'react-native';
import Color from '../color/color'
export default CStyles = {
    main: {
        flex: 1,
        backgroundColor: Color.AColor.main
    },
    shadowBox: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius:2
    },
    listItemLayout:{
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
    listItemThumbnail:{
        flex: 2, resizeMode: 'contain', height: 100, width: 100,
        borderRadius: 1,
    },
    listItem2ndLayout:{
        flex: 6,
        marginHorizontal: 10,
        alignSelf: 'stretch',
    },
    listItem3rdLayout:{
        flex: 1,
        alignSelf: 'stretch',
    }
}