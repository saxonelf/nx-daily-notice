import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../data/userContext';

export default function Home(props) {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserDataContext);

    useEffect(() => {
        if (!userInfo || !userInfo.userLoggedIn || !userInfo.userAPIToken) {
            navigate('/login');
        } else {
            navigate('profile');
        }
    }, [userInfo]);
    
    return <div>
        <Outlet />
    </div>;
}