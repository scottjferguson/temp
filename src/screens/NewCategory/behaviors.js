import { actionTypes } from '@utils/actionTypes';
import { CALL_API } from '@store/apiMiddleware';

export const categoryAddActions = actionTypes('CATEGORY_ADD');

const initialState = {
  addCategoryStarted: false,
  addCategorySuccess: false,
  addCategoryError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case categoryAddActions.BEGIN: {
      return {
        ...state,
        addCategoryStarted: true,
        addCategorySuccess: false,
        addCategoryError: false,
      };
    }
    case categoryAddActions.SUCCESS: {
      return {
        ...state,
        addCategoryStarted: false,
        addCategorySuccess: true,
        addCategoryError: false,
      };
    }
    case categoryAddActions.ERROR: {
      return {
        ...state,
        addCategoryStarted: false,
        addCategorySuccess: false,
        addCategoryError: true,
      };
    }
    default:
      return state;
  }
}

/**
 * Action creators
 */

export function doAddCategory(values, onSuccess) {
  const data = {
    name: values.name,
    iconName: values.iconName,
    percent: 0,
    amount: 0,
  };
  return async dispatch => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        type: categoryAddActions,
        method: 'post',
        endpoint: `/categories`,
        data: data,
      },
    });
    if (actionResponse.type === categoryAddActions.SUCCESS) {
      onSuccess();
    }
    return actionResponse;
  };
}
