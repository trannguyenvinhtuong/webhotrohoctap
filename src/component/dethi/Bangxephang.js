import { Component } from 'react';
import { connect } from 'react-redux';
import * as action from "./../../actions/index";
import { Table } from 'antd';

class Bangxephang extends Component {
    componentDidMount() {
        var { match } = this.props;
        var iddethi = match.match.params.iddethi;
        this.props.requestKetQuaThi(iddethi);
    }

    showKetQuaThi = (data) => {
        var rs = null;
        if (data) {
            if (data < 5) {
                rs = <button className="btn btn-danger" style={{ width: '80px' }}>{data}/10</button>
            }
            else if (data < 8) {
                rs = <button className="btn btn-warning" style={{ width: '80px' }}>{data}/10</button>
            }
            else {
                rs = <button className="btn btn-success" style={{ width: '80px' }}>{data}/10</button>
            }
        }
        return rs;
    }



    render() {
        var { ketqua } = this.props;
        // ketqua.sort((a, b) => {
        //     if (new Date(a.NgayLamBai) > new Date(b.NgayLamBai)) return -1;
        //     else if (new Date(a.NgayLamBai) < new Date(b.NgayLamBai)) return 1;
        //     else return 0;
        // });
        // ketqua.sort((a, b) => new Date(...a.NgayLamBai.split('-').reverse()) - new Date(...b.NgayLamBai.split('-').reverse())).reverse();
        ketqua.sort((a, b) => {
            if (a.Diem > b.Diem) return -1;
            else if (a.Diem < b.Diem) return 1;
            else return 0;
        });

        const columns = [
            {
                title: '',
                render: (record) => <p>1</p>
            },
            {
                title: 'Tên',
                render: (record) => <p className="bangxephang-p">{record.TenKH}</p>
            },
            {
                title: 'Ngày làm bài',
                render: (record) => <p className="bangxephang-p">{record.NgayLamBai}</p>
            },
            {
                title: 'Điểm',
                render: (record) => this.showKetQuaThi(record.Diem)
            }
        ];

        return (
            <div style={{ marginTop: '5.5rem' }} className="container">
                <Table dataSource={ketqua} columns={columns} rowKey="ID" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ketqua: state.getketquathi
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        requestKetQuaThi: (iddethi) => {
            dispatch(action.requestKetQuaThi(iddethi));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bangxephang);
