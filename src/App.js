import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ErrorPage from './pages/error-page';
import Home from './pages/Home';
import { UserDataContext } from './data/userContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'profile',
        element: <Profile />,
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  }
]);

function App() {
  const [userInfo, setUserInfo] = useState({
    userLoggedIn: false,
    userAuthCode: null,
    userFullname: null,
    loginEmail: null,
    loginPhone: null,
    userProfile: null,
    userAPIToken: null,
    lastError: null,
    lastUpdated: null
  });

  const updateUserInfo = useCallback(userInfo => {
    const newUserInfoStr = JSON.stringify(userInfo);
    localStorage.setItem("userInfo", newUserInfoStr);
    setUserInfo(userInfo);
  }, []);

  useEffect(() => {
    const userInfoStr = localStorage.getItem("userInfo");
    if (userInfoStr) {
      let storedUserInfo = JSON.parse(userInfoStr);
      if (storedUserInfo?.userLoggedIn && storedUserInfo?.lastUpdated && (Date.now() - Date.parse(storedUserInfo?.lastUpdated)) <= 7 * 24 * 60 * 60 * 1000) {
        storedUserInfo.lastUpdated = new Date().toString();
        setUserInfo(storedUserInfo);
      } else {
        localStorage.setItem("userInfo", JSON.stringify({
          userLoggedIn: false,
          userAuthCode: null,
          userFullname: null,
          loginEmail: null,
          loginPhone: null,
          userProfile: null,
          userAPIToken: null,
          lastError: null,
          lastUpdated: new Date().toString()
        }));
      }
      
    }
  }, []);

  return <UserDataContext.Provider value={{userInfo, update: updateUserInfo}}>
    <RouterProvider router={router} />
  </UserDataContext.Provider>;
}

export default App;
