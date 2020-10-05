import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { TdRow, ThRow } from '../../components/Table/Trow';


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
        {(provided) => (
            <TdRow provided={provided}>
              <div>{(index + 1) + (page - 1 ) * 10}</div>
              <div>{companyName}</div>
              <div>{primaryExchange}</div>
              <div>{calculationPrice}</div>
              <div>{high || noValue}</div>
              <div>{low || noValue}</div>
            </TdRow>
          )
        }
      </Draggable>
    )
  };

  return (
    <table className="table table-borderless shadow p-3 mb-5 bg-white rounded table-hover">
      <thead className="border-bottom border-secondary">
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
        {(provided) => (
          <tbody
            {...provided.droppableProps}
            ref={provided.innerRef}
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
