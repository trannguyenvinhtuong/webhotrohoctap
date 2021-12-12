import { Component } from "react";
import { Table } from 'antd';
import * as action from './../../actions/index';
import { connect } from "react-redux";
import { Menu, Dropdown } from 'antd';
import { SortAscendingOutlined, BarChartOutlined } from '@ant-design/icons';
import Chart from "./Chart";

class Detaildiem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: ''
        }
    }

    componentDidMount() {
        var madethi = JSON.parse(sessionStorage.getItem('madethi'));
        var id = madethi.made;
        this.props.requestKetQuaThi(id);
    }

    showKetQuaThi = (data) => {
        var rs = null;
        if (data) {
            if (data < 5) {
                rs = <button className="btn btn-danger">{data}/10</button>
            }
            else if (data < 8) {
                rs = <button className="btn btn-warning">{data}/10</button>
            }
            else {
                rs = <button className="btn btn-success">{data}/10</button>
            }
        }
        return rs;
    }

    onClick = (da) => {
        this.setState({
            sort: da
        })
    }

    onChart = (data) =>{
        this.props.togglePageAdmin(<Chart data={data} />)
    }

    render() {
        var { ketqua } = this.props;
        var { sort } = this.state;
        if (sort) {
            if (sort == 'giam') {
                ketqua.sort((a, b) => {
                    if (a.Diem > b.Diem) return -1;
                    else if (a.Diem < b.Diem) return 1;
                    else return 0;
                })
            }
            else if (sort == 'tang') {
                ketqua.sort((a, b) => {
                    if (a.Diem > b.Diem) return 1;
                    else if (a.Diem < b.Diem) return -1;
                    else return 0;
                })
            }
            else if (sort == 'moi') {
                ketqua.sort((a, b) => {
                    if (new Date(a.NgayLamBai) > new Date(b.NgayLamBai)) return -1;
                    else if (new Date(a.NgayLamBai) < new Date(b.NgayLamBai)) return 1;
                    else return 0;
                })
            }
            else if (sort == 'cu') {
                ketqua.sort((a, b) => {
                    if (new Date(a.NgayLamBai) > new Date(b.NgayLamBai)) return 1;
                    else if (new Date(a.NgayLamBai) < new Date(b.NgayLamBai)) return -1;
                    else return 0;
                })
            }
        }
        const columns = [
            {
                title: 'Mã đề',
                render: (record) => <p className="table-p">{record.MaDe}</p>
            },
            {
                title: 'Tên đề',
                render: (record) => <p className="table-p">{record.TenDe}</p>
            },
            {
                title: 'Tên khách hàng',
                render: (record) => <p className="table-p">{record.TenKH}</p>
            },
            {
                title: 'Ảnh đại diện',
                render: (record) => <img className="img-table" src={record.AnhDaiDien} />
            },
            {
                title: 'Số điện thoại',
                render: (record) => <p className="table-p">{record.SDT}</p>
            },
            {
                title: 'Email',
                render: (record) => <p className="table-p">{record.Email}</p>
            },
            {
                title: 'Kết quả thi',
                render: (record) => this.showKetQuaThi(record.Diem)
            },
            {
                title: 'Ngày làm bài',
                render: (record) => <p className="table-p">{record.NgayLamBai}</p>
            }
        ];

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.onClick('tang')}>
                        Điểm tăng dần
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.onClick('giam')}>
                        Điểm giảm dần
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.onClick('moi')}>
                        Mới nhất
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.onClick('cu')}>
                        Cũ nhất
                    </a>
                </Menu.Item>
            </Menu>
        );        

        return (
            <div>
                <div className="tab">
                    <div className="left-content">
                        <h3>Kết quả</h3>
                    </div>
                    <div className="right-content">
                        <div>
                            <a className="icon-tab" onClick={()=>this.onChart(ketqua)} >
                                <BarChartOutlined />
                            </a>
                        </div>
                        <div>
                            <a href="#" className="icon-tab">
                                <Dropdown overlay={menu} placement="bottomCenter" arrow>
                                    <SortAscendingOutlined />
                                </Dropdown>
                            </a>
                        </div>
                    </div>
                </div>
                <Table dataSource={[...ketqua]} columns={columns} rowKey="Id" />
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
        },
        togglePageAdmin: (page) => {
            dispatch(action.togglePageAdmin(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detaildiem);