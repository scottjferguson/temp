import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import {
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Spinner,
  Form,
  Footer,
  Icon,
} from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';

import LoginInput from '@components/LoginInput';
import Notification from '@components/Notification';

import {
  required,
  alphaNumeric,
  minLength7,
  maxLength15,
} from '@utils/validation';
import * as loginSelectors from './selectors';
import { doLogin, doRedirectLogin } from './behaviors';

import styles from './styles';

const FORM_NAME = 'signin';

class SocialSignIn extends Component {
  static propTypes = {
    loginStarted: PropTypes.bool,
    loginSuccess: PropTypes.bool,
    loginErrorMsg: PropTypes.string,
    loginError: PropTypes.bool,
    doLogin: PropTypes.func,
    doRedirectLogin: PropTypes.func,
    handleSubmit: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    loginStarted: false,
    loginSuccess: false,
    loginError: false,
    profile: {},
  };

  handleSubmit = values => {
    this.props.doLogin(values.username, values.password, () => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Walkthrough' })],
        })
      );
    });
  };

  loginWithKeycloak = () => {
    this.props.doRedirectLogin('Keycloak', () => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Walkthrough' })],
        })
      );
    });
  };

  loginWithOkta = () => {
    this.props.doRedirectLogin('Okta', () => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Walkthrough' })],
        })
      );
    });
  };

  loginWithAuth0 = () => {
    this.props.doRedirectLogin('Auth0', () => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Walkthrough' })],
        })
      );
    });
  };

  loginWithGoogle = () => {
    this.props.doRedirectLogin('Google', () => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Walkthrough' })],
        })
      );
    });
  };

  render() {
    const {
      navigation,
      loginStarted,
      loginError,
      loginErrorMsg,
      handleSubmit,
    } = this.props;
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <ImageBackground
          source={require('@assets/images/background1.png')}
          style={styles.background}>
          <Content showsVerticalScrollIndicator={false}>
            <View style={styles.header.wrapper}>
              {/* <Image
                source={require('@assets/images/logo.png')}
                style={styles.header.logo}
              /> */}
              {loginError && (
                <Notification
                  message={loginErrorMsg}
                  buttonText="Retry"
                  duration={5000}
                  position="top"
                  type="danger"
                />
              )}
            </View>
            <Form>
              <Field
                name="username"
                component={LoginInput}
                type="username"
                placeholder="Username"
                icon="user"
                validate={[required, alphaNumeric, maxLength15]}
              />
              <Field
                name="password"
                component={LoginInput}
                type="password"
                placeholder="Password"
                icon="lock"
                secureTextEntry={true}
                validate={[required, alphaNumeric, minLength7, maxLength15]}
              />
              {/* <View style={styles.account.container}>
                <Button
                  small
                  transparent
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.account.signUpBtn}>Create Account</Text>
                </Button>
                <Button
                  small
                  transparent
                  onPress={() => navigation.navigate('ResetPassword')}>
                  <Text style={styles.account.resetPwdBtn}>
                    Forgot Password
                  </Text>
                </Button>
              </View> */}
            </Form>
          </Content>
          <Footer style={styles.footer}>
            <View style={{ flex: 1 }}>
              {/* <Button
                large
                primary
                block
                full
                onPress={handleSubmit(this.handleSubmit)}>
                {loginStarted ? <Spinner color="#fff" /> : <Text>Sign In</Text>}
              </Button> */}
              {/* <View style={[styles.social.container]}>
                <TouchableOpacity onPress={this.loginWithGoogle}>
                  <Icon name="logo-google" style={styles.social.icon} />
                </TouchableOpacity>
                <View style={{ padding: 20 }} />
                <TouchableOpacity onPress={this.loginWithKeycloak}>
                  <Icon name="logo-twitter" style={styles.social.icon} />
                </TouchableOpacity>
                <View style={{ padding: 20 }} />
                <TouchableOpacity onPress={this.loginWithOkta}>
                  <Icon name="logo-facebook" style={styles.social.icon} />
                </TouchableOpacity>
                <View style={{ padding: 20 }} />
                <TouchableOpacity onPress={this.loginWithAuth0}>
                  <Icon name="logo-github" style={styles.social.icon} />
                </TouchableOpacity>
              </View> */}
            </View>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

export const SocialSignInForm = reduxForm({
  form: FORM_NAME,
})(SocialSignIn);

const mapStateToProps = state => ({
  loginStarted: loginSelectors.isLoginStarted(state),
  loginSuccess: loginSelectors.isLoginSuccess(state),
  loginError: loginSelectors.isLoginError(state),
  loginErrorMsg: loginSelectors.getLoginErrorMsg(state),
  profile: loginSelectors.getUserProfile(state),
  formValues: getFormValues(FORM_NAME)(state),
});

export default connect(
  mapStateToProps,
  { doLogin, doRedirectLogin }
)(SocialSignInForm);
