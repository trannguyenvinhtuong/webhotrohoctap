import { Component } from "react";
import {Table} from "antd";
import { connect } from "react-redux";
import * as action from "./../../../actions/index";
import './../../../SASS/giangvienpage.sass';
import Themtailieu from "./tailieu/Themtailieu";
import Detailtailieu from "./tailieu/Detailtailieu";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})


class Tailieu extends Component{
    componentDidMount(){
        var logg = localStorage.getItem('user');
        var jslog = JSON.parse(logg);
      
        this.props.requestTaiLieuTheoGV(jslog.makh);
    }

    onClick = (page,idtailieu) =>{
        this.props.togglepagegiangvien(page);
        sessionStorage.removeItem('idtailieu');
        sessionStorage.setItem('idtailieu',JSON.stringify({id: idtailieu}));
    }

    render() {
        const columns = [
            {
                title: '',
                key: 'MaTL',
                render: (record) => <img src={record.AnhTL} key={record.MaTL}/>
            },
            {
                title: 'Tên tài liệu',
                key: 'MaTL',
                render: (record) => <a onClick={() => this.onClick(<Detailtailieu />,record.MaTL)} key={record.MaTL}>{record.TenTL}</a>
            },
            {
                title: 'Mô tả',
                render: (record) => <p>{record.MoTa}</p>
            },
            {
                title: 'Giá tài liệu',
                render: (record) => <p>{formatter.format(record.GiaTL)}</p>
            },
            {
                title: 'Số trang',
                render: (record) => <p>{record.SoTrang}</p>
            }
    
        ];
        var tailieu = this.props.gettailieutheogv;    
        console.log(tailieu);    
        return (
            <div className="giangvien-khoahoc">
                <a onClick={() => this.onClick(<Themtailieu />)}>
                    <button className="giangvien-khbtn">Thêm tài liệu</button>
                </a>
                <Table dataSource={tailieu} className="table-khgv" columns={columns} rowKey="MaTL"/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        gettailieutheogv: state.gettailieutheogv
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestTaiLieuTheoGV: (makh) =>{
            dispatch(action.requestTaiLieuTheoGV(makh));
        },
        togglepagegiangvien: (page) =>{
            dispatch(action.togglePageGiangVien(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tailieu);