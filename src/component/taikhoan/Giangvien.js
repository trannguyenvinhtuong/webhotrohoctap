import { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../../actions/index";
import './../../SASS/tk_giangvien.sass';
import {Link} from 'react-router-dom';

class Giangvien extends Component{
    componentDidMount(){
        var data = JSON.parse(localStorage.getItem('user'));
        var idkh = data.makh;
        this.props.requestCheckGV(idkh);
    }

    showUI = (gv) =>{
        if(gv.length == 0){
            return(
                <div className="tk_giangvien">
                    <h3>Đăng ký trở thành giảng viên để nhận ngay ưu đãi trong hôm nay!</h3>
                    <br />
                    <a href="#">
                        <button>Đăng ký ngay</button>
                    </a>
                </div>
            )
        }
        else if(gv.length > 0){
            return(
                <div className="tk_giangvien" style={{paddingTop: '2rem', textAlign: 'left'}}>
                    <h2>Truy cập trang quản trị dành cho giảng viên</h2>
                    <br />
                    <a href="http://tnvinhtuong0299.xyz:3000/giangvienpage">
                        {window.location.reload}
                        <button>Truy cập</button>
                    </a>
                </div>
            )
        }
    }

    render() {
        var {gv} =  this.props;
        return (
            <div>
                {this.showUI(gv)}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        gv: state.checkgv
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        requestCheckGV: (idkh) =>{
            dispatch(action.requestCheckGV(idkh));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Giangvien);