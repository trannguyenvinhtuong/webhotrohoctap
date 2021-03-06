import { Component } from "react";
import { Link } from 'react-router-dom';
import * as action from './../../actions/index';
import { connect } from 'react-redux';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})


class Tailieu extends Component {
    componentDidMount() {
        this.props.requestTaiLieu();
    }

    showContent = (datainput) => {
        var data = [];
        datainput.sort((a, b) => new Date(...a.NgayDang.split('-').reverse()) - 
                                    new Date(...b.NgayDang.split('-').reverse())).reverse();
        if(datainput.length < 9){
            data = datainput;
        }
        else if(datainput.length > 8){
            for(let i =0; i<8;i++){
                data.push(datainput[i]);
            }
        }
        var rs = null;
        if (data) {
            rs = data.map((da, index) => {
                return (
                    <div className="col-md-3 p-kh" key={index}>
                        <div className="sanpham">
                            <Link to={`/nguoidung/detailtailieu/${da.MaTL}`}>
                                <img src={da.AnhTL} />
                                <h3>{da.TenTL}</h3>
                                <div className="thongtin-sp row">
                                    <div className="col">
                                        <h1>{da.TenCD}</h1>
                                    </div>
                                    <div className="col">
                                        <p className="giacu">{formatter.format(da.GiaTL)}</p>
                                        <p className="giamoi">
                                            Miễn phí
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })
        }
        return rs;
    }

    render() {
        var { tailieu } = this.props;
        
        return (
            <div className="container khoahoc">
                <h3>TÀI LIỆU <span className="hot-td">Mới</span></h3>
                <br />
                <div className="row">
                    {this.showContent(tailieu)}
                </div>
                <Link to="/nguoidung/alldisplaytailieu" className="xemthem">Xem thêm
                    <i className="fas fa-angle-double-right" style={{ color: '#0d6efd' }}></i>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tailieu: state.gettailieu
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestTaiLieu: () => {
            dispatch(action.requestTaiLieu());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tailieu);