import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Item, View, Input, Text, Icon } from 'native-base';
import PickerModal from 'react-native-picker-modal-view';

import styles from './styles';

export default function PickerInput({
  label,
  items,
  input: { onChange, ...input },
  meta: { touched, error },
}) {
  return (
    <React.Fragment>
      <Item picker error={error && touched} last style={styles.formItem}>
        <View style={{ flex: 1 }}>
          <PickerModal
            style={{ border: 0 }}
            onSelected={(value) => {
              onChange(value);
            }}
            renderSelectView={SelectView}
            items={items}
            showToTopButton={true}
            selected={input.value}
            showAlphabeticalIndex={true}
            autoGenerateAlphabeticalIndex={true}
            selectPlaceholderText={label}
            searchPlaceholderText={'Search...'}
            requireSelection={false}
            autoSort={false}
          />

          {touched && error && <Text style={styles.formError}>{error}</Text>}
        </View>
      </Item>
    </React.Fragment>
  );
}

function SelectView(
  selectViewIsDisabled,
  selectedObject,
  openModal,
  placeHolder
) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => openModal()}>
      <View
        pointerEvents="none"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          paddingRight: 22,
        }}>
        <Input
          editable={false}
          enabled={false}
          style={styles.formInput}
          placeholder={placeHolder ? placeHolder : 'Select Category'}
          value={
            selectedObject && selectedObject.Name ? selectedObject.Name : ''
          }
        />

        <Icon active name="ios-arrow-down" />
      </View>
    </TouchableOpacity>
  );
}