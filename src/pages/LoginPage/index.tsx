import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/datas/user';
import type { RootState } from '@/store/index';
// 表单
import { Form, Input, Button, Checkbox, message } from 'antd';
import type { FormProps } from 'antd';
// 请求
import { post } from '@/utils/request';
import { loginApi } from '@/services';

// 资源
import './index.css'
import logo from '@/assets/images/react.svg';
import left from '@/assets/images/left.png';
const FormLogin: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        post(loginApi, values).then((res: { code: number; data: RootState['user']; message: any; }) => {
            if (res.code === 200) {
                localStorage.setItem('authToken', "Bearer " + res.data.token); // 将 token 存储到 localStorage
                dispatch(setUserInfo(res.data))
                messageApi.open({
                    type: 'success',
                    content: '登录成功',
                });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.message,
                });
            }
        });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (_errorInfo) => {
        messageApi.open({
            type: 'error',
            content: '请检查账号及密码！'
        });
    };

    return (
        <>
            {contextHolder}
            <Form
                name="loginForm"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600 }}
                initialValues={{ username:"admin", remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入账号!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>记住状态</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        登 录
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};
const LoginPage: React.FC = () => (
    <div>
        <div className="login-header">
            <div className="container">
                <div className="login-logo">
                    <img src={logo} alt="" />
                    <h3>后台管理系统</h3>
                </div>
            </div>
        </div>
        <div className="login-from">
            <div className="container">
                <div className="login-left ">
                    <img src={left} alt="" />
                </div>
                <div className="login-right">
                    <h3 className="login-title">账号密码登录</h3>
                    <FormLogin />
                    <p className="login-footer" style={{'marginLeft': '50px'}}><Link to="/regist">前往注册</Link></p>
                </div>
            </div>
        </div>
        <div className="login-footer">
            <p>Copyright © 2021</p>
        </div>
    </div>
);
export default LoginPage;