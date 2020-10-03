import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { fetchData } from '../actions';
import Header from '../components/Header/indes';

const App = ({data, dataSettings, onFetchData}) => {
  useEffect(() => onFetchData(), [])

  return (
    <div>
      <Header/>
      <ul>
        {data && data.map(({companyName, primaryExchange, symbol}) => (
          <li key={symbol}>
            <div>Company {companyName}</div>
            <div>Primary exchange {primaryExchange}</div>
          </li>
        ))}
      </ul>
    </div>
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
