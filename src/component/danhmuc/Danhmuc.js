import { Component } from "react";
import { connect } from 'react-redux';
import * as action from './../../actions/index';
import { Link } from 'react-router-dom';

class Danhmuc extends Component {
    showDanhMuc = (chude) => {
        var rs = null;
        rs = chude.map((cd) => {
            return (
                <div className="col-4 p-cd">
                    <Link to={`/alldisplay/${cd.MaCD}`} key={cd.MaCD}>
                        <div className="chude" style={{ backgroundImage: `url(${cd.AnhCD})` }}>
                            <h3>{cd.TenCD}</h3>
                        </div>
                    </Link>
                </div>
            )
        })
        return rs;
    }

    componentDidMount() {
        this.props.requestChuDe();
    }

    render() {
        var { chude } = this.props;
        return (
            <div className="container" style={{ marginTop: '5rem' }}>
                <div className="container khoahoc">
                    <div className="row">
                        {this.showDanhMuc(chude)}
                    </div>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        chude: state.getchude,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Danhmuc);