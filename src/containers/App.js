import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {connect} from 'react-redux';

import Header from '../components/Header';
import Table from '../containers/Table';
import { fetchData } from '../actions';
import { pagination } from '../config';

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

  const handlePageChange = useCallback((page) => {
    setActivePage(page);
    setTableData(getDataChunk(allData, page));
  }, [activePage, tableData])

  const handelOnDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = Array.from(tableData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTableData(items);
  }, [tableData]);

  return (
    <>
      <Header/>
      <div className="container my-5">
        <DragDropContext onDragEnd={handelOnDragEnd}>
            <Table data={tableData} />
        </DragDropContext>
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
