import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route,RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../dist/css/custom.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

//Components
import Layout from './components/Layout';
import HomePage from './components/HomePage'
import Login from './components/Autenticação/Login'
import LinkRecPass from './components/Autenticação/LinkRecPass'
import RecuperarPass from './components/Autenticação/RecuperarPasse'
import Registar from "./components/Autenticação/Registar"
import ConfirmAccount from './components/Autenticação/ConfirmAccount'
import PageDisciplina from './components/Disciplinas/CadeiraNav'
import CategoryNav from './components/Disciplinas/CategoryNav'
import Upload from './components/Upload'
import MaterialNav from './components/Disciplinas/MaterialNav'
//Loaders
import getDisciplinas from './loaders/getDisciplinasNomes'
import getFiles from './loaders/getFiles'

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route element={<Layout/>}>
      <Route index path="" element={<HomePage/>}/>
      <Route path='/auth'>
        <Route element={<Login/>} path="login"/>
        <Route element={<LinkRecPass/>} path="linkrecpass"/>
      < Route element={<RecuperarPass/>} path="recuperarpass"/>
        <Route element={<Registar/>} path="registar"/>
        <Route element={<ConfirmAccount/>} path="confirmar"/>
      </Route>
      <Route path="/cadeiras">
        <Route index element={<PageDisciplina/>} />
        <Route path=":cadeiraId" element={<CategoryNav/>}/>

        <Route
            path=":cadeiraId/:category"
            element={<MaterialNav />}
            loader={({ params, request }) => {
              const url = new URL(request.url);
              const page = url.searchParams.get('page') || 1; // Extract the page parameter
              return getFiles(params.cadeiraId, params.category, page);
            }}
          />

        </Route>
      <Route path="upload" element={<Upload/>} loader={getDisciplinas}/>
    </Route>
  </Route>
))
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
