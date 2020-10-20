import { actionTypes } from '@utils/actionTypes';
import { CALL_API } from '@store/apiMiddleware';

export const expensesStatLoadActions = actionTypes('EXPENSES_STATS_LOAD');

const initialState = {
  categories: [],
  categoriesLoading: true,
  categoriesError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case expensesStatLoadActions.BEGIN: {
      return { ...state, categoriesLoading: true, categoriesError: false };
    }
    case expensesStatLoadActions.ERROR: {
      return { ...state, categoriesLoading: false, categoriesError: true };
    }
    case expensesStatLoadActions.SUCCESS: {
      return {
        ...state,
        categories: [...action.response],
        categoriesLoading: false,
        categoriesError: false,
      };
    }
    default:
      return state;
  }
}

/**
 * Action creators
 */

export function getCategories() {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: expensesStatLoadActions,
        endpoint: `/categories`,
      },
    });
  };
}
