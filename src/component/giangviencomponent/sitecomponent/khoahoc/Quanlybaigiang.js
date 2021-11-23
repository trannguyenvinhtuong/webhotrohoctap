import { Component } from "react";
import * as action from './../../../../actions/index';
import { connect } from "react-redux";
import { Table } from "antd";


//firebase
import db from './../../../../config/firebase.config';
import { ref, child, get } from "firebase/database";

class Quanlybaigiang extends Component{
    componentDidMount(){
        var idkhoahoc = sessionStorage.getItem('idkhoahoc');
        var makhoahoc = JSON.parse(idkhoahoc)
        const dbRef = ref(db);
        get(child(dbRef, makhoahoc.id)).then((snapshot) => {
            if (snapshot.exists()) {
                this.props.getVideoKH(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        var video = this.props.video;
        const column = [
            {
                title: 'Key',
                dataIndex: 'key'
            },
            {
                title: 'Tên bài giảng',
                render: (record) => <p className="notCap">{record.ten}</p>
            },
            {
                title: 'Đường dẫn lưu trữ',
                render: (record) => <p className="notCap">{record.link}</p>
            },
            {
                title: '',
                render: (record) => <a href="#" className="btn btn-warning">Chỉnh sửa</a>
            },
            {
                title: '',
                render: (record) => <a className="btn btn-danger" href="#">Xoá</a>
            }
        ]
        return (
            <div className="themkhoahoc">
                <div className="container">
                    <a href="#" style={{float:'right'}}>
                        <button className="btn btn-success">Thêm bài giảng</button>
                    </a>
                </div>
                
                <br />
                <Table dataSource={video} rowKey="key" columns={column} />
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        video: state.getvideokh
    }
}

const mapDispatchToProps = (dispatch,props) =>{
    return{
        getVideoKH: (video) => {
            dispatch(action.getVideoKH(video));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quanlybaigiang);