import React from 'react';
import {connect} from 'react-redux';

import { TdRow, ThRow } from '../../components/Table/Trow';


const TableContainer = ({data}) => {

  const renderRow = (content) => {
    const {
      companyName, 
      primaryExchange, 
      calculationPrice, 
      high, 
      low, 
      symbol
    } = content;
    
    return (
      <TdRow key={symbol}>
        {companyName}
        {primaryExchange}
        {calculationPrice}
        {high}
        {low}
      </TdRow>
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
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  )
};

export default TableContainer;
