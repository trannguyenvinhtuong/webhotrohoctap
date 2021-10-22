import {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../../../actions/index';
import {Table} from 'antd';
// firebase
import db from './../../../config/firebase.config';
import { ref, child, get } from "firebase/database";

class Noidung extends Component{
    componentDidMount() {
        var {idkh} = this.props;
        const dbRef = ref(db);
        get(child(dbRef, idkh)).then((snapshot) => {
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
        const column = [
            {
                title: 'Nội dung bài học',
                key: 'key',
                dataIndex: 'ten'
            }
        ]
        var {video} = this.props;
        return (
            <div className="gt-qc">
                <Table columns={column} dataSource={video} />
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
        getVideoKH: (video) =>{
            dispatch(action.getVideoKH(video));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Noidung);