import React, { useState } from "react";
import { Menu } from "antd";
import { UserOutlined, LogoutOutlined, LoginOutlined, MessageOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/users/users.slice";

type MenuItem = Required<MenuProps>["items"][number];

export const HeaderComponent: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [current, setCurrent] = useState<string>("posts");

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/auth");
    }
    if (e.key === "login") {
      navigate("/auth");
    }
    if (e.key !== "logout") {
      setCurrent(e.key);
    }
  };

  const items: MenuItem[] = [
    {
      label: <Link to="/posts">Posts</Link>,
      key: "posts",
      icon: <MessageOutlined />,
    },
    {
      label: (
        <div
          style={{
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <UserOutlined style={{ marginRight: 8 }} />
          {user?.accessToken ? user.username : "Anonimus"}
        </div>
      ),
      key: "user",
      children: [
        !user?.accessToken
          ? {
              key: "login",
              label: (
                <span>
                  <LoginOutlined style={{ marginRight: 8 }} />
                  Log in / Sign in
                </span>
              ),
            }
          : {
              key: "logout",
              label: (
                <span>
                  <LogoutOutlined style={{ marginRight: 8 }} />
                  Log out
                </span>
              ),
            },
      ],
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: 48,
        backgroundColor: "#fff",
        height: 64,
      }}
    />
  );
};
