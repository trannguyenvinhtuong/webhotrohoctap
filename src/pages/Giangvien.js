import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './../SASS/giangvienpage.sass';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import Navbar from '../component/giangviencomponent/master/Navbar';
import Footer from './../component/master/footter/Footer';
import Leftbar from '../component/giangviencomponent/master/Leftbar';
import Themkhoahoc from '../component/giangviencomponent/sitecomponent/khoahoc/Themkhoahoc';
import Detailkhoahoc from './../component/giangviencomponent/sitecomponent/khoahoc/Detailkhoahoc';

import Logo from './../imgs/LOGO_OF_LOGO.svg';

class Giangvien extends Component {

  render() {
    var logg = localStorage.getItem('user');
    var { togglepagegiangvien } = this.props; 
    return (
      <div>
        <Navbar />
        <div className="displaygiangvien">
          <br />
          <br />
          <img className="logo-home" src={Logo} />
          <Row className="giangvien-page-row">
            <Col span={4}>
              <Leftbar />
            </Col>
            <Col span={20}>
              {togglepagegiangvien}
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    togglepagegiangvien: state.togglepagegiangvien
  }
}

export default connect(mapStateToProps,null)(Giangvien);
