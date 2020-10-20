import { actionTypes } from '@utils/actionTypes';
import { CALL_API } from '@store/apiMiddleware';

export const expensesSearchActions = actionTypes('EXPENSES_SEARCH');
export const expensesExportActions = actionTypes('EXPENSES_EXPORT');

const initialState = {
  searchResult: [],
  currentPage: 1,
  searching: true,
  searchError: false,
  exporting: true,
  exportSucess: false,
  exportError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case expensesSearchActions.BEGIN: {
      return { ...state, searching: true, searchError: false };
    }
    case expensesSearchActions.SUCCESS: {
      return {
        ...state,
        searchResult: [...action.response],
        searching: false,
        searchError: false,
        currentPage: action.page,
      };
    }
    case expensesSearchActions.ERROR: {
      return { ...state, searching: false, searchError: true };
    }
    case expensesExportActions.BEGIN: {
      return {
        ...state,
        exporting: true,
        exportSucess: false,
        exportError: false,
      };
    }
    case expensesExportActions.SUCCESS: {
      return {
        ...state,
        exporting: false,
        exportSucess: true,
        exportError: false,
      };
    }
    case expensesExportActions.ERROR: {
      return {
        ...state,
        exporting: false,
        exportSucess: false,
        exportError: true,
      };
    }
    default:
      return state;
  }
}

/**
 * Action creators
 */
export function doSearch(query) {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: expensesSearchActions,
        endpoint: `/expenses`,
      },
    });
  };
}

export function doExport(query) {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: expensesExportActions,
        endpoint: `/expenses/export`,
      },
    });
  };
}
