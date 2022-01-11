import { Component } from "react";
import {Table} from "antd";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import Detailtailieu from './Detailtailieu';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
});


class Quanlytailieu extends Component{
    componentDidMount(){        
        this.props.requestTaiLieu();
    }

    onClick = (page,idtailieu) =>{
        this.props.togglePageAdmin(page);
        sessionStorage.removeItem('idtailieu');
        sessionStorage.setItem('idtailieu',JSON.stringify({id: idtailieu}));
    }

    render() {
        const columns = [
            {
                title: '',
                key: 'MaTL',
                render: (record) => <img style={{width: '150px'}} src={record.AnhTL} key={record.MaTL}/>
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
        var {tailieu} = this.props;    
        return (
            <div className="giangvien-khoahoc">                
                <Table dataSource={tailieu} className="table-khgv" columns={columns} rowKey="MaTL"/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tailieu: state.gettailieu
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestTaiLieu: () =>{
            dispatch(action.requestTaiLieu());
        },
        togglePageAdmin: (page) =>{
            dispatch(action.togglePageAdmin(page));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quanlytailieu);