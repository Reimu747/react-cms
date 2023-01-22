import styles from './index.module.scss';
import { theme, Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';
import { postFetcher } from '@/swr/swrConfig';
import { useBeforeRouterEnter } from '@/hooks/useBeforeRouterEnter';
import { ResponseImpl } from '@/types/request';
import UserImpl from '@/types/user';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slice/userSlice';
import { HOME_PATH, TOKEN_KEY } from '@/types/variable';

const { useToken } = theme;

const wrapperCol = {
    offset: 4,
    span: 16,
};

const LoginPage: React.FC = () => {
    const { token } = useToken();
    const { colorPrimary, colorBgContainer } = token;
    const [form] = Form.useForm();
    const navigateTo = useNavigate();
    const { trigger, isMutating } = useSWRMutation('https://mock.apifox.cn/m1/2150034-0-default/login', postFetcher);

    useBeforeRouterEnter(true);
    const dispatch = useAppDispatch();
    const onSetUser = (data: Partial<UserImpl>) => {
        const { user, avatar } = data;
        dispatch(
            setUser({
                user,
                avatar,
            })
        );
    };

    const onFinish = async (values: { username: string; password: string; remember: boolean }) => {
        // 验证username password
        const { username, password } = values;
        const res: ResponseImpl<UserImpl> = await trigger({ username, password });
        const { code } = res;

        if (code === 200 && res.data) {
            const { data } = res;
            const { token: tokenId = '', user = '', avatar = '' } = data;
            navigateTo(HOME_PATH);
            // 设置local storage
            localStorage.setItem(TOKEN_KEY, JSON.stringify({
                tokenId,
                timestamp: new Date().getTime(),
                user,
                avatar,
            }));
            // 设置redux用户信息
            onSetUser({ user, avatar });
        } else {
            message.error(res?.message);
        }
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
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={isMutating}>
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
