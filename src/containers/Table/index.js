import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { TdRow, ThRow } from '../../components/Table/Trow';
import '../../components/Table/Table.scss';

const getDraggableStyle = (isDragging, provided) => ({
  borderRadius: isDragging ? '10px' : 'none',
  boxShadow: isDragging ? '0 .5rem 1rem rgba(0,0,0,.15)' : 'none',
  display: isDragging ? 'table' : 'table-row',
  ...provided.draggableProps.style,
});

const getDroppabeStyle = (isDraggingOver) => ({
  backgroundColor: isDraggingOver ? '#95A5A6' : 'white'
});

const TableContainer = ({tableData, page}) => {
  const renderRow = (content, index) => {
    const {
      companyName, 
      primaryExchange, 
      calculationPrice, 
      high, 
      low,
    } = content;
    const noValue = <span>&#9866;</span>;
    const rowNumber = (index + 1) + (page - 1 ) * 10;
        
    return (
      <Draggable
        key={index}
        index={index}
        draggableId={index.toString()}
      >
        {(provided, {isDragging}) => (
          <TdRow
            provided={provided} 
            style={getDraggableStyle(isDragging, provided)}
          >
            {rowNumber}
            {companyName || noValue}
            {primaryExchange || noValue}
            {calculationPrice || noValue}
            {high || noValue} 
            {low || noValue}  
          </TdRow>
        )}
      </Draggable>
    )
  };

  return (
    <table className="table table-borderless shadow bg-white rounded">
      <caption>Most active companies</caption>
      <thead className="thead border-bottom border-secondary table-head">
        <ThRow>
          <span>&#8470;</span>
          <span>Company</span>
          <span>Primary Exchange</span>
          <span>Calculation Price</span>
          <span>High Price&#47;&#36;</span>
          <span>Low Price&#47;&#36;</span>
        </ThRow>
      </thead>
      <Droppable droppableId="droppableId">
        {(provided, {isDraggingOver}) => (
          <tbody
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getDroppabeStyle(isDraggingOver)}
          >
            {tableData.map(renderRow)}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </table>
  )
};

export default TableContainer;
