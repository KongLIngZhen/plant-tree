import React from 'react';
import { } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header/index';
import Login from './components/Login/index';
import CompositeIndex from './pages/CompositeIndex';
import './App.scss';

function App() {
  const menu = [{name: '文章', route: 'article', id: 1}, {name: '教程', route: 'course', id: 2},]
  const { Footer, Content } = Layout;
  const loginState = false;
  return (
    <div className="App">
      {
        loginState ? <Login></Login> :
        <Layout>
          <Header menu={menu}></Header>
          <Content className="content">
            <CompositeIndex></CompositeIndex>
          </Content>
          <Footer>footer</Footer>
        </Layout>
      }
    </div>
  );
}

export default App;
