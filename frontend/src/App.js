import React from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Editor from './components/Editor';

const App = () => {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Editor/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
