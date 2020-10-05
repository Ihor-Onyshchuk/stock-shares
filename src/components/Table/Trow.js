import React from "react";

export const TdRow = ({children, provided}) => (
  <tr
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  > 
    {React.Children.map(children, (child) => (
      <td className="text-left">{child}</td>
    ))}
  </tr>
)

export const ThRow = ({ children }) => (
  <tr >
    {React.Children.map(children, (child) => (
      <th className="text-left">{child}</th>
    ))}
  </tr>
);