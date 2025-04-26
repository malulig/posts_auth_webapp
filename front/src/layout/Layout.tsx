import React from "react";
import { Flex, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { HeaderComponent } from "../components/HeaderComponent/HeaderComponent";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#fff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  height: "95vh",
};

const LayoutMain: React.FC = () => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <HeaderComponent />
      </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </Layout>
  </Flex>
);

export default LayoutMain;
