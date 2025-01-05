import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { Signup } from './page/Signup.jsx';
import { Login } from './page/Login.jsx';
import AuthProvider from './config/FireAuthContext.jsx';
import { auth } from './config/firebase.js';
import { AddToy } from './page/AddToy.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider auth={auth}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/addToy' element={<AddToy />}></Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
