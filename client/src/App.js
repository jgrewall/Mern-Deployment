import logo from './logo.svg';
import './App.css';
import {Router} from '@reach/router';
import React, {useState} from 'react';

import MainPage from './views/MainPage';
import NewPage from './views/NewPage';
import DetailPage from './views/DetailPage';
import EditPage from './views/EditPage';

function App() {
  const [updated,setUpdated] = useState(false)
  return (
    <div className="App">
      <h1>Pet Shelter</h1>
      <Router>
        <MainPage updated={updated} path="/"/>
        <DetailPage updated={updated} setUpdate={setUpdated} path="/pets/:id"/>
        <NewPage path="/pets/new"/>
        <EditPage setUpdated={setUpdated} path="/pets/:id/edit"/>
      </Router>
    </div>
  );
}

export default App;
