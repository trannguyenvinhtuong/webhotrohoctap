import { Component } from "react";
import './../../SASS/detail.sass';
import {connect} from "react-redux";
import * as action from './../../actions/index';

class Gioithieu extends Component {
    componentDidMount() {
        var {idtailieu} = this.props;
        this.props.requestMotTaiLieu(idtailieu);
    }

    render() {
        var {tailieu} = this.props;
        var tl = tailieu[0]; 
    
        return (
            <div className="detail-gioithieu">
                <h1>{tailieu.TenTL === undefined ? tl.TenTL : tailieu.TenTL}</h1>
                <p>
                    {tailieu.MoTa === undefined ? tl.MoTa : tailieu.MoTa}
                </p>
                <div>
                    <img src={tailieu.AnhDaiDien === undefined ? tl.AnhDaiDien : tailieu.AnhDaiDien} />
                    <span>{tailieu.TenKH === undefined ? tl.TenKH: tailieu.TenKH}</span>
                    <span>
                        <i className="far fa-smile" style={{ color: 'yellow' }}></i>
                        3950 Đánh giá
                    </span>
                    <span>
                        <i className="fas fa-user-graduate"></i>
                        {tailieu.SoLuongHV === undefined ? tl.SoLuongHV : tailieu.SoLuongHV} Học viên
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tailieu: state.getmottailieu
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestMotTaiLieu: (idtl) =>{
            dispatch(action.requestMotTaiLieu(idtl));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Gioithieu);