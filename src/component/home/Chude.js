import { Component } from "react";
import { Link } from 'react-router-dom';
import an from './../../imgs/anhnennuoc.jpg';
import { connect } from 'react-redux';
import * as action from './../../actions/index';

class Chude extends Component {
    showCD = (cd) => {
        var rs = null;
        if (cd) {
            rs = cd.map((c, index) => {
                return (
                    <div className="col-4 p-cd" key={index}>
                        <Link to={`/nguoidung/alldisplay/${c.MaCD}`}>
                            <div className="chude" style={{ backgroundImage: `url(${c.AnhCD})` }}>
                                <h3>{c.TenCD}</h3>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
        return rs;
    }

    componentDidMount(){
        this.props.requestChuDeLimit();
    }

    render() {
        var {chude} = this.props;
        return (
            <div className="back-cd" style={{ backgroundImage: `url(${an})` }}>
                <div className="container khoahoc">
                    <h3>CHỦ ĐỀ</h3>
                    <br />
                    <div className="row">
                        {this.showCD(chude)}
                    </div>
                    <Link to="/nguoidung/danhmuc" className="xemthem">Xem thêm
                        <i className="fas fa-angle-double-right" style={{ color: '#0d6efd' }}></i>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chude: state.getchudelimit,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestChuDeLimit: () => {
            dispatch(action.requestChuDeLimit());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chude);