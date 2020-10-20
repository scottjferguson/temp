import React from 'react';
import { View, Text } from 'native-base';
import { Switch } from 'react-native';

import styles from './styles';
import theme from '@theme/variables/myexpense';

var Color = require('color');
const light = Color(theme.brandPrimary).alpha(0.4);

const SwitchButton = ({ ...props }) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>{props.label}</Text>
      <Switch
        style={styles.switch}
        trackColor={{ true: theme.brandPrimary }}
        thumbColor={props.value? theme.brandSecondary: theme.brandLight}
        ios_backgroundColor={light}
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </View>
  );
};

export default SwitchButton;
