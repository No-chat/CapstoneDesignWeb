import axios from "axios";
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

// Styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components'

// Components
import TableRow from "./TableRow";

// URI, Table HEADER
const TRAFFIC_URI = 'http://localhost:8080/api/traffic-infos';
const HEADER = ['날짜', '차량 번호', '속력'];

export default function Table() {
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  
  const pathname = useLocation().pathname
  const query = useLocation().search
  
  // 현재 location에 따른 data 가져오기
  useEffect(() => {
    setLoading(true)
    axios.get(TRAFFIC_URI+pathname+query)
    .then(result => {
      setTableData(result.data)
      setLoading(false)
    })
    .catch(console.log)
  }, [pathname, query])

  return(
    <>
      <StyledDiv>
        <div>
        {loading && <FontAwesomeIcon icon={faSpinner} size={"5x"} pulse />}
        {!loading && (
          <StyledTable>
            <table>
              <thead>
                <tr>
                  {HEADER.map(d => <th>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {tableData.map((data) => {
                  return (
                    <TableRow id = {data._id} data = {data} />
                  )
                })}
              </tbody>
            </table>
          </StyledTable>
        )}
        </div>
      </StyledDiv>
    </>
  )
}

const StyledTable = styled.table`
  border-collapse: collapse;
  border-bottom: 3px solid black;
  margin: auto;
  margin-top: 20px; 
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
`
const StyledDiv = styled.div`
  width: 500px;
  height: 500px;
`