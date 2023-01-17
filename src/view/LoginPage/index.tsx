import styles from './index.module.scss';
import { theme, Button, Checkbox, Form, Input, Space } from 'antd';
import React from 'react';

const { useToken } = theme;

const wrapperCol = {
    offset: 4,
    span: 16,
};

const LoginPage: React.FC = () => {
    const { token } = useToken();
    const { colorPrimary, colorBgContainer } = token;
    const [form] = Form.useForm();

    const onFinish = (values: { username: string; password: string; remember: boolean }) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        form.setFieldsValue({
            username: '',
            password: '',
        });
    };

    return (
        <div className={styles['login-page']} style={{ backgroundColor: colorPrimary }}>
            <div className={styles['login-container']} style={{ backgroundColor: colorBgContainer }}>
                <div className={styles['login-title']}>react-cms</div>
                <Form
                    form={form}
                    name="login"
                    wrapperCol={wrapperCol}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
                        <Input placeholder="用户名" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
                        <Input.Password placeholder="密码" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={wrapperCol}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={wrapperCol}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={wrapperCol}>
                        <Button htmlType="button" onClick={onReset} style={{ width: '100%' }}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
