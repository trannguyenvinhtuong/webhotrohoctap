import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nguoidung from './pages/Nguoidung';

class App extends Component {
  render() {
    return (
      <Nguoidung />
    );
  }
}

export default App;
