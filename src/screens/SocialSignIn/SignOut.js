import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Image, ImageBackground, StatusBar } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  Container,
  Text,
  Button,
  View,
  Spinner,
  Content,
  Footer,
} from 'native-base';
import Notification from '@components/Notification';

import { doLogout } from './behaviors';
import * as logoutSelectors from './selectors';
import styles from './styles';

const FORM_NAME = 'signout';

class SignOut extends Component {
  static propTypes = {
    logoutStarted: PropTypes.bool,
    logoutSuccess: PropTypes.bool,
    logoutError: PropTypes.bool,
    doLogout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    logoutStarted: false,
    logoutSuccess: false,
    logoutError: false,
  };

  handleSubmit = () => {
    this.props.doLogout(() => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SocialSignIn' })],
        })
      );
    });
  };

  render() {
    const { navigation, handleSubmit, logoutStarted, logoutError } = this.props;
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
            <View style={{ flex: 1 }}>
              <View style={styles.header.wrapper}>
                <Image
                  source={require('@assets/images/logo.png')}
                  style={styles.header.logo}
                />
                {logoutError && (
                  <Notification
                    message="Invalid username or password!"
                    buttonText="Retry"
                    duration={5000}
                    position="top"
                    type="danger"
                  />
                )}
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text
                  style={{ alignSelf: 'center', color: '#FFF', fontSize: 24 }}>
                  Are you sure you want to logout?
                </Text>
              </View>
            </View>
          </Content>
          <Footer style={styles.footer}>
            <View style={{ flex: 1 }}>
              <Button
                large
                primary
                block
                full
                onPress={handleSubmit(this.handleSubmit)}>
                {logoutStarted ? (
                  <Spinner color="#fff" />
                ) : (
                  <Text>Yes, Sign me out</Text>
                )}
              </Button>
              <Button transparent full onPress={() => navigation.goBack()}>
                <Text style={styles.signout.linkText}>No, </Text>
                <Text style={styles.signout.linkBtn}>Keep me signed in</Text>
              </Button>
            </View>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

export const SignOutForm = reduxForm({
  form: FORM_NAME,
})(SignOut);

const mapStateToProps = state => ({
  logoutStarted: logoutSelectors.isLogoutStarted(state),
  logoutSuccess: logoutSelectors.isLogoutSuccess(state),
  logoutError: logoutSelectors.isLogoutError(state),
});

export default connect(
  mapStateToProps,
  { doLogout }
)(SignOutForm);
