import {combineReducers} from 'redux';

import {dataSettings as defaultDataSettings, pageSettings as defaultPageSettings} from '../config';
import {
  CHANGE_PAGE,
  UPDATE_TABLE_DATA,
  FETCH_DATA_REQUEST,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from '../actions';

const data = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return action.result;
    default:
      return state;
  }
}

const dataSettings = (state = defaultDataSettings, action) => {
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

const tableData = (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
    case CHANGE_PAGE:
      const {result, pageSettings: {perPage, page}} = action;
      return result.slice((page - 1) * perPage, page * perPage);
    case UPDATE_TABLE_DATA:
      return action.data;
    default:
      return state;
  }
}

const pageSettings = (state = defaultPageSettings, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
    case CHANGE_PAGE:
      const {result, pageSettings: {perPage, page}} = action;
      return {
        ...state,
        page,
        isFirst: page === 1,
        isLast: page * perPage >= result.length,
      }
    default:
      return state;
  }
}

export default combineReducers({
  data,
  tableData,
  dataSettings,
  pageSettings,
})