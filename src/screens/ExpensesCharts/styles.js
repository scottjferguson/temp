import { Dimensions } from 'react-native';
import theme from '@theme/variables/myexpense';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMsg: {
    color: '#777',
    fontSize: 18,
    alignSelf: 'center',
  },
  chartTitle: {
    paddingTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  slides: {
    alignItems: 'center',
    padding: 10,
    width: deviceWidth,
  },
  spinner: {
    paddingTop: deviceHeight / 2 - 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: theme.brandPrimary,
  },
};
