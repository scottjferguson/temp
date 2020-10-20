import { actionTypes } from '@utils/actionTypes';
import { CALL_API } from '@store/apiMiddleware';

export const calendarLoadActions = actionTypes('CALENDAR_LOAD');

const initialState = {
  events: [],
  eventsLoading: true,
  eventsError: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case calendarLoadActions.BEGIN: {
      return { ...state, eventsLoading: true, eventsError: false };
    }
    case calendarLoadActions.ERROR: {
      return { ...state, eventsLoading: false, eventsError: true };
    }
    case calendarLoadActions.SUCCESS: {
      return {
        ...state,
        events: [...action.response],
        eventsLoading: false,
        eventsError: false,
      };
    }
    default:
      return state;
  }
}

/**
 * Action creators
 */
export function getEvents() {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: calendarLoadActions,
        endpoint: `/expenses`,
      },
    });
  };
}
