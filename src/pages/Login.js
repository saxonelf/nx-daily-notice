import React, { useCallback, useContext } from 'react';
import { Button, Card, Input, Space } from 'antd';
import { useState } from "react";
import styles from './Login.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserDataContext } from '../data/userContext';

export default function Login(props) {
    const [model, setModel] = useState('login');
    const [sessionId, setSessionId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const currentUser = useContext(UserDataContext);

    const navigate = useNavigate();
    const handleLogin = useCallback(() => {
        setModel('auth');
    },[]);

    const handleVerify = useCallback(() => {
        const newUserInfo = {
            ...currentUser.userInfo,
            email: email,
            name: name,
            userLoggedIn: true,
            userAPIToken: 'abcdefg'
        };
        currentUser.update(newUserInfo);
        navigate('/');
    }, [navigate, currentUser, name, email]);

    const handleBack = useCallback(() => {
        setModel('login')
    }, [])

    const handleCodeChange = useCallback(v => {
        setVerificationCode(v);
    }, []);

    const handleUpdate = useCallback(e => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
    }, []);

    if (currentUser?.userInfo.userLoggedIn && currentUser?.userInfo.userAPIToken) {
        return <Navigate to='/' />;
    }

    return <div className={styles.loginContainer}>
        {model === 'login' && (
            <Space align="center" direction="vertical" size="large">
                <h1>Welcome to NX Daily Notice</h1>
                <Card className={styles.loginCard} title="Login">
                    <Space className={styles.login} direction="vertical">
                        <Space.Compact>
                            <p>Use your email to Login</p>
                        </Space.Compact>
                        <Space.Compact className={styles.login}>
                            <Input name='email' value={email} placeholder="Your Email" type="email" onChange={handleUpdate} />
                        </Space.Compact>
                        <Space.Compact className={styles.login}>
                            <Button className={styles.login} type="primary" onClick={handleLogin}>Login</Button>
                        </Space.Compact>
                    </Space>
                </Card>
            </Space>
        )}
        {model === 'auth' && (
            <Space align="center" direction="vertical" size="large">
                {name !== null ? <h1>Welcome back {name}</h1>: <h1>Welcome to NX Daily Notice</h1>}
                <Card className={styles.loginCard} title="Login">
                    <Space className={styles.login} direction="vertical" align='center'>
                        <div className={styles.otp}>
                            <p>Input the 6 digits of verification code</p>
                        </div>
                        <div className={styles.authCode}>
                            <Space.Compact>
                                <Input.OTP name='verificationCode' value={verificationCode} onChange={handleCodeChange} />
                            </Space.Compact>
                        </div>
                        
                        <Space.Compact className={styles.login}>
                            <Button disabled={verificationCode?.trim().length !== 6} className={styles.login} type="primary" onClick={handleVerify}>Verify</Button>
                            <Button className={styles.login} type="default" onClick={handleBack}>Back</Button>
                        </Space.Compact>
                    </Space>
                </Card>
            </Space>
        )}
    </div>;
}