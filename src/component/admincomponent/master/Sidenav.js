import { Component } from "react";
import './../../../SASS/admin.sass';
import * as action from './../../../actions/index';
import { connect } from "react-redux";
import Dashboard from "../Dashboard";
import Quanlygiangvien from './../Quanlygiangvien';
import Quanlytaikhoan from "../Quanlytaikhoan";
import Quanlykhoahoc from "../Quanlykhoahoc";
import Quanlytailieu from "../Quanlytailieu";
import Quanlydethi from "../Quanlydethi";
import Quanlymakichhoat from "../Quanlymakichhoat";
import Quanlyhoadon from "../Quanlyhoadon";
import Quanlydiem from "../Quanlydiem";
import Quanlynhandien from "../Quanlynhandien";

class Sidenav extends Component {
    togglePageAdmin = (page) =>{
        this.props.togglePageAdmin(page);
    }

    render() {
        return (
            <div className="sidenav">
                <a onClick={()=>this.togglePageAdmin(<Dashboard />)}>
                    <button>
                        <i className="fas fa-home"></i>
                        Dashboard
                    </button>
                </a>
                <a onClick={()=>this.togglePageAdmin(<Quanlygiangvien />)}>
                    <button>
                        <i className="fas fa-user-graduate"></i>
                        Quản lý giảng viên
                    </button>
                </a>
                <a onClick={()=>this.togglePageAdmin(<Quanlytaikhoan />)}>
                    <button>
                        <i className="fas fa-users"></i>
                        Quản lý tài khoản 
                    </button>
                </a>
                <a onClick={()=>this.togglePageAdmin(<Quanlykhoahoc />)}>
                    <button>
                        <i className="fas fa-graduation-cap"></i>
                        Quản lý khoá học
                    </button>
                </a>
                <a onClick={()=>this.togglePageAdmin(<Quanlymakichhoat />)}>
                    <button>
                        <i className="fas fa-chess-board"></i>
                        Quản lý mã kích hoạt
                    </button>
                </a>       
                <a onClick={()=>this.togglePageAdmin(<Quanlytailieu />)}>
                    <button>
                        <i className="fas fa-file-word"></i>
                        Quản lý tài liệu
                    </button>
                </a>
                <a onClick={()=>this.togglePageAdmin(<Quanlydethi />)}>
                    <button>
                        <i className="fas fa-diagnoses"></i>
                        Quản lý đề thi 
                    </button>
                </a>
                <a onClick={()=>this.togglePageAdmin(<Quanlydiem />)}>
                    <button>
                        <i className="fas fa-star"></i>
                        Quản lý điểm 
                    </button>
                </a>    
                <a onClick={()=>this.togglePageAdmin(<Quanlyhoadon />)}>
                    <button>
                        <i className="fas fa-shopping-cart"></i>
                        Quản lý đơn hàng
                    </button>
                </a>    
                {/* <a onClick={()=>this.togglePageAdmin(<Quanlynhandien />)}>
                    <button>
                        <i className="far fa-smile-beam"></i>
                        Quản lý nhận diện
                    </button>
                </a>               */}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        togglePageAdmin: (page)=>{
            dispatch(action.togglePageAdmin(page));
        }
    }
}

export default connect(null,mapDispatchToProps)(Sidenav);