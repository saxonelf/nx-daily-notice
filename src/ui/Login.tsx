'use client'
import { Button, Card, Input, Space } from 'antd';
import { useState } from "react";
import styles from './Login.module.css';

export default function Login(props) {
    const [email, setEmail] = useState('');
    return <Space align="center" direction="vertical" size="large">
        <h1>Welcome to NX Daily Notice</h1>
        <Card title="Login">
            <Space direction="vertical">
                <Space.Compact>
                    <p>Use your email to Login</p>
                </Space.Compact>
                <Space.Compact>
                    <Input value={email} placeholder="Your Email" type="email" />
                </Space.Compact>
                <Space.Compact className={styles.login}>
                    <Button className={styles.login} type="primary">Login</Button>
                </Space.Compact>
            </Space>
        </Card>
    </Space>
}