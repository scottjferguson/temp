const React = require('react-native');
import theme from '@theme/variables/myexpense';

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  switchContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 0,
    color: theme.brandPrimary,
  },
  switchText: {
    color: '#95959A',
    paddingTop: 5,
    paddingRight: 15,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
