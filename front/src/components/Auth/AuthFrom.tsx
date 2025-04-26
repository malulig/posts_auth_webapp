import { Button, Col, Form, FormProps, Input, Switch, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, register } from "../../store/users/users.async";
import { useNavigate } from "react-router-dom";

export type AuthFieldType = {
  username: string;
  password: string;
};

export function AuthForm() {
  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<AuthFieldType>();
  const navigate = useNavigate();

  const showError = (err: Error) => {
    api.error({
      message: `Ошибка: ${err.message}`,
      placement: "top",
      duration: 5,
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/posts");
    } else if (error) {
      showError(typeof error === "string" ? new Error(error) : error);
      form.resetFields(["password"]);
    }
  }, [user, error, api, form]);

  const onFinish: FormProps<AuthFieldType>["onFinish"] = async (values) => {
    await dispatch(isLogin ? login(values) : register(values));
  };

  return (
    <Col>
      {contextHolder}
      <Switch
        checkedChildren="Login"
        unCheckedChildren="Register"
        style={{ marginBottom: "25px" }}
        value={isLogin}
        onChange={(val) => setIsLogin(val)}
      />
      <Form form={form} name="registration-form" onFinish={onFinish} style={{ width: 300 }}>
        <Form.Item<AuthFieldType>
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
