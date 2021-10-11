import { Component } from "react";
import { Row, Col } from 'antd';
import './../../../SASS/detail.sass';
import {connect} from "react-redux";
import * as action from './../../../actions/index';

class Gioithieukhoahoc extends Component {
    componentDidMount(){
        var {idkh} = this.props;
        this.props.requestTTKH(idkh);
    }

    render() {
        var {thongtin} = this.props;
        var tt = thongtin[0];
        return (
            <div className="gt-qc">
                <h1>Giới thiệu khóa học</h1>
                <p>
                    {thongtin.GioiThieuKH === undefined ? tt.GioiThieuKH : thongtin.GioiThieuKH}
                
                </p>
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
