import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Item, Input } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import styles from './styles';

export default class DateInputField extends Component {
  constructor(props) {
    super(props);
    this.state = { isDateTimePickerVisible: false }; //no more date in state
    this.handleChange = this.handleChange.bind(this);
  }
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleChange = (date) => {
    this.setState({ isDateTimePickerVisible: false });
    this.props.input.onChange(date);
  };
  render() {
    const { input, meta, ...inputProps } = this.props;
    return (
      <React.Fragment>
        <Item error={meta.error && meta.touched} last style={styles.formItem}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.showDateTimePicker}>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleChange}
                onCancel={() =>
                  this.setState({ isDateTimePickerVisible: false })
                }
                {...inputProps}
              />
              <View pointerEvents="none">
                <Input
                  style={styles.formInput}
                  editable={false}
                  enabled={false}
                  label={this.props.label}
                  placeholder={this.props.placeholder}
                  value={
                    //value is transformed to a date, then to the local string representation
                    input.value !== ''
                      ? new Date(input.value).toLocaleDateString()
                      : ''
                  }
                />
              </View>
            </TouchableOpacity>
            {meta.touched && meta.error && (
              <Text style={styles.formError}>{meta.error}</Text>
            )}
          </View>
        </Item>
      </React.Fragment>
    );
  }
}
