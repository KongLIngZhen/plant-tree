import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import './index.scss';

export default class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

    render() {
        const logo = require('../../static/logo.png');
        const menus = this.props.menu.map((item) => 
          <Link className="nav-link" key={item.id} to={item.route}>{item.name}</Link>
        )
        return (
            <div className="App-header">
                <img className="App-logo" src={logo} alt="logo"/>
                <Router>
                  {menus}
                </Router>
            </div>
        )
    }
}
