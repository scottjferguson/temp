import theme from '@theme/variables/myexpense';

export default {
  item: {
    content: {
      flex: 1,
      elevation: 0,
      flexDirection: 'column',
      backgroundColor: '#fff',
      paddingTop: 20,
      paddingBottom: 20,
      paddingRight: 15,
      paddingLeft: 15,
      borderLeftWidth: 5,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0.3,
      borderBottomColor: '#ddd',
    },
    icon: {
      textAlign: 'center',
      color: '#BBBBBE',
      width: 30,
      fontSize: 24,
    },
    title: {
      fontSize: 16,
      color: '#444',
      marginLeft: 15,
    },
    subtitle: {
      fontSize: 10,
      color: '#777',
      marginLeft: 15,
    },
    expenseAmount: {
      fontSize: 14,
      color: theme.brandPrimary,
      alignSelf: 'flex-end',
    },
    incomeAmount: {
      fontSize: 14,
      color: theme.brandSuccess,
      alignSelf: 'flex-end',
    },
  },
};
