import React, {useState, useEffect} from 'react';
import styled from 'styled-components'

export default function TableRow({id, data}) {
  const [RowData, setRowData] = useState(data);

  return (
    <>
    
      <tr key = {id}>
        <td>{RowData.date}</td>
        <td>{RowData.carNumber}</td>
        <td>{RowData.carSpeed}</td>
        <td>{RowData.condition}</td>
      </tr>
    
    </>
  )
}

const StyledTd = styled.td`
  border: 1px solid
`