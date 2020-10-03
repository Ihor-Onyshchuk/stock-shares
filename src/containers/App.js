import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import { fetchData } from '../actions';
import Header from '../components/Header/indes';
import Table from '../containers/Table';

const App = ({onFetchData}) => {
  useEffect(() => onFetchData(), [])

  return (
    <>
      <Header/>
      <div className="container my-5">
        <Table/>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => dispatch(fetchData())
})

export default connect(null, mapDispatchToProps)(App);
