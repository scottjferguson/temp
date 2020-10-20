import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { ImageBackground, Switch, LogBox } from 'react-native';
import {
  Container,
  Text,
  Button,
  Form,
  Item,
  Spinner,
  Footer,
  Input,
} from 'native-base';

import moment from 'moment';

import AppHeader from '@components/AppHeader';
import FormInput from '@components/FormInput';
import DateInput from '@components/DateInput';
import PickerInput from '@components/PickerInput';

import Notification from '@components/Notification';
import { required, alphaNumeric, isNumeric } from '@utils/validation';

import * as actions from './behaviors';
import * as expenseSelectors from '@screens/NewExpense/selectors';

import styles from './styles';

import theme from '@theme/variables/myexpense';
import { ScrollView } from 'react-native-gesture-handler';
var Color = require('color');

const light = Color(theme.brandPrimary).alpha(0.3);

LogBox.ignoreAllLogs();

const FORM_NAME = 'AddExpense';

class ExpenseForm extends React.Component {
  static propTypes = {
    loadCategories: PropTypes.func,
    categories: PropTypes.array,
    addExpenseStarted: PropTypes.bool,
    addExpenseSuccess: PropTypes.bool,
    addExpenseError: PropTypes.bool,
    doAddExpense: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }),
    handleSubmit: PropTypes.func.isRequired,
    formValues: PropTypes.object,
  };

  static defaultProps = {
    addCategoryStarted: false,
    addCategorySuccess: false,
    addCategoryError: false,
    formValues: {
      amount: 0,
      title: '',
      category: '',
      date: moment().format('YYYY-MM-DD'),
      permanent: false,
    },
  };

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    if (
      this.props.categories === undefined ||
      this.props.categories.length === 0
    ) {
      this.props.loadCategories();
    }
  };

  handleSubmit = (values) => {
    this.props.doAddExpense(values, () => {
      this.props.navigation.navigate('Expenses');
    });
  };

  render() {
    const {
      navigation,
      handleSubmit,
      categories,
      formValues,
      addExpenseStarted,
      addExpenseError,
    } = this.props;
    return (
      <Container>
        <ImageBackground
          source={require('@assets/images/header-bg-small.png')}
          style={styles.background}>
          <AppHeader navigation={navigation} title="Add Expense" />
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {addExpenseError && (
              <Notification
                message="Error adding a new expense!"
                buttonText="Retry"
                duration={5000}
                position="top"
                type="danger"
              />
            )}
            <Form style={{ backgroundColor: '#FFF' }}>
              <Field
                name="amount"
                label="Amount"
                component={FormInput}
                type="text"
                validate={[required, isNumeric]}
                autoCapitalize="none"
                keyboardType="numeric"
              />
              <Field
                name="title"
                label="Expense title"
                component={FormInput}
                type="text"
                validate={[required, alphaNumeric]}
              />
              <Field
                name="category"
                label="Select Category"
                items={categories}
                component={PickerInput}
              />
              <Field
                name="date"
                label="Expense Date"
                placeholder="Select Date"
                component={DateInput}
              />
              <Field
                name="permanent"
                component={({ input: { onChange } }) => {
                  return (
                    <Item picker style={styles.switch.item}>
                      <Input
                        style={styles.switch.input}
                        disabled
                        placeholder="Every month"
                      />
                      <Switch
                        style={styles.switch.switch}
                        trackColor={{ true: theme.brandPrimary }}
                        thumbColor={
                          formValues.permanent
                            ? theme.brandSecondary
                            : theme.brandLight
                        }
                        ios_backgroundColor={light}
                        value={formValues.permanent}
                        onValueChange={(value) => {
                          onChange(value);
                        }}
                      />
                    </Item>
                  );
                }}
              />
            </Form>
          </ScrollView>
          <Footer style={styles.footer}>
            <Button
              large
              primary
              block
              full
              onPress={handleSubmit(this.handleSubmit)}>
              {addExpenseStarted ? (
                <Spinner color="#fff" />
              ) : (
                <Text> Add </Text>
              )}
            </Button>
            <Button
              transparent
              large
              block
              full
              onPress={() => navigation.navigate('Expenses')}>
              <Text>Cancel</Text>
            </Button>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

export const NewExpenseForm = reduxForm({
  form: FORM_NAME,
})(ExpenseForm);

const mapStateToProps = (state) => ({
  categories: expenseSelectors.getCategories(state),
  addExpenseStarted: expenseSelectors.isAddExpenseStarted(state),
  addExpenseSuccess: expenseSelectors.isAddExpenseSuccess(state),
  addExpenseError: expenseSelectors.isAddExpenseError(state),
  formValues: getFormValues(FORM_NAME)(state),
});

export default connect(mapStateToProps, actions)(NewExpenseForm);
