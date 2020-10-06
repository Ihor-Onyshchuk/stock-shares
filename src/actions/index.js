import {getStockInfo} from '../api';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA';

const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

const fetchDataFailure = () => ({
  type: FETCH_DATA_FAILURE,
});

const fetchDataSuccess = (result, pageSettings) => ({
  type: FETCH_DATA_SUCCESS,
  pageSettings,
  result,
});

export const fetchData = () => (dispatch, getState) => {
  dispatch(fetchDataRequest());
  getStockInfo()
    .then((response) => {
      const {pageSettings} = getState();
      dispatch(fetchDataSuccess(response.data || [], pageSettings))
    })
    .catch(() => dispatch(fetchDataFailure()))
};

const pageChange = (result, pageSettings) => ({
  type: CHANGE_PAGE,
  result,
  pageSettings,
});

export const onPageChange = (nextPage) => (dispatch, getState) => {
  const {data, pageSettings} = getState();
  dispatch(pageChange(data, {...pageSettings, page: nextPage}))
};

export const updateTableData = (data) => ({
  type: UPDATE_TABLE_DATA,
  data,
})