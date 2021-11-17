import { Component } from "react";
import { connect } from "react-redux";
import * as action from './../../actions/index';
import {Table} from 'antd';

class Showgiohang extends Component{
    componentDidMount(){
        var {cart} = this.props;
        if(cart.length == undefined){
            if(cart.typecart == "kh"){
                this.props.requestMotKhoaHoc(cart.id);
            }
        }
        else{
            this.props.resetNhieuKhoaHoc();
            for(let i=0; i<cart.length;i++){
                if(cart[i].typecart == "kh"){
                    this.props.requestNhieuKhoaHoc(cart[i].id);
                }
            }          
        }
    }

    render() {       
        var {cart} = this.props;
        var data;
        if(cart.length==undefined){
            var {getmotkhoahoc} = this.props;
            data = getmotkhoahoc;
        }
        else{
            var {getnhieukhoahoc} = this.props;
            data = getnhieukhoahoc;            
        }
        console.log(data[0]);
        const column = [
            {
                title: '',
                key: 'MaKhoaHoc',
                render: (record) => <img src={record.AnhKhoaHoc} key={record.MaKhoaHoc} />
            },
            {
                title: 'Tên khóa học',
                key: 'TenKhoaHoc',
                render: (record) => <a href="#" key={record.TenKhoaHoc}>{record.TenKhoaHoc}</a>
            },
            {
                title: 'Giảng viên',
                key: 'MaKH',
                dataIndex: 'TenKhachHang'
            }
        ];      
        
        
        return (
            <div className="container">
                <Table dataSource={data} columns={column} rowKey="name" />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        getmotkhoahoc: state.getmotkhoahoc,
        getnhieukhoahoc: state.getnhieukhoahoc
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        requestMotKhoaHoc: (idkh) =>{
            dispatch(action.requestMotKhoaHoc(idkh));
        },
        requestNhieuKhoaHoc: (idkh) =>{
            dispatch(action.requestNhieuKhoaHoc(idkh));
        },
        resetNhieuKhoaHoc: ()=>{
            dispatch(action.resetNhieuKhoaHoc());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Showgiohang);