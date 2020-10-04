import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { TdRow, ThRow } from '../../components/Table/Trow';


const TableContainer = ({data}) => {

  const renderRow = (content, index) => {
    const {
      companyName, 
      primaryExchange, 
      calculationPrice, 
      high, 
      low, 
    } = content;
    
    return (
      <Draggable
        key={index}
        index={index}
        draggableId={index.toString()}
      >
        {(provided) => (
          <TdRow provided={provided} >
            {companyName}
            {primaryExchange}
            {calculationPrice}
            {high}
            {low}
          </TdRow>
        )}
      </Draggable>
    )
  }

  return (
    <table className="table table-borderless shadow p-3 mb-5 bg-white rounded table-hover">
      <thead className="border-bottom border-secondary">
        <ThRow>
          <div>Company</div>
          <div>Primary Exchange</div>
          <div>Calculation Price</div>
          <div>High Price</div>
          <div>Low Price</div>
        </ThRow>
      </thead>
      <Droppable droppableId="droppableId">
        {(provided) => (
          <tbody
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
            {data.map(renderRow)}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </table>
  )
};

export default TableContainer;
