import { actionTypes } from '@utils/actionTypes';
import { CALL_API } from '@store/apiMiddleware';

export const expensesLoadActions = actionTypes('EXPENSES_LOAD');
export const expensesDeleteActions = actionTypes('EXPENSES_DELETE');

const initialState = {
  expenses: [],
  expensesLoading: true,
  expensesError: false,
  expenseDeleting: false,
  expenseDeleted: false,
  expenseDeletingError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case expensesLoadActions.BEGIN: {
      return { ...state, expensesLoading: true, expensesError: false };
    }
    case expensesLoadActions.SUCCESS: {
      return {
        ...state,
        expenses: [...action.response],
        expensesLoading: false,
        expensesError: false,
      };
    }
    case expensesLoadActions.ERROR: {
      return { ...state, expensesLoading: false, expensesError: true };
    }
    case expensesDeleteActions.BEGIN: {
      return {
        ...state,
        expenseDeleting: true,
        expenseDeleted: false,
        expenseDeletingError: false,
      };
    }
    case expensesDeleteActions.SUCCESS: {
      return {
        ...state,
        expenseDeleting: false,
        expenseDeleted: true,
        expenseDeletingError: false,
      };
    }
    case expensesDeleteActions.ERROR: {
      return {
        ...state,
        expenseDeleting: false,
        expenseDeleted: false,
        expenseDeletingError: true,
      };
    }
    default:
      return state;
  }
}

/**
 * Action creators
 */
export function getExpenses() {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: expensesLoadActions,
        endpoint: `/expenses`,
      },
    });
  };
}

export function deleteExpense(id) {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: expensesDeleteActions,
        method: 'delete',
        endpoint: `/expenses/` + id,
      },
    });
  };
}
