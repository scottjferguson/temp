import { actionTypes } from '@utils/actionTypes';
import { CALL_API } from '@store/apiMiddleware';

export const categoriesLoadActions = actionTypes('CATEGORIES_LOAD');
export const expensesAddActions = actionTypes('EXPENSE_ADD');

const initialState = {
  addExpenseStarted: false,
  addExpenseSuccess: false,
  addExpenseError: false,
  categories: [],
  categoriesLoading: false,
  categoriesError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case categoriesLoadActions.BEGIN: {
      return { ...state, categoriesLoading: true, categoriesError: false };
    }
    case categoriesLoadActions.ERROR: {
      return { ...state, categoriesLoading: false, categoriesError: true };
    }
    case categoriesLoadActions.SUCCESS: {
      return {
        ...state,
        categories: [...action.response],
        categoriesLoading: false,
        categoriesError: false,
      };
    }
    case expensesAddActions.BEGIN: {
      return {
        ...state,
        addExpenseStarted: true,
        addExpenseSuccess: false,
        addExpenseError: false,
      };
    }
    case expensesAddActions.SUCCESS: {
      return {
        ...state,
        addExpenseStarted: false,
        addExpenseSuccess: true,
        addExpenseError: false,
      };
    }
    case expensesAddActions.ERROR: {
      return {
        ...state,
        addExpenseStarted: false,
        addExpenseSuccess: false,
        addExpenseError: true,
      };
    }
    default:
      return state;
  }
}

/**
 * Action creators,
 */

export function doAddExpense(values, onSuccess) {
  const data = {
    amount: Number(values.amount),
    title: values.title,
    category: values.category,
    date: values.date,
    permanent: values.permanent,
  };
  return async dispatch => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        type: expensesAddActions,
        method: 'post',
        endpoint: `/expenses`,
        data: data,
      },
    });
    if (actionResponse.type === expensesAddActions.SUCCESS) {
      onSuccess();
    }
    return actionResponse;
  };
}

export function loadCategories() {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: categoriesLoadActions,
        endpoint: `/categories`,
      },
    });
  };
}
