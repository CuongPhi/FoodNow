import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import CustomButton from '../CommonCpn/CustomButton';

const UserDialog = () => (
  <View
    style={{
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 30,
      alignSelf: 'center',
      marginVertical: 40,
    }}
  >
    <Text h4 style={{ paddingBottom: 20 }}>
      Please login to continue
    </Text>
    <CustomButton
      text="Login"
      onPress={() => {
        Actions.auth();
      }}
    />
  </View>
);

export default UserDialog;
