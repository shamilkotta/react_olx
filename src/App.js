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
const initialPost = {};
export const AuthContext = createContext(initialUser);
export const PostContext = createContext(initialPost)


function App() {
  const auth = getAuth();
  const [user, setUser] = useState(initialUser);
  const [post, setPost] = useState(initialPost)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser({ userId: currentUser.uid, email: currentUser.email, name: currentUser.displayName, status: true });
      else setUser(initialUser);
    });
  }, [auth])


  return (
    <AuthContext.Provider value={{ user }}>
      <PostContext.Provider value={{ post, setPost }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/create' element={user.status ? <Create /> : <Navigate replace to="/login" />} />
            <Route path='/login' element={!user.status ? <Login /> : <Navigate replace to="/" />} />
            <Route path='/signup' element={!user.status ? <Signup /> : <Navigate replace to="/" />} />
            <Route path='/viewpost' element={<ViewPost />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </PostContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
