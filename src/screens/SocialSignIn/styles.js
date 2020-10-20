import theme from '@theme/variables/myexpense';
export default {
  background: {
    flex: 1,
    width: null,
    height: null,
  },
  header: {
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      height: theme.deviceHeight / 2 - 20,
    },
    logo: {
      resizeMode: 'contain',
      width: 150,
    },
  },
  account: {
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    signUpBtn: {
      opacity: 0.8,
      fontSize: 14,
      color: '#FFF',
      textAlign: 'left',
    },
    resetPwdBtn: {
      opacity: 0.8,
      fontSize: 14,
      color: '#FFF',
      textAlign: 'right',
    },
  },
  footer: {
    flexDirection: 'column',
    height: 120,
  },
  social: {
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 30,
      paddingRight: 30,
    },
    icon: {
      alignSelf: 'center',
      fontSize: 24,
      marginBottom: 5,
      opacity: 0.8,
      color: '#FFF',
    },
  },
  signout: {
    linkText: {
      opacity: 0.7,
      fontSize: 14,
      color: '#FFF',
      textAlign: 'right',
      marginRight: 0,
      paddingRight: 0,
    },
    linkBtn: {
      opacity: 0.9,
      fontSize: 14,
      color: '#FFF',
      textAlign: 'left',
      marginLeft: 5,
      paddingLeft: 0,
    },
  },
};
