import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import NavbarHome from './component/master/header/NavbarHome';
import Footer from'./component/master/footter/Footer';

class App extends Component {
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
    return (
      <Router>
        <NavbarHome />
        <Switch>
          {this.showContentMenu(routes)}
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
