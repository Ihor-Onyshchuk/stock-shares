import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { TdRow, ThRow } from '../../components/Table/Trow';
import '../../components/Table/Table.scss';

const getDraggableStyle = (isDragging, provided) => ({
  backgroundColor: isDragging ? 'white' : 'none',
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
            {(index + 1) + (page - 1 ) * 10}
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
    <table className="table table-borderless shadow mb-3 bg-white rounded">
      <caption>Most active companies rating</caption>
      <thead className="thead border-bottom border-secondary">
        <ThRow>
          <div>&#8470;</div>
          <div>Company</div>
          <div>Primary Exchange</div>
          <div>Calculation Price</div>
          <div>High Price&#47;&#36;</div>
          <div>Low Price&#47;&#36;</div>
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
