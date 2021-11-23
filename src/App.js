import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routesALL from './route/routesALL';

class App extends Component {
  showContentMenu = (routes) => {
    var rs = null;
    if (routes.length > 0) {
      rs = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )
      })
    }
    return rs;
  }

  render() {
    var logg = localStorage.getItem('user');
    var pathn = window.location.pathname;
    return (
      <Router>        
        <Switch>
          {pathn === "/" ? <Redirect from='/' to='/nguoidung' /> : ''}
          {logg !== null ? <Redirect from='/nguoidung/dangnhap' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/quantritk' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/khoahoc' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/tailieu' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/kichhoat' to='/dangnhap' /> : ''}
          {this.showContentMenu(routesALL)}
          
        </Switch>
      </Router>
    );
  }
}

export default App;
