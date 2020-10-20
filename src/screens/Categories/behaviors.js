import { actionTypes } from '@utils/actionTypes';
import { CALL_API } from '@store/apiMiddleware';

export const categoriesLoadActions = actionTypes('CATEGORIES_LOAD');

const initialState = {
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
        type: categoriesLoadActions,
        endpoint: `/categories`,
      },
    });
  };
}
