import { Component } from "react";
import './../../../SASS/admin.sass';
import * as action from './../../../actions/index';
import { connect } from "react-redux";
import Dashboard from "../Dashboard";
import Quanlygiangvien from './../Quanlygiangvien';

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
                <a href="#">
                    <button>
                        <i className="fas fa-graduation-cap"></i>
                        Quản lý khoá học
                    </button>
                </a>
                <a href="#">
                    <button>
                        <i className="fas fa-file-word"></i>
                        Quản lý tài liệu
                    </button>
                </a>
                <a href="#">
                    <button>
                        <i className="fas fa-star"></i>
                        Quản lý điểm 
                    </button>
                </a>
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