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

    showContent = (data) => {
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
                                            {formatter.format((da.GiaTL * (100 - da.PhanTramGiam)) / 100)}
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
                <h3>TÀI LIỆU</h3>
                <br />
                <div className="row">
                    {this.showContent(tailieu)}
                </div>
                <Link to="/alldisplaytailieu" className="xemthem">Xem thêm
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