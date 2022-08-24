import React, {useState, useEffect} from 'react'
import ReactDatePicker from 'react-datepicker';
import { useNavigate, useLocation } from 'react-router-dom'
import qs from 'qs'

// Styling
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilter, faGaugeHigh, faCalenderDays} from '@fortawesome/free-solid-svg-icons'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';




export default function NavBar() {
  const navigate = useNavigate();
  const parsedQuery = qs.parse(useLocation().search, { ignoreQueryPrefix: true })
  const queryMin = parsedQuery.minSpeed === undefined ? '' : parsedQuery.minSpeed
  const queryMax = parsedQuery.maxSpeed === undefined ? '' : parsedQuery.maxSpeed
  const queryStart = parsedQuery.startDate === undefined ? null : new Date(parsedQuery.startDate)
  const queryEnd = parsedQuery.endDate === undefined ? null : new Date(parsedQuery.endDate)

  // 화면에 렌더링 되는 상태값 
  const [minSpeed, setMinSpeed] = useState('')
  const [maxSpeed, setMaxSpeed] = useState('')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSpeedFilter, setIsSpeedFilter] = useState(false)
  const [isDateFilter, setIsDateFilter] = useState(false)

  let isDate = false
  let isSpeed = false
  const queryList = [
    {
      type : 'speed',
      query : 'minSpeed',
      value: minSpeed,
      bool : isSpeed
    },
    {
      type : 'speed',
      query : 'maxSpeed',
      value: maxSpeed,
      bool : isSpeed
    },
    {
      type : 'date',
      query : 'startDate',
      value: startDate,
      bool : isDate
    },
    {
      type : 'date',
      query : 'endDate',
      value: endDate,
      bool : isDate
    },
  ]

  // handle input value
  const handleSpeed = (value, query) => {
    if(query === 'minSpeed') setMinSpeed(value)
    else if(query === 'maxSpeed') setMaxSpeed(value)
    changeValueInQueryList(query, value)
  }

  const handleDate = (value, query) => {
    if(query === 'startDate') setStartDate(value)
    else if(query === 'endDate') setEndDate(value)
    changeValueInQueryList(query, value)
  }

  // change queryList value
  const changeValueInQueryList = (query_f, value) => {
    const findIndex = queryList.findIndex(d => d.query === query_f)
    queryList[findIndex].value = value
  }

  // check and update boolean value
  const checkBool = () => {
    if (queryList[0].value !== '' && queryList[1].value !== '') {
      isSpeed = true
      setIsSpeedFilter(true)
    }
    else {
      isSpeed = false
      setIsSpeedFilter(false)
    }
    if(queryList[2].value !== null && queryList[3].value !== null) {
      isDate = true
      setIsDateFilter(true)
    }
    else {
      isDate = false
      setIsDateFilter(false)
    }
  }

  // change boolean value before filtering
  const changeBoolInQueryList = () => {
    queryList.forEach(d => {
      if(d.type === 'speed') d.bool = isSpeed
      else if(d.type === 'date') d.bool = isDate
    })
  }

  // make queryString by using queryList
  const setQuery = () => {
    const filtered = queryList.filter(d => d.bool === true)
    const queryString = filtered.map(d => {
      return filtered[0] === d?`${d.query}=${d.value}`:`&${d.query}=${d.value}`
    }).join('')
    return queryString
  }

  // handle filtering
  const filtering = (e) => {
    e.preventDefault()
    checkBool()
    changeBoolInQueryList()
    const queryString = setQuery()
    if (queryString === '') window.location.assign('/')
    else {
      navigate('/filteredData?'+queryString)
    }
  }

  const speedFilterCancel = (e) => {
    changeValueInQueryList('minSpeed', '')
    changeValueInQueryList('maxSpeed', '')
    setMinSpeed('')
    setMaxSpeed('')
    filtering(e)
  }

  const dateFilterCancel = (e) => {
    changeValueInQueryList('startDate', null)
    changeValueInQueryList('endDate', null)
    setStartDate(null)
    setEndDate(null)
    filtering(e)
  }



  useEffect(() => {
    console.log(queryList)
    changeValueInQueryList('minSpeed', queryMin)
    changeValueInQueryList('maxSpeed', queryMax)
    changeValueInQueryList('startDate', queryStart)
    changeValueInQueryList('endDate', queryEnd)
    checkBool()
    changeBoolInQueryList()
    setMinSpeed(queryMin)
    setMaxSpeed(queryMax)
    setStartDate(queryStart)
    setEndDate(queryEnd)
  }, [])


  return(
    <>
      <StyledDiv>
        <div>
          <section>
            <form>
              <input type='text' value={minSpeed} onChange={({target: {value}}) => {
                handleSpeed(value, 'minSpeed')
              }} />
              <input type='text' value={maxSpeed} onChange={({target: {value}}) => {
                handleSpeed(value, 'maxSpeed')
              }} />
              <FontAwesomeIcon icon={faFilter} onClick={filtering} type="submit" />
              
            </form>
          </section>
          <section>
            <ReactDatePicker
              selected={startDate}
              onSelect={(date) => {
                handleDate(date, 'startDate')
              }}
            />
            <ReactDatePicker
              selected={endDate}
              onSelect={(date) => {
                handleDate(date, 'endDate')
              }}
            />
            <FontAwesomeIcon icon={faFilter} onClick={filtering} />
          </section>
        </div>
      </StyledDiv>
      {isSpeedFilter && <button onClick={speedFilterCancel}>{minSpeed + '-' + maxSpeed}</button>}
      {isDateFilter && <button onClick={dateFilterCancel}>{startDate + '-' + endDate}</button>}
    </>
  )
}

const StyledDiv = styled.div`
  position: absolute;
`