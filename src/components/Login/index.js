import React, { PureComponent } from 'react';
import { Form, Input, Button } from 'antd';
import './index.scss';


class Login extends PureComponent {
    constructor(props) {
        super(props)

        this.login = this.login.bind(this);
        this.inputChange = this.inputChange.bind(this);

        this.state = {
            username: "",
            password: "",
        }
    }

    componentDidMount() {
      
    }

    async login() {
      const res = this.$post('/login', {
        "username": this.state.username,
        "password": this.state.password,
      });
      console.log(res);
    };

    inputChange = (event) => {
      console.log('--->', event);
      this.setState({
        username: event.target.username,
        password: event.target.password,
      })
      console.log('state', this.state);
    }


    render() {
        return (
           <div className="App-login">
             <div className="entrance">
                <Form>
                    <Form.Item
                      label="用户名"
                      name="username"
                      rules={[{required: true, message: '请输入用户名'}]}>
                        <Input name="username" value={this.state.username} onChange={(e) => this.inputChange(e)}/>
                    </Form.Item>
                    <Form.Item
                      label="密码"
                      name="password"
                      rules={[{required: true, message: '请输入密码'}]}>
                        <Input name="password" value={this.state.password} onChange={(e) => this.inputChange(e)}/>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" onClick={this.login}>
                        登录
                      </Button>
                    </Form.Item>
                </Form>
             </div>
           </div> 
        )
    }
}

export default Login;