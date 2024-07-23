import React, { useCallback, useContext } from 'react';
import { Button, Card, Input, Space } from 'antd';
import { useState } from "react";
import styles from './Login.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserDataContext } from '../data/userContext';
import { Tooltip } from 'antd';
import { getAuthCode, verifyAuthCode } from '../data/api';
import { message } from 'antd';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const WAIT_TIME = 100;
export default function Login(props) {
    const [messageApi, messageContainer] = message.useMessage();
    const [model, setModel] = useState('login');
    const [sessionId, setSessionId] = useState(null);
    const [confirmedName, setConfirmedName] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const currentUser = useContext(UserDataContext);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleLogin = useCallback(async () => {
        if (!email || !email.match(EMAIL_REGEX)) {
            setInvalidEmail(true);
        } else {
            setInvalidEmail(false);
            setLoading(true);
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, WAIT_TIME);
            });
            promise.then(async () => {
                currentUser.update({...currentUser.userInfo, loginEmail: email});
                const data = await getAuthCode('email', email);
                if (data.fullname) {
                    setConfirmedName(data.fullname);
                }
                setModel('auth');
            }).catch(e => {
                messageApi.error(e, 2);
            }).finally(() => {
                setLoading(false);
            });
        }
    },[email,currentUser]);

    const handleVerify = useCallback(async () => {
        try {
            setLoading(true);
            // wait 2 secs
            const promise = new Promise(resolve => {
                setTimeout(() => resolve(), WAIT_TIME);
            });
            promise.then(async () => {
                const userAuthData = await verifyAuthCode('email', email, confirmedName || fullname, null, verificationCode);
                const newUserInfo = {
                    ...currentUser.userInfo,
                    email: email,
                    userFullname: userAuthData.fullname,
                    userLoggedIn: true,
                    userAPIToken: userAuthData.authtoken,
                    lastUpdated: new Date().toString()
                };
                currentUser.update(newUserInfo);
                navigate('/');
            }).catch(e => {
                messageApi.error('Wrong code. Please try again.', 2);
            }).finally(() => {
                setLoading(false);
            });
        } catch(ex) {
            messageApi.error(ex);
            setLoading(false);
        }
    }, [navigate, currentUser, confirmedName, fullname, email, verificationCode]);

    const handleBack = useCallback(() => {
        setModel('login')
    }, [])

    const handleCodeChange = useCallback(v => {
        setVerificationCode(v);
    }, []);

    const handleUpdate = useCallback(e => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            setInvalidEmail(false);
        } else if (e.target.name === 'fullname') {
            setFullname(e.target.value);
        }
    }, []);

    if (currentUser?.userInfo.userLoggedIn && currentUser?.userInfo.userAPIToken) {
        return <Navigate to='/' />;
    }

    return <div className={styles.loginContainer}>
        {messageContainer}
        {model === 'login' && (
            <Space align="center" direction="vertical" size="large">
                <h1>Welcome to NX Daily Notice</h1>
                <Card className={styles.loginCard} title="Login">
                    <Space className={styles.login} direction="vertical">
                        <Space.Compact>
                            <p>Use your email to Login</p>
                        </Space.Compact>
                        <Space.Compact className={styles.login}>
                            <Tooltip placement='topRight' open={invalidEmail} title='Invalid Email'>
                                <Input name='email' value={email} placeholder="Your Email" type="email" onChange={handleUpdate} />
                            </Tooltip>
                        </Space.Compact>
                        <Space.Compact className={styles.login}>
                            <Button loading={loading} className={styles.login} type="primary" onClick={handleLogin}>Login</Button>
                        </Space.Compact>
                    </Space>
                </Card>
            </Space>
        )}
        {model === 'auth' && (
            <Space align="center" direction="vertical" size="large">
                {confirmedName !== null ? <h1>Welcome back {confirmedName}</h1>: <h1>Welcome to NX Daily Notice</h1>}
                <Card className={styles.loginCard} title="Login">
                    <Space className={styles.login} direction="vertical" align='center'>
                        {confirmedName === null && (
                            <>
                                <div className={styles.otp}><p>Input your fullname</p></div>
                                <div className={styles.fullName}>
                                    <Space.Compact><Input name='fullname' value={fullname} onChange={handleUpdate} required /></Space.Compact>
                                </div>
                            </>
                        )}
                        
                        <div className={styles.otp}>
                            <p>Input the 6 digits of verification code</p>
                        </div>
                        <div className={styles.authCode}>
                            <Space.Compact>
                                <Input.OTP name='verificationCode' value={verificationCode} onChange={handleCodeChange} />
                            </Space.Compact>
                        </div>
                        
                        <Space.Compact className={styles.login}>
                            <Button loading={loading} disabled={verificationCode?.trim().length !== 6 || (!confirmedName?.trim() && !fullname?.trim()) } className={styles.login} type="primary" onClick={handleVerify}>Verify</Button>
                            <Button className={styles.login} type="default" onClick={handleBack}>Back</Button>
                        </Space.Compact>
                    </Space>
                </Card>
            </Space>
        )}
    </div>;
}