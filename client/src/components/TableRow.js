import React, {useState, useEffect} from 'react';

// Styling
import '../styles/table.css'

export default function TableRow({id, data}) {
  const [RowData, setRowData] = useState(data);

  return (
    <tr key = {id}>
      <td className='table_td'>{RowData.date}</td>
      <td className='table_td'>{RowData.carNumber}</td>
      <td className='table_td'>{RowData.carSpeed}</td>
      <td style={{
        padding: "10px",
        borderBottom: '1px solid',
        textAlign: 'center'
        }}>{RowData.condition}</td>
    </tr>    
  )
}
