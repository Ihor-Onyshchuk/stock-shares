import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import { fetchData } from '../actions';
import Header from '../components/Header';
import Table from '../containers/Table';

const App = ({onFetchData}) => {
  useEffect(() => onFetchData(), [])

  return (
    <>
      <Header/>
      <div className="container my-5">
        <Table/>
        <div className="">
          <button className="btn btn-secondary px-4">next</button>
          <button className="btn btn-secondary ml-3 px-4">prev</button>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => dispatch(fetchData())
})

export default connect(null, mapDispatchToProps)(App);
