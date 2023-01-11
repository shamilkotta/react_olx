import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';

import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Create from './Pages/Create';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ViewPost from './Pages/ViewPost';
import NotFound from './Pages/NotFound';

const initialUser = { email: "", name: "", status: false };
export const AuthContext = createContext(initialUser);


function App() {
  const auth = getAuth();
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser({ email: currentUser.email, name: currentUser.displayName, status: true });
      else setUser(initialUser);
    });
  }, [auth])


  return (
    <AuthContext.Provider value={{ user }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/create' element={<Create />} />
          <Route path='/login' element={!user.status ? <Login /> : <Navigate to="/" />} />
          <Route path='/signup' element={!user.status ? <Signup /> : <Navigate to="/" />} />
          <Route path='/viewpost' element={<ViewPost />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
