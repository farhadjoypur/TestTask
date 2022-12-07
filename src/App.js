import React, { useState, useEffect } from 'react';
import './App.css';
import { Route,Routes} from "react-router-dom";
import FirstForm from './Components/First-Form/FirstForm';



const App = () => {
    const [ fetchData, setFetchData] = useState([]);
    useEffect(() => {
      fetch('http://localhost:5000/api')
      .then(result => result.json())
      .then(service => setFetchData(service.result))
    },[])
    const newData = fetchData.map(data => data.options)
  
  return (
    <div className='App'>
          <Routes>
              <Route exact path="/" element={<FirstForm           
              option={newData}
               />} />
          </Routes>
    </div>
  )
}

export default App