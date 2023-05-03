import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login } from './modules'
import { Loader } from './components';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Protected = ({ Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
        setUser(user);
      }
      else {
        navigate('/login');
      }
    });

    return () => {
      unSubscribe();
    }
  }, [])
  return isLoading ? <Loader />
    : <Element user={user} />

}

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Protected Element={Home} />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App