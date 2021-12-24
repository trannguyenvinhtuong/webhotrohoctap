import { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../../../actions/index";
import {Table} from 'antd';
import {Link} from 'react-router-dom';

class Searchpage extends Component {
    componentDidMount() {
        this.props.requestKhoaHoc();
        this.props.requestTaiLieu();
    }

    showTen = (data) => {
        var rs = null;
        if (data.TenTL != undefined) {
            rs = <Link to={`/nguoidung/detailtailieu/${data.MaTL}`} className="name-kh">{data.TenTL}</Link>
        }
        else if (data.TenKhoaHoc != undefined) {
            rs = <Link key={data.MaKhoaHoc} to={`/nguoidung/Detailkhoahoc/${data.MaKhoaHoc}`} className="name-kh">{data.TenKhoaHoc}</Link>
        }
        else {
            rs = <p></p>
        }
        return rs;
    }

    showAnh = (data) => {
        var rs = null;
        if (data.AnhTL != undefined) {
            rs = <img className="img-khoahoc" src={data.AnhTL} />
        }
        else if (data.AnhKhoaHoc != undefined) {
            rs = <img className="img-khoahoc" src={data.AnhKhoaHoc} />
        }
        else {
            rs = <p></p>
        }
        return rs;
    }

    render() {
        var { match, khoahoc, tailieu } = this.props;
        var keyword = match.match.params.keyword;
        var data = khoahoc.concat(tailieu);    

        if (keyword && keyword != 0) {
            data = data.filter((kh) => {
                if(kh.TenKhoaHoc!=undefined){
                    return (kh.TenKhoaHoc).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                }
                else if(kh.TenTL != undefined){
                    return (kh.TenTL).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                }
            });
            // data = data.filter((kh) => {
            //     return (kh.TenTL).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            // });
        }

        const columns = [
            {
                title: "",
                render: (record) => this.showAnh(record)
            },
            {
                title: 'Tên',
                render: (record) => this.showTen(record)
            },
            {
                title: 'Giảng viên',
                dataIndex: 'TenKH',
                key: 'MaKH'
            },
            {
                title: 'Chủ đề',
                dataIndex: 'TenCD',
                key: 'MaCD'
            },
            {
                title: 'Cấp bậc',
                dataIndex: 'TenCB',
                key: 'MaCB'
            }
        ];

        return (
            <div style={{ marginTop: '5.5rem' }}>
                <Table dataSource={data} columns={columns} rowKey="MaKhoaHoc,MaTL" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tailieu: state.gettailieu,
        khoahoc: state.getkhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKhoaHoc: () => {
            dispatch(action.requestKhoaHoc());
        },
        requestTaiLieu: () => {
            dispatch(action.requestTaiLieu());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchpage);