import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routesND from './../route/routesND';
import NavbarHome from './../component/master/header/NavbarHome';
import Footer from'./../component/master/footter/Footer';

class Nguoidung extends Component {
  showContentMenu = (routes) =>{
      var rs = null;
      if(routes.length>0){
        rs=routes.map((route,index)=>{
          return(
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
    var logg = sessionStorage.getItem('user');
    return (
      <Router>
        <NavbarHome />
        <Switch>
          {logg !== null ? <Redirect from='/dangnhap' to='/' /> : '' }
          {logg === null ? <Redirect from='/quantritk' to='/' /> : '' }
          {logg === null ? <Redirect from='/khoahoc' to='/' /> : '' }
          {logg === null ? <Redirect from='/tailieu' to='/' /> : '' }
          {logg === null ? <Redirect from='/kichhoat' to='/dangnhap' /> : '' }
          {this.showContentMenu(routesND)}
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Nguoidung;
