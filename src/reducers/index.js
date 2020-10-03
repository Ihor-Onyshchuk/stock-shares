import {combineReducers} from 'redux';

import {settings} from '../config';
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS
} from '../actions';

const data = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return action.result;
    default:
      return state;
  }
}

const dataSettings = (state = settings, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {loading: true, error: false};
    case FETCH_DATA_SUCCESS:
      return {loading: false, error: false};
    case FETCH_DATA_FAILURE:
      return {loading: false, error: true}
    default:
      return state;
  }
}

export default combineReducers({
  data,
  dataSettings
})