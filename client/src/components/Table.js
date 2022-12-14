import axios from "axios";
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

// Styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner, faFileCircleXmark} from '@fortawesome/free-solid-svg-icons'
import "react-datepicker/dist/react-datepicker.css";
import '../styles/table.css'

// Components
import TableRow from "./TableRow";

// URI, Table HEADER
const TRAFFIC_URI = 'http://localhost:8080/api/traffic-infos';
const HEADER = ['날짜', '차량 번호', '속력', '조건'];

export default function Table() {
  const [loading, setLoading] = useState(false)
  const [isData, setIsData] = useState(true)
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
      setIsData(true)
    })
    .catch((e) => setIsData(false))
  }, [pathname, query])

  return(
    <>
        <div className="table_div">
        {isData? 
        loading?<FontAwesomeIcon icon={faSpinner} size={"4x"} pulse />:null
        :<><FontAwesomeIcon icon={faFileCircleXmark} size={"4x"} /><div className="div_text">No match data</div></>
      }
        {(!loading && isData) && (
          <table className="table_table">
            <thead className="table_thead">
              <tr>
                {HEADER.map(d => <th className="table_th">{d}</th>)}
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
        )}
        </div>
      
    </>
  )
}

