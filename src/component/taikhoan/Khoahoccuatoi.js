import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

class Khoahoccuatoi extends Component {
    componentDidMount() {
        var log = localStorage.getItem('user');
        var jslog = JSON.parse(log);
        this.props.requestKhoaHocKH(jslog.makh);
    }

    tinhThoiGian = (data) => {
        let ngay = 0;
        let thang = 0;
        let nam = 0;
        let rs = null;
        let homnay = new Date();
        let ngayhn = homnay.getDate();
        let thanghn = homnay.getMonth();
        let namhn = homnay.getFullYear();

        if (data) {
            ngay = ngayhn - new Date(data).getDate();
            thang = thanghn - new Date(data).getMonth();
            nam = namhn - new Date(data).getFullYear();
            console.log(ngay, thang, nam);
            rs = <span style={{ color: '#000' }}>{ngay} ngày {thang} tháng {nam} năm</span>
        }
        // if (ngay > 0 && thang > 0 && nam > 0) {
        //     rs = <span style={{ color: '#fff' }}>{ngay} ngày {thang} tháng {nam} năm</span>

        // }
        // else if (ngay < 0 && thang > 0 && nam > 0) {
        //     rs = <span style={{ color: '#fff' }}>{thang} tháng {nam} năm</span>
        // }
        // else if (ngay > 0 && thang < 0 && nam > 0) {
        //     rs = <span style={{ color: '#fff' }}>{ngay} ngày {nam} năm</span>
        // }
        // else if (ngay > 0 && thang > 0 && nam < 0) {
        //     rs = <span style={{ color: '#fff' }}>{ngay} ngày {thang} tháng </span>
        //     console.log("1 ne");
        // }
        // else if (ngay < 0 && thang < 0 && nam > 0) {
        //     rs = <span style={{ color: '#fff' }}>{nam} năm</span>
        // }
        // else if (ngay > 0 && thang < 0 && nam < 0) {
        //     rs = <span style={{ color: '#fff' }}>{ngay} ngày</span>
        // }
        // else if (ngay < 0 && thang > 0 && nam < 0) {
        //     rs = <span style={{ color: '#fff' }}>{thang} tháng</span>
        // }
        return rs;
    }

    render() {
        var { khoahoc } = this.props;
        const columns = [
            {
                title: '',
                key: 'MaKhoaHoc',
                render: (record) => <img alt={record.MaKhoaHoc} key={record.MaKhoaHoc} className="img-khoahoc" src={record.AnhKhoaHoc} />
            },
            {
                title: 'Khóa học',
                key: 'TenKhoaHoc',
                render: (record) => <Link to={`/nguoidung/khoahoc/${record.MaKhoaHoc}`} key={record.MaKhoaHoc} className="name-kh">{record.TenKhoaHoc}</Link>
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
            },
            {
                title: 'Thời gian đã học',
                render: (record) => this.tinhThoiGian(record.NgayThamGia)
            }
        ];
        return (
            <div>
                <Table columns={columns} dataSource={khoahoc} rowKey="MaKhoaHoc" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        khoahoc: state.getkhoahoc
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKhoaHocKH: (idkh) => {
            dispatch(action.requestKhoaHocKH(idkh));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Khoahoccuatoi);