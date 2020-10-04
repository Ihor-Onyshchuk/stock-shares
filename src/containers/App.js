import React, { useCallback, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {connect} from 'react-redux';

import Header from '../components/Header';
import Table from '../containers/Table';
import { fetchData, onPageChange, updateTableData } from '../actions';

const App = ({
  tableData, 
  dataSettings, 
  pageSettings, 
  onFetchData, 
  onPageChange, 
  onTableDataUpdate
}) => {
  const {loading, error } = dataSettings;
  const {page, isLast, isFirst} = pageSettings;

  useEffect(() => {
    onFetchData()
  }, [])

  const handelOnDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = [...tableData];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onTableDataUpdate(items);
  }, [tableData]);

  return (
    <>
      <Header/>
      <div className="container my-5">
        {loading && <div>loading...</div>}
        {error && <div>Error</div>}
        {tableData && (
          <DragDropContext onDragEnd={handelOnDragEnd}>
            <Table tableData={tableData} page={page}/>
          </DragDropContext>
        )}
        <div className="">
          <button 
            onClick={() => onPageChange(page - 1)}
            disabled={isFirst}
            className="btn btn-secondary px-4"
          >
            prev
          </button>
          <button 
            onClick={() => onPageChange(page + 1)}
            disabled={isLast}
            className="btn btn-secondary ml-3 px-4"
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({tableData, dataSettings, pageSettings}) => ({
  tableData,
  dataSettings,
  pageSettings,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => dispatch(fetchData()),
  onPageChange: (page) => dispatch(onPageChange(page)),
  onTableDataUpdate: (data) => dispatch(updateTableData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
