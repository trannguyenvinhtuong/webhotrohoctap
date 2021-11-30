import { Component } from "react";
import db from './../../../config/firebase.config';
import { ref, child, get } from "firebase/database";
import * as action from "./../../../actions/index";
import { connect } from "react-redux";
import { Table } from 'antd';
import Detailkiemtra from "./kiemtra/Detailkiemtra";
import Themde from "./kiemtra/Themde";

class Dethicuatoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dethi: []
        }
    }
    componentDidMount() {
        const dbref = ref(db);
        get(child(dbref, "nganhangde")).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    dethi: snapshot.val()
                });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        this.props.requestChuDe();
        this.props.requestCapBac();
        var user = JSON.parse(localStorage.getItem('user'));
        var idkh = user.makh;
        this.props.requestCheckGV(idkh);
    }

    showChuDe = (makt) =>{
        var rs = null;
        var {chude} = this.props;
        if(chude){
            rs = chude.map((cb)=>{                
                if(makt == cb.MaCD){
                    return (
                        <p>{cb.TenCD}</p>
                    )
                }                
            });
        }
        return rs;
    }

    showCapBac = (makt) =>{
        var rs = null;
        var {capbac} = this.props;
        if(capbac){
            rs = capbac.map((cb)=>{                
                if(makt == cb.MaCB){
                    return (
                        <p>{cb.TenCB}</p>
                    )
                }                
            });
        }
        return rs;
    }

    onClick = (page,madethi) =>{
        this.props.togglepagegiangvien(page);
        sessionStorage.removeItem('madethi');
        sessionStorage.setItem('madethi',JSON.stringify({made: madethi}));
    }

    render() {
        var {giangvien} = this.props;
        var { dethi } = this.state;
        var dethidaloc = [];
        dethi.map((de)=>{
            if(de.magv == giangvien[0].MaGV){
                dethidaloc.push(de);
            }
        });
        const columns = [
            {
                title: 'Mã đề',
                render: (record) => <p>{record.ma}</p>
            },
            {
                title: 'Tên đề',
                render: (record) => <a onClick={()=>this.onClick(<Detailkiemtra />, record.ma)}>{record.ten}</a>
            },
            {
                title: 'Chủ đề',
                render: (record) => this.showChuDe(record.macd)
            },
            {
                title: 'Cấp bậc',
                render: (record) => this.showCapBac(record.macb)
            }
        ];
        return (
            <div className="giangvien-khoahoc">
                <a onClick={() => this.onClick(<Themde />)}>
                    <button className="giangvien-khbtn">Thêm đề</button>
                </a>
                <br />
                <Table dataSource={dethidaloc} columns={columns} rowKey="ma"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        giangvien: state.checkgv,
        chude: state.getchude,
        capbac: state.getcapbac
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        togglepagegiangvien: (page) => {
            dispatch(action.togglePageGiangVien(page));
        },
        requestCheckGV: (idkh) => {
            dispatch(action.requestCheckGV(idkh));
        },
        requestChuDe: () => {
            dispatch(action.requestChuDe());
        },
        requestCapBac: () => {
            dispatch(action.requestCapBac());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dethicuatoi);