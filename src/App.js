import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import React from 'react';
import Register from './pages/register/Register';
import { UserContextProvider } from './contexts/UserContext';
import Navbar from './components/header/Navbar';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={< Home />} ></Route>
            <Route exact path='/login' element={< Login />} ></Route>
            <Route exact path='/register' element={< Register />} ></Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
