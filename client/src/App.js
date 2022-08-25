import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Styling
import "react-datepicker/dist/react-datepicker.css";


// Components
import MainPage from './components/MainPage';



function App() {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/filteredData' element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
