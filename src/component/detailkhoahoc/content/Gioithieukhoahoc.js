import { Component } from "react";
import React from 'react';
import './../../../SASS/detail.sass';
import {connect} from "react-redux";
import * as action from './../../../actions/index';

class Gioithieukhoahoc extends Component {
    componentDidMount(){
        var {idkh} = this.props;
        this.props.requestTTKH(idkh);
    }

    render() {   
        const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
        var {thongtin} = this.props;
        var tt = thongtin[0];
        return (
            <div className="gt-qc">
                <h1>Giới thiệu khóa học</h1>
                <div className="detail-ndgt">
                    {renderHTML(thongtin.GioiThieuKH === undefined ? tt.GioiThieuKH : thongtin.GioiThieuKH)}                
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        thongtin: state.getttkhoahoc
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestTTKH: (idkh) =>{
            dispatch(action.requestTTKH(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Gioithieukhoahoc);
