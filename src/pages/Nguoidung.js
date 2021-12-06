import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routesND from './../route/routesND';
import NavbarHome from './../component/master/header/NavbarHome';
import Footer from './../component/master/footter/Footer';
import Messenger from '../component/chat/Messenger';

class Nguoidung extends Component {
  componentDidMount() {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/615fb2c486aee40a57357fdb/1fhet4k3i';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }
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
    return (
      <Router>
        <Messenger />
        <NavbarHome />
        <Switch>
          {logg !== null ? <Redirect from='/nguoidung/dangnhap' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/quantritk' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/khoahoc' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/tailieu' to='/nguoidung' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/kichhoat' to='/nguoidung/dangnhap' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/giohang' to='/nguoidung/dangnhap' /> : ''}
          {logg === null ? <Redirect from='/nguoidung/dangkygiangvien' to='/nguoidung/dangnhap' /> : ''}
          {this.showContentMenu(routesND)}
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Nguoidung;
