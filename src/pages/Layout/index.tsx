/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu, message, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { fetchUserInfo,clearUserInfo } from "@/store/modules/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const name = useSelector((state: any) => state.user.userInfo.name);

  function clickMenu(e: any) {
    navigate(e.key);
  }

  function logout() {
    // 1. 删除token
    dispatch(clearUserInfo());
    // 2. 跳转到登录页面
    navigate("/login");
    // 3. 提示用户
    message.success("退出成功");
  }

  useEffect(() => {
    dispatch(fetchUserInfo() as any);
  }, [dispatch]);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name || "Admin"}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[location.pathname]}
            items={items}
            onClick={clickMenu}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
