import React from 'react';

const THead = ({ children }) => (
  <thead>
    <tr>
      {React.Children.map(children, (child) => (
        <th>{child}</th>
      ))}
    </tr>
  </thead>
);

export default THead;