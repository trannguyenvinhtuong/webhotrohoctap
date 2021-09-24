import { Component } from "react";
import { connect } from 'react-redux';
import * as action from './../../actions/index';
import at from './../../imgs/amthuc.jpg';
import cntt from './../../imgs/cntt.jpg';
import de from './../../imgs/designer.jpg';
import dl from './../../imgs/dulich.jpg';
import hh from './../../imgs/hoahoc.jpg';
import kt from './../../imgs/ketoan.jpg';

class Danhmuc extends Component {
    showDanhMuc = (khoahoc) => {
        var rs = null;
        rs = khoahoc.map((kh) => {
            return (
                <div className="col-4 p-cd">
                    <a href="#" key={kh.id}>
                        <div className="chude" style={{ backgroundImage: `url(${at})` }}>
                            <h3>{kh.lastname}</h3>
                        </div>
                    </a>
                </div>
            )
        })
        return rs;
    }

    componentDidMount() {
        this.props.requestKhoaHoc();
    }

    render() {
        var { khoahoc } = this.props;
        return (
            <div className="container" style={{ marginTop: '5rem' }}>
                <div className="container khoahoc">
                    <div className="row">
                        {this.showDanhMuc(khoahoc)}
                    </div>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        khoahoc: state.getkhoahoc,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKhoaHoc: () => {
            dispatch(action.requestKhoaHoc());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Danhmuc);