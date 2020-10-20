import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AppHeader from '../index';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders correctly', async () => {
    const props = {
      navigation: { navigate: jest.fn(), dispatch: jest.fn() },
      style: {},
      title: 'Expenses',
      titleSuffix: 'June',
      subTitle: 'Manage your money',
      displayAvatar: true,
      displayLogo: true,
    };
    const tree = renderer.create(<AppHeader {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
