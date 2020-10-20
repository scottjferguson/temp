import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

import Sidebar from '../index';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });
  it('renders correctly', () => {
    const tree = renderer.create(<Sidebar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to the actions page', () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
    };
    const wrapper = shallow(<Sidebar {...props} />);
    wrapper.find(TouchableOpacity).simulate('press');
    expect(props.navigation.navigate.mock.calls).toContainEqual(['Profile']);
  });
});
