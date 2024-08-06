import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../dist/css/custom.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import Layout from './components/Layout';
import HomePage from './components/HomePage'
import Login from './components/Autenticação/Login'
import LinkRecPass from './components/Autenticação/LinkRecPass'
import RecuperarPass from './components/Autenticação/RecuperarPasse'
import Registar from "./components/Autenticação/Registar"
import ConfirmAccount from './components/Autenticação/ConfirmAccount'
import DisciplinasPag from './components/Disciplinas/PageDisciplina'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index path="" element={<HomePage/>}/>
          <Route path='/auth'>
            <Route element={<Login/>} path="login"/>
            <Route element={<LinkRecPass/>} path="linkrecpass"/>
          < Route element={<RecuperarPass/>} path="recuperarpass"/>
            <Route element={<Registar/>} path="registar"/>
            <Route element={<ConfirmAccount/>} path="confirmar"/>
          </Route>
          <Route path="/cadeiras" element={<DisciplinasPag/>}>
            <Route path=":year/:semester/:category" index/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
