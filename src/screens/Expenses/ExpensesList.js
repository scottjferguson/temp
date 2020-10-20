import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SwipeListView } from 'react-native-swipe-list-view';
import { View, Button, Icon } from 'native-base';

import ExpenseItem from '@components/ExpenseItem';
import categoryColors from '@theme/categoryColors';

import styles from './styles';

class ExpensesList extends Component {
  static propTypes = {
    expensesList: PropTypes.array,
    handleDelete: PropTypes.func,
  };

  static defaultProps = {
    expensesList: [],
  };

  deleteItem(itemId) {
    this.props.handleDelete(itemId);
  }

  render() {
    const { expensesList } = this.props;

    return (
      <View
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#F4F4F4' }}>
        <SwipeListView
          data={expensesList}
          renderItem={({ item, index }) => (
            <ExpenseItem
              item={item}
              color={categoryColors[index % categoryColors.length]}
            />
          )}
          renderHiddenItem={item => (
            <View style={styles.rowBack}>
              <Button
                primary
                full
                style={styles.swipBtn}
                onPress={() => this.deleteItem(item.id)}>
                <Icon active name="trash" style={{ fontSize: 35 }} />
              </Button>
            </View>
          )}
          rightOpenValue={-85}
          disableRightSwipe={true}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default ExpensesList;
