import React, {useState, useEffect} from "react";

// Styling
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faArrowRotateLeft} from '@fortawesome/free-solid-svg-icons'
import '../styles/button.css'
import '../styles/main.css'

// Components
import NavBar from "./NavBar";
import Table from "./Table";


export default function MainPage() {
  const [isShowFilter, setIsShowFilter] = useState(false)

  const makeDateFormat = (today) => {
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const hours = ('0' + today.getHours()).slice(-2); 
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2); 

    const dateString = year + '-' + month  + '-' + day;
    const timeString = hours + ':' + minutes  + ':' + seconds;
    return `${dateString} ${timeString}`
  }

  const showFilter = () => {
    setIsShowFilter(!isShowFilter)
  }

  const reload = () => {
    window.location.reload()
  }

  useEffect(() => {
    setIsShowFilter(false)
  },[])

  return(
    <>
      <header></header>
      <nav className="main_nav">
        <FontAwesomeIcon icon={faList} onClick={showFilter} size={"3x"} className='btn' />
        {isShowFilter && <NavBar />}
        <FontAwesomeIcon icon={faArrowRotateLeft} size={"3x"} onClick={reload} className='btn' />
      </nav>
      <main className="main_main">
        <div className='main_div'>{'최근 업데이트: '+makeDateFormat(new Date())}</div>  
        <Table />
      </main>
      <footer></footer>
    </>
  )
}

