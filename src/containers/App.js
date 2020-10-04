import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import { fetchData } from '../actions';
import Header from '../components/Header';
import { pagination } from '../config';
import Table from '../containers/Table';

const App = ({data, dataSettings, onFetchData}) => {
  const [activePage, setActivePage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    onFetchData()
  }, [])

  useEffect(() => {
    const {loading, error} = dataSettings;
    if (!loading && !error) {
      setAllData(data);
      setTableData(getDataChunk(data));
    }
  }, [data]);

  const getDataChunk = (data, page = 1) => {
    const offset = page - 1;
    return data.slice(offset * pagination.perPage, page * pagination.perPage);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setTableData(getDataChunk(allData, page));
  }

  return (
    <>
      <Header/>
      <div className="container my-5">
        <Table 
          data={tableData}
        />
        <div className="">
          <button 
            onClick={() => handlePageChange(activePage - 1)}
            className="btn btn-secondary px-4"
          >
            prev
          </button>
          <button 
            onClick={() => handlePageChange(activePage + 1)}
            className="btn btn-secondary ml-3 px-4"
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({data, dataSettings}) => ({
  data,
  dataSettings
})

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => dispatch(fetchData())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
