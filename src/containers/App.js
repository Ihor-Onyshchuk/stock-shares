import React, { useCallback, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {connect} from 'react-redux';

import Alert from '../components/Alert'; 
import Header from '../components/Header';
import Table from '../containers/Table';
import { fetchData, onPageChange, updateTableData } from '../actions';
import LoadingSpiner from '../components/LoadingSpiner/LoadingSpiner';
import ToggleButton from '../components/ToggleButton';

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

  const handleNext = () => {
    if (isLast) return;
    onPageChange(page + 1)
  }

  const handlePrev = () => {
    if (isFirst) return;
    onPageChange(page - 1)
  }

  return (
    <>
      <Header/>
      <div className="container">
        {loading && <LoadingSpiner/>}
        {error && <Alert type="danger" text="Something go wrong!" />}
        {!!tableData.length && (
          <>
            <DragDropContext onDragEnd={handelOnDragEnd}>
              <Table tableData={tableData} page={page}/>
            </DragDropContext>
            <ToggleButton 
              name="Prev"
              disabled={isFirst}
              handleClick={handlePrev}
            />
            <ToggleButton 
              name="Next"
              disabled={isLast}
              handleClick={handleNext}
            />
          </>
        )}
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
