import React from "react";

export const TdRow = ({children, provided, style}) => (
  <tr
    className="table-row"
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={style}
  > 
    {React.Children.map(children, (child) => (
      <td className="table-cell">{child}</td>
    ))}
  </tr>
);

export const ThRow = ({ children }) => (
  <tr >
    {React.Children.map(children, (child) => (
      <th className="table-cell">{child}</th>
    ))}
  </tr>
);
